use std::collections::HashSet;
use std::fmt::{Debug, Display, Formatter};
use std::hint::black_box;
use std::io::Write;
use std::time::{Duration, SystemTime};
use std::{fs, io};

pub struct AoCDay {
    year: u32,
    part1: Part,
    part2: Part,
    last_printed_part: String,
    flag_days: HashSet<i32>,
}

struct Part {
    correct_answer: Option<String>,
    solutions: Vec<Solution>,
}

struct Solution {
    label: String,
    answer: String,
    times: Vec<Duration>,
}

impl Solution {
    fn format_duration(&self, time: Duration) -> String {
        let sec = time.as_secs();
        let mils = time.subsec_millis();
        let micr = time.subsec_micros() % 1000;
        format!("{:2}:{:03}.{:03}", sec, mils, micr)
    }

    fn answer_to_strings(&self, correct_result: &Option<String>) -> (String, Vec<String>) {
        let average_time = self.times.iter().sum::<Duration>() / self.times.len() as u32;
        let fastest_time = self.times.iter().min().unwrap();
        let total_time = self.times.iter().sum::<Duration>();

        let icon = match correct_result {
            Some(correct) => {
                if *self.answer == *correct {
                    "✅"
                } else {
                    "❌"
                }
            }
            None => "🛠",
        };

        let mut result_lines = vec![];
        match (correct_result, &self.answer) {
            (Some(v), actual) => {
                if *v != *actual {
                    result_lines.push(format!("expected: {}", v));
                    result_lines.push(format!("actual:   {}", actual));
                }
            }
            (None, r) => {
                result_lines.push(format!("result: {} (no correct answer)", r));
            }
        }

        let label_line = format!(
            "{icon} {}  {}  {}    {:3} | {}",
            self.format_duration(average_time),
            self.format_duration(*fastest_time),
            self.format_duration(total_time),
            self.times.len(),
            self.label,
        );

        (label_line, result_lines)
    }

    fn render_to_lines(&self, part: &Part) -> Vec<String> {
        let mut res = vec![];

        let (label, results) = self.answer_to_strings(&part.correct_answer);

        res.push(label);

        for l in results {
            res.push(l);
        }

        res
    }
}

impl AoCDay {
    pub fn new(year: u32, flag_days: &HashSet<i32>) -> Self {
        AoCDay {
            year,
            part1: Part {
                // todo
                correct_answer: None,
                solutions: vec![],
            },
            part2: Part {
                // todo
                correct_answer: None,
                solutions: vec![],
            },
            last_printed_part: "".to_string(),
            flag_days: flag_days.clone(),
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
                " ".repeat(7),
                self.get_part_prefix(part_name),
                l
            );
        })
    }

    pub fn run_day<const DAY: i32>(
        mut self,
        measurement_fns: &[(i32, &str, &dyn Fn(&str) -> (Duration, String))],
    ) -> Self {
        if self.flag_days.is_empty() || self.flag_days.contains(&DAY) {
            println!(
                "  🎄{}/{:02}        average     fastest       total  iters |",
                self.year, DAY
            );

            for (part, label, measurement_fn) in measurement_fns {
                match self.run_part_measurement(DAY, label, measurement_fn) {
                    Ok(solution) => {
                        if *part == 1 {
                            self.print_solution(&solution, "part1")
                        } else {
                            self.print_solution(&solution, "part2")
                        }
                    }
                    Err(err) => println!("{err}"),
                }
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

    fn run_part_measurement(
        &mut self, // todo remove mut
        day: i32,
        description: &str,
        measurement_fn: impl Fn(&str) -> (Duration, String),
    ) -> Result<Solution, String> {
        let input_folder = format!("../{}/inputs/d{:02}", self.year, day);
        let input = AoCDay::parse_inputs(&input_folder);
        let (part1, part2) = AoCDay::parse_answers(&format!("{}/answer.txt", input_folder));

        self.part1 = part1; // todo remove
        self.part2 = part2;

        match &input {
            Ok(input) => {
                let mut times = vec![];

                let (time, answer) = measurement_fn(input);
                times.push(time);

                let iters = if times[0].as_millis() <= 10 {
                    100
                } else if times[0].as_millis() <= 100 {
                    10
                } else {
                    1
                };

                for _ in 1..iters {
                    let (time, _) = measurement_fn(input);
                    times.push(time);
                }

                Ok(Solution {
                    label: description.to_string(),
                    answer: answer.to_string(),
                    times,
                })
            }
            Err(err) => Err(format!("Day {} input file is invalid\n{}", day, err)),
        }
    }
}

/*

fn run<R: Display>(solutions: &[&dyn Fn(&str) -> R])

fn solution_1 (input: &str) -> i32
fn solution_2 (input: &str) -> usize

run(&[&solution_1, &solution_2])


*/
