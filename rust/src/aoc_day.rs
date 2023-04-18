use std::collections::HashSet;
use std::fmt::{Debug, Display, Formatter};
use std::io::Write;
use std::time::{Duration, SystemTime};
use std::{fs, io};

pub struct AoCDay {
    year: u32,
    day: u32,
    test_input: io::Result<String>,
    real_input: io::Result<String>,
    part1: Part,
    part2: Part,
    last_printed_day: String,
    last_printed_part: String,
    do_not_run: bool,
}

struct Part {
    test_answer: Option<String>, // correct answer
    real_answer: Option<String>, // correct answer
    solutions: Vec<Solution>,
}

struct Solution {
    label: String,
    test_result: Answer,
    real_result: Answer,
}

enum Answer {
    Res(String, Duration),
    Skipped,
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

    fn render_to_lines(&self, part: &Part) -> Vec<String> {
        let mut res = vec![];

        let (test_label, test_results) =
            self.answer_to_strings(&self.test_result, &part.test_answer);
        let (real_label, real_results) =
            self.answer_to_strings(&self.real_result, &part.real_answer);

        res.push(format!("{} {} {}", test_label, real_label, self.label));

        for l in test_results {
            res.push(l);
        }
        for l in real_results {
            res.push(format!("              {}", l));
        }

        res
    }
}

impl AoCDay {
    pub fn new(year: u32, day: u32, flag_days: &HashSet<i32>) -> Self {
        let input_folder = format!("../{}/inputs/d{:02}", year, day);
        let (test_input, real_input) = AoCDay::parse_inputs(&input_folder);
        let (part1, part2) = AoCDay::parse_answers(&format!("{}/answer.txt", input_folder));

        AoCDay {
            year,
            day,
            test_input,
            real_input,
            part1,
            part2,
            last_printed_day: "".to_string(),
            last_printed_part: "".to_string(),
            do_not_run: !(flag_days.contains(&(day as i32)) || flag_days.is_empty()),
        }
    }

    pub fn get_test_data(year: u32, day: u32, part: u32) -> (String, String) {
        let input_folder = format!("../{}/inputs/d{:02}", year, day);
        let (test_input, _) = AoCDay::parse_inputs(&input_folder);
        let (part1, part2) = AoCDay::parse_answers(&format!("{}/answer.txt", input_folder));

        if part == 1 {
            (test_input.ok().unwrap(), part1.test_answer.unwrap())
        } else {
            (test_input.ok().unwrap(), part2.test_answer.unwrap())
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
            solutions: vec![],
        };
        let part2 = Part {
            test_answer: to_option_string(part2_test_parts),
            real_answer: to_option_string(part2_real_parts),
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

    pub fn part1<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        if !self.do_not_run {
            match self.run_part(label, solution, solution) {
                Ok(solution) => self.print_solution(&solution, "part1"),
                Err(err) => println!("{err}"),
            }
        }
        self
    }

    pub fn part1_ver<R: Display>(
        mut self,
        label: &str,
        solution_test: &dyn Fn(&str) -> R,
        solution_real: &dyn Fn(&str) -> R,
    ) -> Self {
        if !self.do_not_run {
            match self.run_part(label, solution_test, solution_real) {
                Ok(solution) => self.print_solution(&solution, "part1"),
                Err(err) => println!("{err}"),
            }
        }
        self
    }

    pub fn part2<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        if !self.do_not_run {
            match self.run_part(label, solution, solution) {
                Ok(solution) => self.print_solution(&solution, "part2"),
                Err(err) => println!("{err}"),
            }
        }
        self
    }

    pub fn part2_ver<R: Display>(
        mut self,
        label: &str,
        solution_test: &dyn Fn(&str) -> R,
        solution_real: &dyn Fn(&str) -> R,
    ) -> Self {
        if !self.do_not_run {
            match self.run_part(label, solution_test, solution_real) {
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
        solution_test: &dyn Fn(&str) -> R,
        solution_real: &dyn Fn(&str) -> R,
    ) -> Result<Solution, String> {
        match (&self.test_input, &self.real_input) {
            (Ok(test_input), Ok(real_input)) => {
                let sys_time = SystemTime::now();
                let test_answer = solution_test(test_input);
                let test_time = sys_time.elapsed().unwrap();

                let sys_time = SystemTime::now();
                let real_answer = solution_real(real_input);
                let real_time = sys_time.elapsed().unwrap();

                Ok(Solution {
                    label: description.to_string(),
                    test_result: Answer::Res(test_answer.to_string(), test_time),
                    real_result: Answer::Res(real_answer.to_string(), real_time),
                })
            }
            (Err(err), _) => Err(format!(
                "Day {} test input file is invalid\n{}",
                self.day, err
            )),
            (_, Err(err)) => Err(format!(
                "Day {} real input file is invalid\n{}",
                self.day, err
            )),
        }
    }
}
