pub fn part1(input: &str) -> i32 {
    5
}

/*

JS
progress 0.020% [ '0:57.065' ] 0.2kk
progress 0.021% [ '0:59.924' ] 0.21kk
progress 0.022% [ '1:02.781' ] 0.22kk
progress 0.023% [ '1:05.643' ] 0.23kk
// 4347 min = 72h

RUST
progress: 0.144% time: 58:278 1.44kk
progress: 0.146% time: 59:  8 1.46kk
progress: 0.148% time: 59:754 1.48kk
progress: 0.15% time: 60:516 1.5kk
progress: 0.152% time: 61:326 1.52kk
progress: 0.154% time: 62: 74 1.54kk
// 666 min = 11h

*/

pub fn part2(input: &str) -> usize {
    let mut grid: Vec<Vec<u8>> = input.lines().map(|l| l.bytes().collect()).collect();

    let rock = b'O';
    let limit = 1_000_000_000;
    // let limit = 1_000;

    let width = grid[0].len();
    let height = grid.len();

    let start = std::time::Instant::now();

    for i in 1..=limit {
        // if (i % 20_000 == 0) {
        //     println!(
        //         "progress: {:3}% time: {}:{:3} {}kk",
        //         ((i * 100) as f32 / (limit as f32)),
        //         start.elapsed().as_secs(),
        //         start.elapsed().as_millis() % 1000,
        //         (i as f32) / 1_000_000.0
        //     )
        // }

        // to top
        for j in 0..width {
            let mut j_slow = 0;
            let mut j_fast = 0;

            while j_fast < height {
                while j_slow < height - 1 && grid[j_slow][j] != b'.' {
                    j_slow += 1;
                }
                let mut slow = j_slow;

                j_fast = usize::max(j_slow + 1, j_fast);

                while j_fast < height {
                    if grid[j_fast][j] == rock {
                        break;
                    }
                    if grid[j_fast][j] == b'#' {
                        j_fast += 1;
                        j_slow = j_fast;
                        slow = j_fast;
                        break;
                    }

                    j_fast += 1;
                }

                let fast = j_fast;

                if slow < height && fast < height && grid[slow][j] == b'.' && grid[fast][j] == rock
                {
                    grid[slow][j] = rock;
                    grid[fast][j] = b'.';
                    j_slow += 1;
                    j_fast += 1;
                }
            }
        }
        // println!("top");

        // to left
        for j in 0..height {
            let mut j_slow = 0;
            let mut j_fast = 0;

            while j_fast < width {
                while j_slow < height && grid[j][j_slow] != b'.' {
                    j_slow += 1;
                }
                let mut slow = j_slow;

                j_fast = usize::max(j_slow + 1, j_fast);

                while j_fast < height {
                    if grid[j][j_fast] == rock {
                        break;
                    }
                    if grid[j][j_fast] == b'#' {
                        j_fast += 1;
                        j_slow = j_fast;
                        slow = j_fast;
                        break;
                    }

                    j_fast += 1;
                }

                let fast = j_fast;

                if slow < width && fast < width && grid[j][slow] == b'.' && grid[j][fast] == rock {
                    grid[j][slow] = rock;
                    grid[j][fast] = b'.';
                    j_slow += 1;
                    j_fast += 1;
                }
            }
        }
        // println!("left");

        // to bottom
        for j in 0..width {
            let mut j_slow = 0;
            let mut j_fast = 0;

            while j_fast < height {
                while j_slow < height && grid[j_slow][j] != b'.' {
                    j_slow += 1;
                }
                let mut slow = j_slow;

                j_fast = usize::max(j_slow + 1, j_fast);

                while j_fast < height {
                    if grid[j_fast][j] == rock {
                        break;
                    }
                    if grid[j_fast][j] == b'#' {
                        j_fast += 1;
                        j_slow = j_fast;
                        slow = j_fast;
                        break;
                    }

                    j_fast += 1;
                }

                let fast = j_fast;

                if slow < height && fast < height && grid[slow][j] == b'.' && grid[fast][j] == rock
                {
                    grid[slow][j] = rock;
                    grid[fast][j] = b'.';
                    j_slow += 1;
                    j_fast += 1;
                }
            }
        }
        // println!("bottom");

        // to right
        for j in 0..height {
            let mut j_slow = 0;
            let mut j_fast = 0;

            while j_fast < width {
                while j_slow < height && grid[j][j_slow] != b'.' {
                    j_slow += 1;
                }
                let mut slow = j_slow;

                j_fast = usize::max(j_slow + 1, j_fast);

                while j_fast < width {
                    if grid[j][j_fast] == rock {
                        break;
                    }
                    if grid[j][j_fast] == b'#' {
                        j_fast += 1;
                        j_slow = j_fast;
                        slow = j_fast;
                        break;
                    }

                    j_fast += 1;
                }

                let fast = j_fast;

                if slow < width && fast < width && grid[j][slow] == b'.' && grid[j][fast] == rock {
                    grid[j][slow] = rock;
                    grid[j][fast] = b'.';
                    j_slow += 1;
                    j_fast += 1;
                }
            }
        }
        // println!("right");
    }

    let mut total = 0;

    for i in 0..height {
        for j in 0..width {
            if grid[i][j] == rock {
                total += height - i;
            }
        }
    }

    total
}
