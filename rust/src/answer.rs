use std::fmt::{Debug, Display, Formatter};
use std::fs;
use std::time::{Duration, SystemTime};

/*
// TODO
//  ??? add Options to inputs and answers
Day {
  day: 3,
  year: 2022,
  part_1: { // struct Part
    test_input: "2+2",
    test_answer: "4",
    real_input: "3+3",
    real_answer: "6",
    solutions: [
      { // struct Solution
        label: "naive js copy"
        test_answer: "4"
        real_answer: "6"
        test_times: [0.013,0.015]
        real_times: [0.013,0.015]
      },
      {
        label: "naive js copy"
        test_answer: "4"
        real_answer: "6"
        test_times: [0.013,0.015]
        real_times: [0.013,0.015]
      }
    ]
  },
  part_2: {
    test_input: "2*2",
    test_answer: "4",
    real_input: "3*3",
    real_answer: "9",
    solutions: [],
  },
}
*/

struct SolutionResult {
    res: String,
    time: Duration,
    descr: String,
}

impl SolutionResult {
    fn get_sec(&self) -> f64 {
        self.time.as_millis() as f64 / 1000.0
    }
}

struct PartAnswers {
    answer: String,
    results: Vec<SolutionResult>,
}

pub struct AoCDay {
    year: u32,
    day: u32,
    inputs: [String; 2],     // [test, real]
    part1: [PartAnswers; 2], // [test, real]
    part2: [PartAnswers; 2], // [test, real]
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
            inputs: [test_inp, input],
            part1,
            part2,
        }
    }

    fn parse_answers(path: &str) -> ([PartAnswers; 2], [PartAnswers; 2]) {
        let mut part1_test_parts = vec![];
        let mut part1_parts = vec![];
        let mut part2_test_parts = vec![];
        let mut part2_parts = vec![];

        let mut stage = 0;

        for line in fs::read_to_string(path).unwrap().lines() {
            match line {
                "- part1_test" => stage = 1,
                "- part1" => stage = 2,
                "- part2_test" => stage = 3,
                "- part2" => stage = 4,
                _ => match stage {
                    1 => part1_test_parts.push(line.to_string()),
                    2 => part1_parts.push(line.to_string()),
                    3 => part2_test_parts.push(line.to_string()),
                    4 => part2_parts.push(line.to_string()),
                    _ => (),
                },
            }
        }
        let part1_test = PartAnswers {
            answer: part1_test_parts.join("\n"),
            results: vec![],
        };
        let part1 = PartAnswers {
            answer: part1_parts.join("\n"),
            results: vec![],
        };
        let part2_test = PartAnswers {
            answer: part2_test_parts.join("\n"),
            results: vec![],
        };
        let part2 = PartAnswers {
            answer: part2_parts.join("\n"),
            results: vec![],
        };

        ([part1_test, part1], [part2_test, part2])
    }

    pub fn test_only<R: Display>(self, _label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        solution(&self.inputs[0]);
        self
    }

    pub fn real_only<R: Display>(self, _label: &str, solution: &dyn Fn(&str) -> R) -> Self {
        solution(&self.inputs[1]);
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
        is_part_2: bool, // todo fix
    ) -> Self {
        let sys_time = SystemTime::now();
        let current_answer = solution(&self.inputs[0]);
        let time = sys_time.elapsed().unwrap();

        let res = SolutionResult {
            res: current_answer.to_string(),
            time,
            descr: description.to_string(),
        };

        if is_part_2 {
            self.part2[0].results.push(res);
        } else {
            self.part1[0].results.push(res);
        }

        let sys_time = SystemTime::now();
        let current_answer = solution(&self.inputs[1]);
        let time = sys_time.elapsed().unwrap();

        let res = SolutionResult {
            res: current_answer.to_string(),
            time,
            descr: description.to_string(),
        };

        if is_part_2 {
            self.part2[1].results.push(res);
        } else {
            self.part1[1].results.push(res);
        }

        self
    }

    fn render_part(&self, test_data: &PartAnswers, actual_data: &PartAnswers) -> String {
        let mut res = vec![];
        /*
        todo make more compact

        2022/09: part 1 ✅ [sec 0.000] ✅ [sec 0.008] naive js copy
                        ✅ [sec 0.000] ✅ [sec 0.008] optimal solution
                 part 2 ✅ [sec 0.000] ✅ [sec 0.015] naive js copy
        */
        let test_iter = test_data.results.iter();
        let result_iter = actual_data.results.iter();

        for (test_results, real_results) in test_iter.zip(result_iter) {
            let test_time = test_results.get_sec();
            let real_time = real_results.get_sec();
            let description = &test_results.descr;

            let is_test_ok = test_data.answer == test_results.res;
            let is_real_ok = actual_data.answer == real_results.res;

            match (is_test_ok, is_real_ok) {
                (true, true) => res.push(format!(
                    "      ✅ [sec {:.3}] ✅ [sec {:.3}] {description}",
                    test_time, real_time
                )),
                (true, false) => {
                    res.push(format!(
                        "      ✅ [sec {:.3}] ❌ ----------- {description}",
                        test_time
                    ));
                }
                (false, true) => {
                    res.push(format!(
                        "      ❌ ----------- ✅ [sec {:.3}] {description}",
                        test_time
                    ));
                }
                (false, false) => {
                    res.push(format!("      ❌ ----------- ❌ ----------- {description}"));
                }
            };
            if !is_test_ok {
                res.push(format!(
                    "      expected: {}",
                    optional_ln(&test_data.answer)
                ));
                res.push(format!(
                    "      actual:   {}",
                    optional_ln(&test_results.res)
                ));
            }
            if !is_real_ok {
                res.push(format!(
                    "                      actual:   {}",
                    optional_ln(&real_results.res)
                ));
                res.push(format!(
                    "                      expected: {}",
                    optional_ln(&actual_data.answer)
                ));
            }
        }

        fn optional_ln(s: &str) -> String {
            if s.contains('\n') {
                format!("\n{s}")
            } else {
                s.to_string()
            }
        }

        res.join("\n")
    }
}

impl Display for AoCDay {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        // todo check if results part1 and/or part2 exist

        let mut res = "".to_string();

        res.push_str(&format!("{}/{:02}:\n", self.year, self.day));

        res.push_str("  part 1\n");
        res.push_str(&self.render_part(&self.part1[0], &self.part1[1]));
        res.push('\n');

        res.push_str("  part 2\n");
        res.push_str(&self.render_part(&self.part2[0], &self.part2[1]));

        write!(f, "{}", res)
    }
}
