use crate::aoc_year::Answer::Skipped;
use std::collections::{HashMap, HashSet};
use std::fmt::Display;
use std::time::{Duration, SystemTime};
use std::{fs, io};

type SolutionFnType = dyn Fn(&str) -> String; // todo replace String to generic

pub struct AoCYear<'a> {
    year: i32,
    day_flags: &'a HashSet<i32>,
    days: HashMap<i32, AoCYearDay>,
    curr_day: Option<i32>,
    solutions: HashMap<(i32, bool), Vec<SolutionFn<'a>>>, // (day, is_part2)
}

pub struct AoCYearDay {
    day: i32,
    test_input: Option<String>,
    real_input: Option<String>,
    part1: PartAnswers,
    part2: PartAnswers,
}

struct PartAnswers {
    test_answer: Option<String>, // the correct answer from the adventofcode.com
    real_answer: Option<String>, // the correct answer from the adventofcode.com
}

struct Solution<'a> {
    name: &'a str,
    part1: SolutionResult,
    part2: SolutionResult,
}

struct SolutionResult {
    test_result: Answer,
    real_result: Answer,
}

pub enum SolutionFn<'a> {
    Sim(&'a SolutionFnType, &'a str),
    Ver(&'a SolutionFnType, &'a SolutionFnType, &'a str),
    // todo add for "test only" and "real only"
}

enum Answer {
    Res(String, Duration),
    Skipped,
    // Idle, // todo ??
    // InProgress(start_time), // todo ??
}

impl<'a> SolutionFn<'a> {
    fn get_label(&self) -> &str {
        match self {
            SolutionFn::Sim(_, lab) => lab,
            SolutionFn::Ver(_, _, lab) => lab,
        }
    }
}

impl AoCYearDay {
    fn run_solution(
        &self,
        test_fn: Option<&SolutionFnType>,
        real_fn: Option<&SolutionFnType>,
    ) -> SolutionResult {
        let mut res = SolutionResult {
            test_result: Answer::Skipped,
            real_result: Answer::Skipped,
        };

        match (test_fn, &self.test_input) {
            (Some(cb), Some(input)) => {
                let sys_time = SystemTime::now();
                let answer = cb(input);
                let time = sys_time.elapsed().unwrap();

                res.test_result = Answer::Res(answer.to_string(), time)
            }
            _ => {}
        };

        match (real_fn, &self.real_input) {
            (Some(cb), Some(input)) => {
                let sys_time = SystemTime::now();
                let answer = cb(input);
                let time = sys_time.elapsed().unwrap();

                res.real_result = Answer::Res(answer.to_string(), time)
            }
            _ => {}
        };

        res
    }
}

impl SolutionResult {
    fn answer_to_strings(
        &self,
        ans: &Answer,
        correct_result: &Option<String>,
    ) -> (String, Vec<String>) {
        let label_line = match ans {
            Answer::Res(v, time) => {
                let time_sec = time.as_millis() as f64 / 1000.0;
                match correct_result {
                    Some(correct) => {
                        if *v == *correct {
                            format!("✅ [sec {:.3}]", time_sec)
                        } else {
                            format!("❌ [sec {:.3}]", time_sec)
                        }
                    }
                    None => format!("🛠️[sec {:.3}]", time_sec),
                }
            }
            Answer::Skipped => "🪨--SKIPPED--".to_string(),
        };

        let mut result_lines = vec![];
        match (correct_result, ans) {
            (Some(v), Answer::Res(r, _)) => {
                if *v != *r {
                    result_lines.push(format!("expected: {}", v));
                    result_lines.push(format!("actual:   {}", r));
                }
            }
            (None, Answer::Res(r, _)) => {
                result_lines.push(format!("result: {} (no correct answer)", r));
            }
            (_, Answer::Skipped) => (),
        }

        (label_line, result_lines)
    }

    // todo WIP
    fn print(&self, prefix: &str, correct_answers: &PartAnswers, label: &str) {
        let (test_label, test_results) =
            self.answer_to_strings(&self.test_result, &correct_answers.test_answer);
        let (real_label, real_results) =
            self.answer_to_strings(&self.real_result, &correct_answers.real_answer);

        println!("{} {} {} {}", prefix, test_label, real_label, label);
        let prefix_blank = " ".repeat(prefix.len());

        for l in test_results {
            println!("{prefix_blank}{}", l);
        }
        for l in real_results {
            println!("{prefix_blank}              {}", l);
        }
    }
}

