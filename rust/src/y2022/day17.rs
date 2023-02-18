struct Tower {
    t: Vec<[char; 7]>,
}

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

pub fn naive_js_copy_part1(input: &str) -> i32 {
    4
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    4
}

fn is_overlaps(tower: &Tower, rock: &Rock) -> bool {
    for (i, tower_row) in tower.t.iter().enumerate().rev() {
        for j in 0..7 {
            let tower_char = tower_row[j];
            let rock_char = rock.r.contains(&(i, j));

            if tower_char != ' ' && rock_char {
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
            .enumerate()
            .rev()
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
        self.r.iter().rev().for_each(|(row, col)| {
            if tower.t.get(*row).is_none() {
                tower.t.push([' '; 7]);
            }
            tower.t[*row][*col] = char::from_digit(rock_id, 10).unwrap(); // 0-4 possible
        });
    }

    fn move_left(self) -> Option<Rock> {
        let mut res = Rock { r: vec![] };

        for (row, col) in self.r {
            if col > 0 {
                res.r.push((row, col - 1));
            } else {
                return None;
            }
        }
        Some(res)
    }

    fn move_right(self) -> Option<Rock> {
        let mut res = Rock { r: vec![] };

        for (row, col) in self.r {
            if col < 7 {
                res.r.push((row, col + 1));
            } else {
                return None;
            }
        }
        Some(res)
    }

    fn move_down(self) -> Rock {
        let mut res = Rock { r: vec![] };

        for (row, col) in self.r {
            res.r.push((row - 1, col));
        }
        res
    }
}
