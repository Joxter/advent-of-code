use crate::y2022::day01::{naive_js_copy_part1, naive_js_copy_part2};

mod y2022;

fn main() {
    let part1 = naive_js_copy_part1(
        "1000
2000
3000

4000

5000
6000

7000
8000
9000

10000",
    );
    println!("day1 part1 {:} [24000]", part1);

    let part2 = naive_js_copy_part2(
        "1000
2000
3000

4000

5000
6000

7000
8000
9000

10000",
    );
    println!("day1 part1 {:} [45000]", part2);
}
