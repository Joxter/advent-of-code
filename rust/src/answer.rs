use std::fmt::{Debug, Display, Formatter};
use std::fs;
use std::time::{Duration, SystemTime};

// todo handle errors

pub struct AoCDay {
    year: u32,
    day: u32,
    test_input: String,
    real_input: String,
    part1: Part,
    part2: Part,
}

struct Part {
    test_answer: String,
    real_answer: String,
    solutions: Vec<Solution>,
}

struct Solution {
    label: String,
    test_answer: String,
    real_answer: String,
    test_time: Duration,
    real_time: Duration,
}

impl Solution {
    fn get_time_sec(&self) -> (f64, f64) {
        (
            self.test_time.as_millis() as f64 / 1000.0,
            self.real_time.as_millis() as f64 / 1000.0,
        )
    }

    fn render_to_lines(&self, correct_test: &str, correct_real: &str) -> Vec<String> {
        let mut res = vec![];

        let (test_time, real_time) = self.get_time_sec();
        let description = &self.label;
        let is_test_ok = self.test_answer == correct_test;
        let is_real_ok = self.real_answer == correct_real;

        match (is_test_ok, is_real_ok) {
            (true, true) => res.push(format!(
                "✅ [sec {:.3}] ✅ [sec {:.3}] {description}",
                test_time, real_time
            )),
            (true, false) => {
                res.push(format!(
                    "✅ [sec {:.3}] ❌ ----------- {description}",
                    test_time
                ));
            }
            (false, true) => {
                res.push(format!(
                    "❌ ----------- ✅ [sec {:.3}] {description}",
                    test_time
                ));
            }
            (false, false) => {
                res.push(format!("❌ ----------- ❌ ----------- {description}"));
            }
        };
        if !is_test_ok {
            res.push(format!("expected: {}", optional_ln(&correct_test)));
            res.push(format!("actual:   {}", optional_ln(&self.test_answer)));
        }
        if !is_real_ok {
            res.push(format!(
                "              actual:   {}",
                optional_ln(&correct_real)
            ));
            res.push(format!(
                "              expected: {}",
                optional_ln(&self.real_answer)
            ));
        }

        fn optional_ln(s: &str) -> String {
            if s.contains('\n') {
                format!("\n{s}")
            } else {
                s.to_string()
            }
        }

        res
    }
}

impl AoCDay {
    pub fn new(year: u32, day: u32) -> Self {
        let input_folder = format!("../{}/inputs/d{:02}", year, day);

        let test_inp = fs::read_to_string(format!("{}/test.txt", input_folder)).unwrap();
        let input = fs::read_to_string(format!("{}/input.txt", input_folder)).unwrap();
        let (part1, part2) = AoCDay::parse_answers(&format!("{}/answer.txt", input_folder));

        AoCDay {
            year,
            day,
            test_input: test_inp,
            real_input: input,
            part1,
            part2,
        }
    }

    fn parse_answers(path: &str) -> (Part, Part) {
        let mut part1_test_parts = vec![];
        let mut part1_real_parts = vec![];
        let mut part2_test_parts = vec![];
        let mut part2_real_parts = vec![];

        let mut stage = 0;

        for line in fs::read_to_string(path).unwrap().lines() {
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

        let part1 = Part {
            test_answer: part1_test_parts.join("\n"),
            real_answer: part1_real_parts.join("\n"),
            solutions: vec![],
        };
        let part2 = Part {
            test_answer: part2_test_parts.join("\n"),
            real_answer: part2_real_parts.join("\n"),
            solutions: vec![],
        };

        (part1, part2)
    }

    pub fn test_only<R: Display>(self, _label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        solution(&self.test_input);
        self
    }

    pub fn real_only<R: Display>(self, _label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        solution(&self.real_input);
        self
    }

    pub fn part1<R: Display>(self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        self.run_part(label, solution, false)
    }

    pub fn part2<R: Display>(self, label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        self.run_part(label, solution, true)
    }

    pub fn print(&self) {
        println!("{}", self);
    }

    fn run_part<R: Display>(
        mut self,
        description: &str,
        solution: &dyn Fn(&str) -> R,
        is_part_2: bool,
    ) -> Self {
        let sys_time = SystemTime::now();
        let test_answer = solution(&self.test_input);
        let test_time = sys_time.elapsed().unwrap();

        let sys_time = SystemTime::now();
        let real_answer = solution(&self.real_input);
        let real_time = sys_time.elapsed().unwrap();

        let res = Solution {
            label: description.to_string(),
            test_answer: test_answer.to_string(),
            real_answer: real_answer.to_string(),
            test_time: test_time,
            real_time: real_time,
        };

        if is_part_2 {
            self.part2.solutions.push(res);
        } else {
            self.part1.solutions.push(res);
        }

        self
    }
}

impl Display for AoCDay {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let mut res = "".to_string();
        let day_prefix = format!("{}/{:02}:", self.year, self.day);

        for solution in &self.part1.solutions {
            // todo move render_to_lines to Part
            for (i, line) in solution
                .render_to_lines(&self.part1.test_answer, &self.part1.real_answer)
                .iter()
                .enumerate()
            {
                if i == 0 {
                    res.push_str(&format!("{day_prefix} part 1 {}\n", line));
                } else {
                    res.push_str(&format!("{}{}\n", " ".repeat(16), line));
                    // todo idea ???
                    //    store offset of strings separately to reduce intermediate string concatenations
                }
            }
        }

        for solution in &self.part2.solutions {
            for (i, line) in solution
                .render_to_lines(&self.part2.test_answer, &self.part2.real_answer)
                .iter()
                .enumerate()
            {
                if i == 0 {
                    if (self.part1.solutions.is_empty()) {
                        res.push_str(&format!("{day_prefix} part 2 {}\n", line));
                    } else {
                        res.push_str(&format!("{} part 2 {}\n", " ".repeat(8), line));
                    }
                } else {
                    res.push_str(&format!("{}{}\n", " ".repeat(16), line));
                }
            }
        }

        write!(f, "{}", res)
    }
}
