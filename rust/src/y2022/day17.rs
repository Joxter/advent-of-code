use serde::{Deserialize, Serialize};
use serde_json::Result;

#[derive(Serialize, Deserialize)]
struct Tower {
    t: Vec<[char; 7]>,
}

#[derive(Clone, Debug)]
struct Rock {
    r: Vec<(usize, usize)>,
}

const ROCKS: [&str; 5] = [
    "####",
    ".#.
###
.#.",
    "..#
..#
###",
    "#
#
#
#",
    "##
##",
];

pub fn naive_js_copy_part1(input: &str) -> usize {
    simulate(input, 2022)
}

fn simulate(input: &str, rock_limit: usize) -> usize {
    let jet = Vec::from_iter(input.chars());
    let mut current_rock_n = 0;

    let mut tower = Tower { t: vec![['#'; 7]] };
    let mut jet_cnt = 0;

    while current_rock_n < rock_limit {
        // println!("{}", tower.t.len());
        current_rock_n += 1;

        let rock_id = (current_rock_n - 1) % ROCKS.len();
        let mut current_rock = Rock::new(ROCKS[rock_id], 2, tower.t.len() + 3);

        loop {
            let mut jet_moved_rock = if jet[jet_cnt % jet.len()] == '<' {
                current_rock.move_left()
            } else {
                current_rock.move_right()
            };

            jet_cnt += 1;

            if is_overlap(&tower, &jet_moved_rock) {
                jet_moved_rock = current_rock.clone();
            }

            let moved_down_rock = jet_moved_rock.move_down();

            if is_overlap(&tower, &moved_down_rock) {
                jet_moved_rock.save_rock(&mut tower, rock_id as u32 + 1);
                break;
            } else {
                current_rock = moved_down_rock;
            }
        }
    }

    tower.t.len() - 1
}

pub fn naive_js_copy_part2_test(input: &str) -> usize {
    let rock_limit = 1_000_000_000_000;

    let no_loop_rocks = 15;

    let loop_rocks = 35;
    let loop_height = 53;

    let amount_of_loops = (rock_limit - no_loop_rocks) / loop_rocks;

    let new_limit = rock_limit - amount_of_loops * loop_rocks;
    let rendered_height = simulate(input, new_limit);

    rendered_height + amount_of_loops * loop_height
}

pub fn naive_js_copy_part2_real(input: &str) -> usize {
    let rock_limit = 1_000_000_000_000;

    let no_loop_rocks = 632;
    let no_loop_height = 1006;

    let loop_rocks = 2337 - no_loop_rocks;
    let loop_height = 3655 - no_loop_height;

    let amount_of_loops = (rock_limit - no_loop_rocks) / loop_rocks;

    let new_limit = rock_limit - amount_of_loops * loop_rocks;
    let rendered_height = simulate(input, new_limit);

    rendered_height + amount_of_loops * loop_height
}

fn is_overlap(tower: &Tower, rock: &Rock) -> bool {
    for (i, tower_row) in tower.t.iter().enumerate().rev() {
        for (j, tower_char) in tower_row.iter().enumerate() {
            let rock_char = rock.r.contains(&(i, j));
            if *tower_char != ' ' && rock_char {
                return true;
            }
        }
    }

    false
}

impl Rock {
    fn new(str: &str, col_offset: usize, row_offset: usize) -> Rock {
        let mut res = Rock { r: vec![] };

        Vec::from_iter(str.lines())
            .iter()
            .rev()
            .enumerate()
            .for_each(|(row, line)| {
                line.chars().enumerate().for_each(|(col, char)| {
                    if char == '#' {
                        res.r.push((row + row_offset, col + col_offset))
                    }
                });
            });

        res
    }

    fn save_rock(&self, tower: &mut Tower, rock_id: u32) {
        self.r.iter().for_each(|(row, col)| {
            if tower.t.get(*row).is_none() {
                tower.t.push([' '; 7]);
            }
            tower.t[*row][*col] = char::from_digit(rock_id, 10).unwrap();
        });
    }

    fn move_left(&self) -> Rock {
        let mut res = Rock { r: vec![] };

        for (row, col) in &self.r {
            if *col > 0 {
                res.r.push((*row, *col - 1));
            } else {
                return self.clone();
            }
        }
        res
    }

    fn move_right(&self) -> Rock {
        let mut res = Rock { r: vec![] };

        for (row, col) in &self.r {
            if *col < 6 {
                res.r.push((*row, *col + 1));
            } else {
                return self.clone();
            }
        }

        res
    }

    fn move_down(&self) -> Rock {
        let mut res = Rock { r: vec![] };

        for (row, col) in &self.r {
            res.r.push((*row - 1, *col));
        }
        res
    }
}
