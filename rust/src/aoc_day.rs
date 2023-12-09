use std::collections::HashMap;
use std::fmt::{Debug, Display, Formatter};
use std::fs::File;
use std::hint::black_box;
use std::io::Write;
use std::time::{Duration, SystemTime};
use std::{fs, io};

pub struct Params {
    days: u64, //   ...000 = ...day2.p1,day1.p2,day1.p1
    filter: String,
    debug: bool,
    save: bool,
}

pub struct AoCDay {
    year: u32,
    filter: String,
    last_printed_part: String, // todo remove
    filter_days: u64,
    debug: bool,
    printer: Printer,
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

struct Printer {
    save: bool,
    file: File,
}

impl Printer {
    // todo move all "print" stuff here
    pub fn new(path: &str, save: bool) -> Self {
        if save {
            if let Err(e) = fs::remove_file(path) {
                eprintln!("Couldn't remove results file: {}", e);
            }
        }

        let file = fs::OpenOptions::new()
            .write(true)
            .append(true)
            .create(true)
            .open(path)
            .unwrap();

        Self { save, file }
    }

    pub fn print_lines(&mut self, lines: &[String]) {
        lines.iter().for_each(|l| self.print(l))
    }

    pub fn print(&mut self, line: &str) {
        println!("{}", line);
        if self.save {
            if let Err(e) = writeln!(self.file, "{}", line) {
                eprintln!("Couldn't write to file: {}", e);
            }
        }
    }

    pub fn end(&mut self) {
        if self.save {
            if let Err(e) = writeln!(self.file, "```") {
                eprintln!("Couldn't write to file: {}", e);
            }
        }
    }
}

impl AoCDay {
    pub fn new(year: u32, params: Params) -> Self {
        println!("days: {:b}", params.days);
        println!("filter: `{}`", params.filter);
        println!("debug: `{}`", params.debug);
        println!("save: {}", params.save);
        println!();

        let mut printer = Printer::new("results.md", params.save);
        printer.print(&format!("```\n      Advent of Code  🎄{}🎄", year));

        AoCDay {
            year,
            filter: params.filter,
            last_printed_part: "".to_string(),
            filter_days: params.days,
            debug: params.debug,
            printer,
        }
    }

    fn parse_answers(name: &str, path: &str) -> Part {
        match fs::read_to_string(path) {
            Ok(content) => Part {
                name: name.to_string(),
                answer: Some(content),
                solutions: vec![],
            },
            Err(e) => {
                eprintln!(
                    "Can't oped the file with answers\nPath: '{}'\nError: {}",
                    path, e
                );

                Part {
                    name: name.to_string(),
                    answer: None,
                    solutions: vec![],
                }
            }
        }
    }

    fn get_part_prefix(&mut self, part_name: &str) -> String {
        if self.last_printed_part == part_name {
            " ".repeat("part1".len())
        } else {
            self.last_printed_part = part_name.to_string();
            part_name.to_string()
        }
    }

    fn print_solution(&mut self, solution: &Solution, part: &Part) -> Vec<String> {
        solution
            .render_to_lines(part)
            .iter()
            .map(|l| format!("        {} {}", self.get_part_prefix(&part.name), l))
            .collect::<Vec<String>>()
    }

    pub fn run_day<const DAY: i32>(mut self, measurement_fns: &[(i32, &str, &SolutionFn)]) -> Self {
        let (p1_allowed, p2_allowed) = self.is_allowed(DAY);
        if !p1_allowed && !p2_allowed {
            return self;
        }

        self.last_printed_part = "".to_string();

        self.printer.print(&format!(
            "  ❄️{}/{:02}        average     fastest       total  iters |",
            self.year, DAY
        ));

        let answer_folder = format!("../{}/answers/", self.year,);
        let part1 = AoCDay::parse_answers(
            "part1",
            &format!("{}/day{:02}-part1.txt", answer_folder, DAY),
        );
        let part2 = AoCDay::parse_answers(
            "part2",
            &format!("{}/day{:02}-part2.txt", answer_folder, DAY),
        );

        let mut something_runned = false;
        for (part, label, measurement_fn) in measurement_fns {
            let filter_passed = self.filter.is_empty() || label.contains(&self.filter);
            let day_passed = (part == &1 && p1_allowed) || (part == &2 && p2_allowed);

            if day_passed && filter_passed {
                match self.run_part(DAY, label, measurement_fn) {
                    Ok(solution) => {
                        let lines = if *part == 1 {
                            self.print_solution(&solution, &part1)
                        } else {
                            self.print_solution(&solution, &part2)
                        };

                        self.printer.print_lines(&lines);
                    }
                    Err(err) => println!("{err}"),
                }
                something_runned = true;
            }
        }
        if !something_runned {
            self.printer
                .print("              --- No solutions were run, check arguments ---");
        }

        self
    }

    pub fn end(&mut self) {
        self.printer.print("```");
    }

    fn run_part(
        &self,
        day: i32,
        description: &str,
        measurement_fn: impl Fn(&str) -> (Duration, String),
    ) -> Result<Solution, String> {
        let input_folder = format!("../inputs/{}/", self.year);
        let input = fs::read_to_string(format!("{}/day{:02}.txt", input_folder, day));

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

    pub fn parse_env_args() -> Params {
        // args: 1 2.1 dbg save --filter "some filter"

        let mut filter_next = false;
        let mut filter = String::new();

        let mut debug = false;
        let mut save = false;
        let mut days: u64 = 0;

        for part in std::env::args() {
            if part == "--filter" {
                filter_next = true
            } else if filter_next {
                filter_next = false;
                filter = part
            } else if part == "dbg" || part == "debug" {
                debug = true;
            } else if part == "save" {
                save = true;
            } else if let Some((day, parts)) = AoCDay::parse_day(&part) {
                days |= parts << ((day - 1) * 2);
            }
        }

        Params {
            days: if days == 0 { u64::MAX } else { days },
            filter,
            debug,
            save,
        }
    }

    fn parse_day(raw: &str) -> Option<(i32, u64)> {
        let (day, part) = raw.split_once('.').unwrap_or((raw, ""));
        let parts = match part {
            "1" => 0b01,
            "2" => 0b10,
            "" => 0b11,
            _ => return None,
        };

        match day.parse::<i32>() {
            Ok(day) if (0..=25).contains(&day) => Some((day, parts)),
            _ => None,
        }
    }

    fn is_allowed(&self, day: i32) -> (bool, bool) {
        let filtered_parts = self.filter_days >> ((day - 1) * 2) & 0b11;

        let p1_allowed = filtered_parts & 0b01 != 0;
        let p2_allowed = filtered_parts & 0b10 != 0;
        (p1_allowed, p2_allowed)
    }
}
