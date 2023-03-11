use std::collections::{HashMap, HashSet};
use std::fmt::Display;
use std::time::{Duration, SystemTime};
use std::{fs, io};

pub struct AoCYear {
    year: i32,
    day_flags: HashSet<i32>,
    days: HashMap<i32, AoCYearDay>,
}

pub struct AoCYearDay {
    day: i32,
    test_input: io::Result<String>,
    real_input: io::Result<String>,
    part1: Part,
    part2: Part,
}

struct Part {
    test_answer: Option<String>, // the correct answer from the adventofcode.com
    real_answer: Option<String>, // the correct answer from the adventofcode.com

                                 // solutions: Vec<Solution>,
}

struct Solution {
    test_result: Answer,
    real_result: Answer,
}

impl Solution {
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
    fn print(&self, correct_test: &Option<String>, correct_real: &Option<String>, label: &str) {
        let (test_label, test_results) = self.answer_to_strings(&self.test_result, correct_test);
        let (real_label, real_results) = self.answer_to_strings(&self.real_result, correct_real);

        println!("{} {} {}", test_label, real_label, label);

        for l in test_results {
            println!("{}", l);
        }
        for l in real_results {
            println!("              {}", l);
        }
    }
}

enum Answer {
    Res(String, Duration),
    Skipped,
    // InProgress(some_timestamp), // todo when we run solutions asynchronously
}

pub trait MySolution<T: Display> {
    fn init(&self) -> (i32, &'static str); // (day, label)
    fn part1(&self, input: &str, is_real: bool) -> T;
    fn part2(&self, input: &str, is_real: bool) -> T;
}

impl AoCYear {
    pub fn new(year: i32, day_flags: HashSet<i32>) -> Self {
        let mut days = HashMap::new();

        for day in 1..=25 {
            let input_folder = format!("../{}/inputs/d{:02}", year, day);
            let (test_input, real_input) = AoCYear::parse_inputs(&input_folder);
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

        AoCYear {
            year,
            day_flags,
            days,
        }
    }

    fn parse_inputs(input_folder: &str) -> (io::Result<String>, io::Result<String>) {
        let test_inp = fs::read_to_string(format!("{}/test.txt", input_folder));
        let input = fs::read_to_string(format!("{}/input.txt", input_folder));

        (test_inp, input)
    }

    fn parse_answers(path: &str) -> (Part, Part) {
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

        let part1 = Part {
            test_answer: to_option_string(part1_test_parts),
            real_answer: to_option_string(part1_real_parts),
        };
        let part2 = Part {
            test_answer: to_option_string(part2_test_parts),
            real_answer: to_option_string(part2_real_parts),
        };

        (part1, part2)
    }

    pub fn run<T: Display>(&self, solutions: &[impl MySolution<T>]) {
        for solution in solutions {
            let (day, label) = solution.init();
            let day_prefix = format!("{}/{:02}:", self.year, day);

            if let Some(day_data) = self.days.get(&day) {
                match AoCYear::run_part(day_data, &|a, b| solution.part1(a, b)) {
                    Ok(s) => {
                        println!("{day_prefix} part 1");
                        s.print(
                            &day_data.part1.test_answer,
                            &day_data.part1.real_answer,
                            label,
                        );
                    }
                    Err(err) => println!("{err}"),
                };
                match AoCYear::run_part(day_data, &|a, b| solution.part2(a, b)) {
                    Ok(s) => {
                        println!("{day_prefix} part 2");
                        s.print(
                            &day_data.part2.test_answer,
                            &day_data.part2.real_answer,
                            label,
                        );
                    }
                    Err(err) => println!("{err}"),
                };
            };
        }
    }

    /*    pub fn part1<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
            match self.run_part(label, solution) {
                Ok(solution) => self.part1.solutions.push(solution),
                Err(err) => println!("{err}"),
            }
            self
        }
    */

    fn run_part<T: Display>(
        day: &AoCYearDay,
        solution: &dyn Fn(&str, bool) -> T,
    ) -> Result<Solution, String> {
        match (&day.test_input, &day.real_input) {
            (Ok(test_input), Ok(real_input)) => {
                let sys_time = SystemTime::now();
                let test_answer = solution(test_input, false);
                let test_time = sys_time.elapsed().unwrap();

                let sys_time = SystemTime::now();
                let real_answer = solution(real_input, true);
                let real_time = sys_time.elapsed().unwrap();

                Ok(Solution {
                    test_result: Answer::Res(test_answer.to_string(), test_time),
                    real_result: Answer::Res(real_answer.to_string(), real_time),
                })
            }
            (Err(err), _) => Err(format!(
                "Day {} test input file is invalid\n{}",
                day.day, err
            )),
            (_, Err(err)) => Err(format!(
                "Day {} real input file is invalid\n{}",
                day.day, err
            )),
        }
    }
}