impl<'a> AoCYear<'a> {
    /*
    AoCYear::new(2022, flags, &[
        ("d1_p1", &day14::naive_js_copy_part1, "naive js copy")
        ("d1_p2_test", &day14::naive_js_copy_part1, "naive js copy")
        ("d2_p2_real", &|inp| day15::naive_js_copy_part2(inp, 4_000_000), "naive js copy")
        ("!d2_p2_real", &|inp| day15::naive_js_copy_part2(inp, 4_000_000), "naive js copy") // ??? if we can to call only this function
      ]);

    AoCYear::new(2022, flags)
        .day(3)
        .part1(&day14::naive_js_copy_part1, "naive js copy")
        .part2_ver(&|inp| day15::naive_js_copy_part2(inp, 4_000_000), &|inp| day15::naive_js_copy_part2(inp, 4_000_000), "naive js copy")

        .part1(
            Solution::Both(&day14::naive_js_copy_part1, "naive js copy")
        )
        .part2(
            Solution::Ver(
                &|inp| day15::naive_js_copy_part2(inp, 4_000_000),
                &|inp| day15::naive_js_copy_part2(inp, 4_000_000),
                "naive js copy"
            )
        )
        .part2_ver(
            Solution::Test(&day14::naive_js_copy_part1, "naive js copy")
        )
        .calc();
    */

    pub fn new_2(year: i32, day_flags: &'a HashSet<i32>) -> Self {
        let mut days = HashMap::new();

        for day in 1..=25 {
            let input_folder = format!("../{}/inputs/d{:02}", year, day);
            let (test_input, real_input) = Self::parse_inputs(&input_folder);
            let (part1, part2) = AoCYear::parse_answers(&format!("{}/answer.txt", input_folder));

            days.insert(
                day,
                AoCYearDay {
                    day,
                    test_input,
                    real_input,
                    part1,
                    part2,
                },
            );
        }

        Self {
            year,
            day_flags,
            days,
            curr_day: None,
            solutions: HashMap::new(),
        }
    }

    pub fn run(&self) {
        // go ony by one
        for day in 1..=25 {
            if self.day_flags.contains(&day) || self.day_flags.is_empty() {
                dbg!(&day);
                if let Some(day_data) = self.days.get(&day) {
                    if let Some(sol_vec) = self.solutions.get(&(day, false)) {
                        // part 1
                        // dbg!(sol_vec.len());
                        for (i, sol) in sol_vec.into_iter().enumerate() {
                            let mut res = SolutionResult {
                                test_result: Answer::Skipped,
                                real_result: Answer::Skipped,
                            };

                            match (sol, &day_data.test_input) {
                                (SolutionFn::Sim(sol_fn, label), Some(inp)) => {
                                    let sys_time = SystemTime::now();
                                    let test_answer = sol_fn(&inp);
                                    let test_time = sys_time.elapsed().unwrap();

                                    res.test_result = Answer::Res(test_answer, test_time);
                                }
                                (SolutionFn::Ver(sol_fn_test, sol_fn_real, label), Some(inp)) => {
                                    // todo
                                }
                                _ => {
                                    // nothing
                                }
                            };

                            match (sol, &day_data.real_input) {
                                (SolutionFn::Sim(sol_fn, label), Some(inp)) => {
                                    let sys_time = SystemTime::now();
                                    let real_answer = sol_fn(&inp);
                                    let real_time = sys_time.elapsed().unwrap();

                                    res.real_result = Answer::Res(real_answer, real_time);
                                }
                                (SolutionFn::Ver(sol_fn_test, sol_fn_real, label), Some(inp)) => {
                                    // todo
                                }
                                _ => {
                                    // nothing
                                }
                            };
                            let a = res.print(
                                if i == 0 { "part 1" } else { "      " },
                                &day_data.part1,
                                sol.get_label(),
                            );
                            // dbg!(&a);
                        }
                    }
                    if let Some(sol_vec) = self.solutions.get(&(day, true)) {
                        // dbg!(sol_vec.len());
                        for (i, sol) in sol_vec.into_iter().enumerate() {
                            let mut res = SolutionResult {
                                test_result: Answer::Skipped,
                                real_result: Answer::Skipped,
                            };

                            match (sol, &day_data.test_input) {
                                (SolutionFn::Sim(sol_fn, label), Some(inp)) => {
                                    let sys_time = SystemTime::now();
                                    let test_answer = sol_fn(&inp);
                                    let test_time = sys_time.elapsed().unwrap();

                                    res.test_result = Answer::Res(test_answer, test_time);
                                }
                                (SolutionFn::Ver(sol_fn_test, sol_fn_real, label), Some(inp)) => {
                                    // todo
                                }
                                _ => {
                                    // nothing
                                }
                            };

                            match (sol, &day_data.real_input) {
                                (SolutionFn::Sim(sol_fn, label), Some(inp)) => {
                                    let sys_time = SystemTime::now();
                                    let real_answer = sol_fn(&inp);
                                    let real_time = sys_time.elapsed().unwrap();

                                    res.real_result = Answer::Res(real_answer, real_time);
                                }
                                (SolutionFn::Ver(sol_fn_test, sol_fn_real, label), Some(inp)) => {
                                    // todo
                                }
                                _ => {
                                    // nothing
                                }
                            };
                            let a = res.print(
                                if i == 0 { "part 2" } else { "      " },
                                &day_data.part2,
                                sol.get_label(),
                            );
                            // dbg!(&a);
                        }
                    }
                }
            }
        }
    }

