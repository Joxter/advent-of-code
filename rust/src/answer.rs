use std::fmt::Display;
use std::fs;
use std::time::{Duration, SystemTime};

#[derive(Debug)]
struct Answers {
    part1_test: String,
    part1: String,
    part2_test: String,
    part2: String,
}

/*
// todo
struct Part {
    test: String,
    input: String,
    ans_test: String,
    ans_input: String,
}

struct AoC_day {
    number: u8,
    part1: Part,
    part2: Part,
}

// sort of:
//   AoC_day::number(4).part1([
//      ('naive', day03::part1)
//      ('optimal', day03::part1_optimal)
//   ])

*/

impl Answers {
    pub fn parse(path: &str) -> Answers {
        let mut ans = Answers {
            part1_test: "".to_string(),
            part1: "".to_string(),
            part2_test: "".to_string(),
            part2: "".to_string(),
        };

        let mut stage = 0;
        for line in fs::read_to_string(path).unwrap().lines() {
            match line {
                "- part1_test" => stage = 1,
                "- part1" => stage = 2,
                "- part2_test" => stage = 3,
                "- part2" => stage = 4,
                _ => match stage {
                    1 => ans.part1_test.push_str(line),
                    2 => ans.part1.push_str(line),
                    3 => ans.part2_test.push_str(line),
                    4 => ans.part2.push_str(line),
                    _ => (),
                },
            }
        }

        ans
    }

    pub fn check_p1_test<F, R: Display>(&self, label: &str, solution_cb: F)
    where
        F: Fn() -> R,
    {
        let sys_time = SystemTime::now();
        let answer = format!("{}", solution_cb());
        let time = sys_time.elapsed().unwrap();

        self.print_res(
            &format!("{label} part_1 test"),
            &self.part1_test,
            &answer,
            &time,
        );
    }

    pub fn check_p1<F, R: Display>(&self, label: &str, solution_cb: F)
    where
        F: Fn() -> R,
    {
        let sys_time = SystemTime::now();
        let answer = format!("{}", solution_cb());
        let time = sys_time.elapsed().unwrap();

        self.print_res(&format!("{label} part_1"), &self.part1, &answer, &time);
    }

    pub fn check_p2_test<F, R: Display>(&self, label: &str, solution_cb: F)
    where
        F: Fn() -> R,
    {
        let sys_time = SystemTime::now();
        let answer = format!("{}", solution_cb());
        let time = sys_time.elapsed().unwrap();

        self.print_res(
            &format!("{label} part_2 test"),
            &self.part2_test,
            &answer,
            &time,
        );
    }

    pub fn check_p2<F, R: Display>(&self, label: &str, solution_cb: F)
    where
        F: Fn() -> R,
    {
        let sys_time = SystemTime::now();
        let answer = format!("{}", solution_cb());
        let time = sys_time.elapsed().unwrap();

        self.print_res(&format!("{label} part_2"), &self.part2, &answer, &time);
    }

    pub fn print_res(&self, label: &str, expected: &str, actual: &str, time: &Duration) {
        let sec = time.as_millis() as f64 / 1000.0;

        if expected == actual {
            println!("✅ {label}, {actual}, [sec {:.3}]", sec)
        } else {
            println!("❌ {label}, [sec {}]", sec);
            println!("  expected, {expected}");
            println!("  actual,   {actual}");
        }
    }
}

pub fn run_solution<F, F2, R: Display>(input_folder: &str, label: &str, part_1: F, part_2: F2)
where
    F: Fn(&str) -> R,
    F2: Fn(&str) -> R,
{
    let test_inp = fs::read_to_string(format!("{}/test.txt", input_folder)).unwrap();
    let inp = fs::read_to_string(format!("{}/input.txt", input_folder)).unwrap();
    let answers = Answers::parse(format!("{}/answer.txt", input_folder).as_str());

    answers.check_p1_test(&label, || part_1(&test_inp));
    answers.check_p1(&label, || part_1(&inp));
    answers.check_p2_test(&label, || part_2(&test_inp));
    answers.check_p2(&label, || part_2(&inp));
}
