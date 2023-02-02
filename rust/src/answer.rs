use std::fmt::{Debug, Display};
use std::fs;
use std::time::{Duration, SystemTime};

/*
// now:
AoCDay::new(2022, 6)
    .part1("naive js copy", &day06::naive_js_copy_part1)
    .part2("naive js copy", &day06::naive_js_copy_part2);

// 2022/06 part 1
//   ✅ [sec 0.000] (test) naive js copy
//   ✅ [sec 0.004] naive js copy
// 2022/06 part 2
//   ✅ [sec 0.000] (test) naive js copy
//   ✅ [sec 0.018] naive js copy

todo sort of:
// 2022/06:
//   part 1
//     ✅[sec 0.123] ✅[sec 0.123] naive js copy
//     ✅[sec 0.000] ✅[sec 0.004] fast
//   part 2
//     ❌[sec 0.123] ------------- naive js copy
//       expected: 123
//       actual:   111
//     ❌------------ [sec 0.123]  naive js copy
//       expected: 123
//       actual:   111
*/

pub struct Answers {
    for_test: String,
    for_input: String,
}

pub struct AoCDay {
    year: u32,
    day: u32,
    test_input: String,
    input: String,
    part1_answers: Option<Answers>,
    part2_answers: Option<Answers>,
}

impl AoCDay {
    pub fn new(year: u32, day: u32) -> Self {
        let input_folder = format!("../{}/inputs/d{:02}", year, day);

        let test_inp = fs::read_to_string(format!("{}/test.txt", input_folder)).unwrap();
        let input = fs::read_to_string(format!("{}/input.txt", input_folder)).unwrap();
        let (part1, part2) = AoCDay::parse_parts(format!("{}/answer.txt", input_folder).as_str());

        AoCDay {
            year,
            day,
            test_input: test_inp,
            input,
            part1_answers: Some(part1),
            part2_answers: Some(part2),
        }
    }

    pub fn parse_parts(path: &str) -> (Answers, Answers) {
        let mut part1 = Answers {
            for_test: "".to_string(),
            for_input: "".to_string(),
        };
        let mut part2 = Answers {
            for_test: "".to_string(),
            for_input: "".to_string(),
        };

        let mut stage = 0;
        for line in fs::read_to_string(path).unwrap().lines() {
            match line {
                "- part1_test" => stage = 1,
                "- part1" => stage = 2,
                "- part2_test" => stage = 3,
                "- part2" => stage = 4,
                _ => match stage {
                    1 => part1.for_test.push_str(line),
                    2 => part1.for_input.push_str(line),
                    3 => part2.for_test.push_str(line),
                    4 => part2.for_input.push_str(line),
                    _ => (),
                },
            }
        }

        (part1, part2)
    }

    pub fn part1<F, R: Display>(&self, description: &str, solution: &F) -> &Self
    where
        F: Fn(&str) -> R,
    {
        println!("{}/{:02} part 1", self.year, self.day);

        if let Some(answer) = &self.part1_answers {
            let sys_time = SystemTime::now();
            let current_answer = solution(&self.test_input);
            let time = sys_time.elapsed().unwrap();

            self.print_res(
                &format!("(test) {}", description),
                &answer.for_test,
                &current_answer.to_string(),
                &time,
            );

            let sys_time = SystemTime::now();
            let current_answer = solution(&self.input);
            let time = sys_time.elapsed().unwrap();

            self.print_res(
                &description,
                &answer.for_input,
                &current_answer.to_string(),
                &time,
            );
        } else {
            unimplemented!();
        }
        self
    }

    pub fn part2<F, R: Display>(&self, description: &str, solution: &F) -> &Self
    where
        F: Fn(&str) -> R,
    {
        println!("{}/{:02} part 2", self.year, self.day);

        if let Some(answer) = &self.part2_answers {
            let sys_time = SystemTime::now();
            let current_answer = solution(&self.test_input);
            let time = sys_time.elapsed().unwrap();

            self.print_res(
                &format!("(test) {}", description),
                &answer.for_test,
                &current_answer.to_string(),
                &time,
            );

            let sys_time = SystemTime::now();
            let current_answer = solution(&self.input);
            let time = sys_time.elapsed().unwrap();

            self.print_res(
                &description,
                &answer.for_input,
                &current_answer.to_string(),
                &time,
            );
        } else {
            unimplemented!();
        }
        self
    }

    fn print_res(&self, label: &str, expected: &str, actual: &str, time: &Duration) {
        let sec = time.as_millis() as f64 / 1000.0;

        if expected == actual {
            println!("  ✅ [sec {:.3}] {}", sec, label)
        } else {
            println!("  ❌ [sec {:.3}] {}", sec, label);
            println!("    expected: {expected}");
            println!("    actual:   {actual}");
        }
    }
}
