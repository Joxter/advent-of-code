use std::collections::HashMap;
use std::fmt::{Debug, Display, Formatter};
use std::hint::black_box;
use std::io::Write;
use std::time::{Duration, SystemTime};
use std::{fs, io};

pub struct AoCDay {
    year: u32,
    filter: String,
    last_printed_part: String,
    flag_days: HashMap<i32, (bool, bool)>,
    debug: bool,
}

struct Part {
    name: String,
    answer: Option<String>,
    solutions: Vec<Solution>,
}

struct Solution {
    label: String,
    res: String,
    times: Vec<Duration>,
}

type SolutionFn = dyn Fn(&str) -> (Duration, String);

impl Solution {
    fn format_duration(&self, time: &Duration) -> String {
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
                if *self.res == *correct {
                    "✅"
                } else {
                    "❌"
                }
            }
            None => "🛠",
        };

        let mut result_lines = vec![];
        match (correct_result, &self.res) {
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
            self.format_duration(&average_time),
            self.format_duration(fastest_time),
            self.format_duration(&total_time),
            self.times.len(),
            self.label,
        );

        (label_line, result_lines)
    }

    fn render_to_lines(&self, part: &Part) -> Vec<String> {
        let mut res = vec![];

        let (label, results) = self.answer_to_strings(&part.answer);

        res.push(label);
        for l in results {
            res.push(l);
        }

        res
    }
}

impl AoCDay {
    pub fn new(
        year: u32,
        flag_days: &HashMap<i32, (bool, bool)>,
        filter: &str,
        debug: bool,
    ) -> Self {
        println!("flag_days: {:?}", flag_days);
        println!("filter: `{}`", filter);
        println!();

        println!("      Advent of Code  🎄{}🎄", year);

        AoCDay {
            year,
            filter: filter.to_string(),
            last_printed_part: "".to_string(),
            flag_days: flag_days.clone(),
            debug,
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
            name: "part1".to_string(),
            answer: to_option_string(part1_parts),
            solutions: vec![],
        };
        let part2 = Part {
            name: "part2".to_string(),
            answer: to_option_string(part2_parts),
            solutions: vec![],
        };

        (part1, part2)
    }

    fn get_part_prefix(&mut self, part_name: &str) -> String {
        if self.last_printed_part == part_name {
            " ".repeat("part1".len())
        } else {
            self.last_printed_part = part_name.to_string();
            part_name.to_string()
        }
    }

    fn print_solution(&mut self, solution: &Solution, part: &Part) {
        solution.render_to_lines(part).iter().for_each(|l| {
            println!("        {} {}", self.get_part_prefix(&part.name), l);
        })
    }

    pub fn run_day<const DAY: i32>(mut self, measurement_fns: &[(i32, &str, &SolutionFn)]) -> Self {
        if !self.flag_days.is_empty() && !self.flag_days.contains_key(&DAY) {
            return self;
        }
        self.last_printed_part = "".to_string();

        println!(
            "  ❄️{}/{:02}        average     fastest       total  iters |",
            self.year, DAY
        );
        let input_folder = format!("../{}/inputs/d{:02}", self.year, DAY);
        let (part1, part2) = AoCDay::parse_answers(&format!("{}/answer.txt", input_folder));
        let (p1_allowed, p2_allowed) = *self.flag_days.get(&DAY).unwrap_or(&(true, true));
        let mut something_runned = false;

        for (part, label, measurement_fn) in measurement_fns {
            let filter_passed = self.filter.is_empty() || label.contains(&self.filter);
            let day_passed = (part == &1 && p1_allowed) || (part == &2 && p2_allowed);

            if day_passed && filter_passed {
                match self.run_part(DAY, label, measurement_fn) {
                    Ok(solution) => {
                        if *part == 1 {
                            self.print_solution(&solution, &part1)
                        } else {
                            self.print_solution(&solution, &part2)
                        }
                    }
                    Err(err) => println!("{err}"),
                }
                something_runned = true;
            }
        }
        if !something_runned {
            println!("              --- No solutions were run, check arguments ---");
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

    fn run_part(
        &self,
        day: i32,
        description: &str,
        measurement_fn: impl Fn(&str) -> (Duration, String),
    ) -> Result<Solution, String> {
        let input_folder = format!("../{}/inputs/d{:02}", self.year, day);
        let input = AoCDay::parse_inputs(&input_folder);

        match &input {
            Ok(input) => {
                let mut times = vec![];

                let (time, answer) = measurement_fn(input);
                times.push(time);

                let iters = if self.debug {
                    1
                } else if time.as_millis() <= 20 {
                    100
                } else if time.as_millis() <= 200 {
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
                    res: answer,
                    times,
                })
            }
            Err(err) => Err(format!("Day {} input file is invalid\n{}", day, err)),
        }
    }
}
