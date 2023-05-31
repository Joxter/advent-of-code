use std::collections::HashSet;
use std::fmt::{Debug, Display, Formatter};
use std::hint::black_box;
use std::io::Write;
use std::time::{Duration, SystemTime};
use std::{fs, io};

pub struct AoCDay {
    year: u32,
    day: u32,
    input: io::Result<String>,
    part1: Part,
    part2: Part,
    last_printed_day: String,
    last_printed_part: String,
    do_not_run: bool,
}

struct Part {
    correct_answer: Option<String>,
    solutions: Vec<Solution>,
}

struct Solution {
    label: String,
    answer: Answer,
}

enum Answer {
    Res(String, Duration),
    // InProgress(some_timestamp), // todo when we run solutions asynchronously
}

impl Solution {
    fn answer_to_strings(
        &self,
        ans: &Answer,
        correct_result: &Option<String>,
    ) -> (String, Vec<String>) {
        let label_line = match ans {
            Answer::Res(v, time) => {
                let sec = time.as_secs();
                let mils = time.subsec_millis();
                let micr = time.subsec_micros() % 1000;
                let time_sec = format!("{:2}:{:03}.{:03}", sec, mils, micr);

                match correct_result {
                    Some(correct) => {
                        if *v == *correct {
                            format!("✅ [sec {}]", time_sec)
                        } else {
                            format!("❌ [sec {}]", time_sec)
                        }
                    }
                    None => format!("🛠️[sec {}]", time_sec),
                }
            }
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
        }

        (label_line, result_lines)
    }

    fn render_to_lines(&self, part: &Part) -> Vec<String> {
        let mut res = vec![];

        let (label, results) = self.answer_to_strings(&self.answer, &part.correct_answer);

        res.push(format!("{} {}", label, self.label));

        for l in results {
            res.push(l);
        }

        res
    }
}

impl AoCDay {
    pub fn new(year: u32, day: u32, flag_days: &HashSet<i32>) -> Self {
        let input_folder = format!("../{}/inputs/d{:02}", year, day);
        let input = AoCDay::parse_inputs(&input_folder);
        let (part1, part2) = AoCDay::parse_answers(&format!("{}/answer.txt", input_folder));

        AoCDay {
            year,
            day,
            input,
            part1,
            part2,
            last_printed_day: "".to_string(),
            last_printed_part: "".to_string(),
            do_not_run: !(flag_days.contains(&(day as i32)) || flag_days.is_empty()),
        }
    }

    fn parse_inputs(input_folder: &str) -> io::Result<String> {
        let input = fs::read_to_string(format!("{}/input.txt", input_folder));
        input
    }

    fn parse_answers(path: &str) -> (Part, Part) {
        let mut part1_parts: Vec<String> = vec![];
        let mut part2_parts: Vec<String> = vec![];

        let mut stage = 0;

        match fs::read_to_string(path) {
            Ok(aa) => {
                for line in aa.lines() {
                    match line {
                        "- part1_test" => stage = 0,
                        "- part2_test" => stage = 0,
                        "- part1" => stage = 1,
                        "- part2" => stage = 2,
                        _ => match stage {
                            1 => part1_parts.push(line.to_string()),
                            2 => part2_parts.push(line.to_string()),
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
            correct_answer: to_option_string(part1_parts),
            solutions: vec![],
        };
        let part2 = Part {
            correct_answer: to_option_string(part2_parts),
            solutions: vec![],
        };

        (part1, part2)
    }

    fn get_day_prefix(&mut self) -> String {
        let a = format!("{}/{:02}:", self.year, self.day);
        if self.last_printed_day == a {
            " ".repeat(a.len())
        } else {
            self.last_printed_day = a.clone();
            a
        }
    }

    fn get_part_prefix(&mut self, part: &str) -> String {
        if self.last_printed_part == part {
            " ".repeat(part.len())
        } else {
            self.last_printed_part = part.to_string();
            part.to_string()
        }
    }

    fn print_solution(&mut self, solution: &Solution, part_name: &str) {
        let part = if part_name == "part1" {
            &self.part1
        } else {
            &self.part2
        };

        solution.render_to_lines(part).iter().for_each(|l| {
            println!(
                "{} {} {}",
                self.get_day_prefix(),
                self.get_part_prefix(part_name),
                l
            );
        })
    }

    pub fn part1<R: Display>(mut self, label: &str, solution_fn: impl Fn(&str) -> R) -> Self {
        if !self.do_not_run {
            match self.run_part(label, solution_fn) {
                Ok(solution) => self.print_solution(&solution, "part1"),
                Err(err) => println!("{err}"),
            }
        }
        self
    }

    pub fn part2<R: Display>(mut self, label: &str, solution_fn: impl Fn(&str) -> R) -> Self {
        if !self.do_not_run {
            match self.run_part(label, solution_fn) {
                Ok(solution) => self.print_solution(&solution, "part2"),
                Err(err) => println!("{err}"),
            }
        }
        self
    }

    pub fn clear_result_file() {
        if let Err(e) = fs::remove_file("results.md") {
            eprintln!("Couldn't remove results file: {}", e);
        }
    }

    fn append_to_file(str: &str) {
        /*        let out = format!("{}", self);
                println!("{out}");
                AoCDay::append_to_file(&out);
        */
        let mut file = fs::OpenOptions::new()
            .write(true)
            .append(true)
            .create(true)
            .open("results.md")
            .unwrap();

        if let Err(e) = writeln!(file, "```text\n{}```", str) {
            eprintln!("Couldn't write to file: {}", e);
        }
    }

    fn run_part<R: Display>(
        &self,
        description: &str,
        solution_fn: impl Fn(&str) -> R,
    ) -> Result<Solution, String> {
        match &self.input {
            Ok(input) => {
                let sys_time = SystemTime::now();
                let answer = black_box(solution_fn(black_box(input)));
                let time = sys_time.elapsed().unwrap();

                Ok(Solution {
                    label: description.to_string(),
                    answer: Answer::Res(answer.to_string(), time),
                })
            }
            Err(err) => Err(format!("Day {} input file is invalid\n{}", self.day, err)),
        }
    }
}
