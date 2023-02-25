use std::fmt::{Debug, Display, Formatter};
use std::io::BufRead;
use std::time::{Duration, SystemTime};
use std::{fs, io};

pub struct AoCDay {
    year: u32,
    day: u32,
    test_input: io::Result<String>,
    real_input: io::Result<String>,
    part1: Part,
    part2: Part,
}

struct Part {
    test_answer: Option<String>,
    real_answer: Option<String>,
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
}

impl Part {
    fn render_to_lines(&self) -> Vec<String> {
        self.solutions
            .iter()
            .flat_map(|solution| solution.render_to_lines(&self.test_answer, &self.real_answer))
            .collect()
    }
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
            Answer::Skipped => {
                "🪨--SKIPPED--".to_string()
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
            (_, Answer::Skipped) => (),
        }

        (label_line, result_lines)
    }

    fn render_to_lines(
        &self,
        correct_test: &Option<String>,
        correct_real: &Option<String>,
    ) -> Vec<String> {
        let mut res = vec![];

        let (test_label, test_results) = self.answer_to_strings(&self.test_result, correct_test);
        let (real_label, real_results) = self.answer_to_strings(&self.real_result, correct_real);

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
    pub fn new(year: u32, day: u32) -> Self {
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

    pub fn part1<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        match self.run_part(label, solution) {
            Ok(solution) => self.part1.solutions.push(solution),
            Err(err) => println!("{err}"),
        }
        self
    }

    pub fn part1_test<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        match self.run_test(label, solution) {
            Ok(solution) => self.part1.solutions.push(solution),
            Err(err) => println!("{err}"),
        }
        self
    }

    pub fn part1_real<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        match self.run_real(label, solution) {
            Ok(solution) => self.part1.solutions.push(solution),
            Err(err) => println!("{err}"),
        }
        self
    }

    pub fn part2_test<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        match self.run_test(label, solution) {
            Ok(solution) => self.part2.solutions.push(solution),
            Err(err) => println!("{err}"),
        }
        self
    }

    pub fn part2_real<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        match self.run_real(label, solution) {
            Ok(solution) => self.part2.solutions.push(solution),
            Err(err) => println!("{err}"),
        }
        self
    }

    pub fn part2<R: Display>(mut self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        match self.run_part(label, solution) {
            Ok(solution) => self.part2.solutions.push(solution),
            Err(err) => println!("{err}"),
        }
        self
    }

    pub fn print(&self) {
        println!("{}", self);
    }

    fn run_part<R: Display>(
        &self,
        description: &str,
        solution: &dyn Fn(&str) -> R,
    ) -> Result<Solution, String> {
        match (&self.test_input, &self.real_input) {
            (Ok(test_input), Ok(real_input)) => {
                let sys_time = SystemTime::now();
                let test_answer = solution(test_input);
                let test_time = sys_time.elapsed().unwrap();

                let sys_time = SystemTime::now();
                let real_answer = solution(real_input);
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

    // todo WIP
    fn run_test<R: Display>(
        &self,
        description: &str,
        solution: &dyn Fn(&str) -> R,
    ) -> Result<Solution, String> {
        match &self.test_input {
            Ok(test_input) => {
                let sys_time = SystemTime::now();
                let test_answer = solution(test_input);
                let test_time = sys_time.elapsed().unwrap();

                Ok(Solution {
                    label: description.to_string(),
                    test_result: Answer::Res(test_answer.to_string(), test_time),
                    real_result: Answer::Skipped,
                })
            }
            Err(err) => Err(format!(
                "Day {} test input file is invalid\n{}",
                self.day, err
            )),
        }
    }

    // todo WIP
    fn run_real<R: Display>(
        &self,
        description: &str,
        solution: &dyn Fn(&str) -> R,
    ) -> Result<Solution, String> {
        match &self.real_input {
            Ok(real_input) => {
                let sys_time = SystemTime::now();
                let real_answer = solution(real_input);
                let real_time = sys_time.elapsed().unwrap();

                Ok(Solution {
                    label: description.to_string(),
                    test_result: Answer::Skipped,
                    real_result: Answer::Res(real_answer.to_string(), real_time),
                })
            }
            Err(err) => Err(format!(
                "Day {} real input file is invalid\n{}",
                self.day, err
            )),
        }
    }
}

impl Display for AoCDay {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let mut res = vec![];
        let day_prefix = format!("{}/{:02}:", self.year, self.day);

        // todo idea ???
        //    store offset of strings separately to reduce intermediate string concatenations
        let part1_lines = self.part1.render_to_lines();
        if !part1_lines.is_empty() {
            res.push(format!("{day_prefix} part 1 {}", part1_lines[0]));
            for l in &part1_lines[1..] {
                res.push(format!("{}{}", " ".repeat(16), l));
            }
        }

        let part2_lines = self.part2.render_to_lines();
        if !part2_lines.is_empty() {
            if part1_lines.is_empty() {
                res.push(format!("{day_prefix} part 2 {}", part2_lines[0]));
            } else {
                res.push(format!("{} part 2 {}", " ".repeat(8), part2_lines[0]));
            }

            for l in &part2_lines[1..] {
                res.push(format!("{}{}", " ".repeat(16), l));
            }
        }

        write!(f, "{}", res.join("\n") + "\n")
    }
}
