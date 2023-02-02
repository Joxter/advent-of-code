use crate::answer::AoCDay;

pub mod day01;
pub mod day02;
pub mod day03;
pub mod day04;
pub mod day05;
pub mod day06;

pub fn run_2022() {
    // let day1 = AoCDay::new(2022, 1)
    //     .part1(vec![("naive js copy", &day01::naive_js_copy_part1)])
    //     .part2(vec![("naive js copy", &day01::naive_js_copy_part2)]);
    // let day2 = AoCDay::new(2022, 2)
    //     .part1(vec![("naive js copy", &day02::naive_js_copy_part1)])
    //     .part2(vec![("naive js copy", &day02::naive_js_copy_part2)]);
    // let day3 = AoCDay::new(2022, 3)
    //     .part1(vec![("naive js copy", &day03::naive_js_copy_part1)])
    //     .part2(vec![("naive js copy", &day03::naive_js_copy_part2)]);
    // let day4 = AoCDay::new(2022, 4)
    //     .part1(vec![("naive js copy", &day04::naive_js_copy_part1)])
    //     .part2(vec![("naive js copy", &day04::naive_js_copy_part2)]);
    // let day5 = AoCDay::new(2022, 5)
    //     .part1(vec![("naive js copy", &day05::naive_js_copy_part1)])
    //     .part2(vec![("naive js copy", &day05::naive_js_copy_part2)]);
    let day6 = AoCDay::new(2022, 6)
        .part1(vec![("naive js copy", &day06::naive_js_copy_part1)])
        .part2(vec![("naive js copy", &day06::naive_js_copy_part2)]);

    // println!("{day2}");
    // println!("{day3}");
    // println!("{day4}");
    // println!("{day5}");
    println!("{day6}");
}