    pub fn day(mut self, d: i32) -> Self {
        if d >= 1 && d <= 25 {
            self.curr_day = Some(d);
        } else {
            self.curr_day = None;
            println!("Day should be 1-25");
        }

        self
    }

    pub fn part1(self, solution: SolutionFn<'a>) -> Self {
        self.add_solution(false, solution)
    }

    pub fn part2(self, solution: SolutionFn<'a>) -> Self {
        self.add_solution(true, solution)
    }

    pub fn add_solution(mut self, is_part_2: bool, solution: SolutionFn<'a>) -> Self {
        if let Some(day) = self.curr_day {
            let mut en = self.solutions.entry((day, is_part_2)).or_insert(vec![]);
            en.push(solution);
        };

        self
    }

    fn parse_inputs(input_folder: &str) -> (Option<String>, Option<String>) {
        let test_inp = fs::read_to_string(format!("{}/test.txt", input_folder)).ok();
        let input = fs::read_to_string(format!("{}/input.txt", input_folder)).ok();

        (test_inp, input)
    }

    fn parse_answers(path: &str) -> (PartAnswers, PartAnswers) {
        let mut part1_test_parts: Vec<String> = vec![];
        let mut part1_real_parts: Vec<String> = vec![];
        let mut part2_test_parts: Vec<String> = vec![];
        let mut part2_real_parts: Vec<String> = vec![];

        let mut stage = 0;

        match fs::read_to_string(path) {
            Ok(aa) => {
                for line in aa.lines() {
                    match line {
                        "- part1_test" => stage = 1,
                        "- part1" => stage = 2,
                        "- part2_test" => stage = 3,
                        "- part2" => stage = 4,
                        _ => match stage {
                            1 => part1_test_parts.push(line.to_string()),
                            2 => part1_real_parts.push(line.to_string()),
                            3 => part2_test_parts.push(line.to_string()),
                            4 => part2_real_parts.push(line.to_string()),
                            _ => (),
                        },
                    }
                }
            }
            Err(e) => {
                println!(
                    "Can't oped the file with answers\nPath: '{}'\nError: {}",
                    path, e
                );
            }
        }

        fn to_option_string(v: Vec<String>) -> Option<String> {
            match v.is_empty() {
                true => None,
                false => Some(v.join("\n")),
            }
        }

        let part1 = PartAnswers {
            test_answer: to_option_string(part1_test_parts),
            real_answer: to_option_string(part1_real_parts),
        };
        let part2 = PartAnswers {
            test_answer: to_option_string(part2_test_parts),
            real_answer: to_option_string(part2_real_parts),
        };

        (part1, part2)
    }
}
