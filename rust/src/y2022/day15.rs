use std::collections::HashMap;

type Coords = (i32, i32);
type Coords64 = (i64, i64);

pub fn naive_js_copy_part1(input: &str, row: i32) -> i32 {
    let mut map: HashMap<i32, char> = HashMap::new();
    let mut res = 0;

    input.lines().for_each(|line| {
        let ((sensor_x, sensor_y), (beacon_x, beacon_y)) = parse_line(line);

        if sensor_y == row {
            map.insert(sensor_x, '-');
        }
        if beacon_y == row {
            map.insert(beacon_x, '-');
        }

        res += paint_over(&mut map, (sensor_x, sensor_y), (beacon_x, beacon_y), row);
    });

    return res;

    fn paint_over(map: &mut HashMap<i32, char>, sensor: Coords, beacon: Coords, row: i32) -> i32 {
        let size = get_distance(sensor, beacon);
        let from = sensor.0 - size;
        let to = sensor.0 + size;

        let mut res = 0;
        for i in from..=to {
            if get_distance(sensor, (i, row)) <= size && !map.contains_key(&i) {
                map.insert(i, '#');
                res += 1;
            }
        }
        res
    }
}

pub fn naive_js_copy_part2(input: &str, row: i64) -> i64 {
    let mut signals = vec![];
    let mut beacons = vec![];

    input.lines().for_each(|line| {
        let ((sensor_x, sensor_y), (beacon_x, beacon_y)) = parse_line_64(line);
        signals.push((sensor_x, sensor_y));
        beacons.push((beacon_x, beacon_y));
    });

    for i in 0..=row {
        let mut j = 0;
        while j <= row {
            let mut no_beacons = true;

            let mut k = 0;
            while k < beacons.len() && j <= row {
                if beacons.get(k).is_none() {
                    break;
                }
                let (bx, by) = beacons[k];
                let (sx, sy) = signals[k];

                let b_s = get_distance_64((bx, by), (sx, sy));
                let curr_s = get_distance_64((i, j), (sx, sy));

                if b_s >= curr_s {
                    let offset = b_s - curr_s;
                    j += offset;

                    no_beacons = false;
                    break;
                }

                k += 1;
            }

            if no_beacons {
                return i * 4_000_000 + j;
            }
            j += 1;
        }
    }

    unreachable!();
}

fn get_distance(sensor: Coords, beacon: Coords) -> i32 {
    let delta_x = (sensor.0 - beacon.0).abs();
    let delta_y = (sensor.1 - beacon.1).abs();

    delta_x + delta_y
}

fn get_distance_64(sensor: Coords64, beacon: Coords64) -> i64 {
    let delta_x = (sensor.0 - beacon.0).abs();
    let delta_y = (sensor.1 - beacon.1).abs();

    delta_x + delta_y
}

fn parse_line(line: &str) -> (Coords, Coords) {
    let parts = Vec::from_iter(line.split_whitespace());
    let sensor_x = parts[2][2..parts[2].len() - 1].parse::<i32>().unwrap();
    let sensor_y = parts[3][2..parts[3].len() - 1].parse::<i32>().unwrap();
    let beacon_x = parts[8][2..parts[8].len() - 1].parse::<i32>().unwrap();
    let beacon_y = parts[9][2..].parse::<i32>().unwrap();

    ((sensor_x, sensor_y), (beacon_x, beacon_y))
}

fn parse_line_64(line: &str) -> (Coords64, Coords64) {
    let parts = Vec::from_iter(line.split_whitespace());
    let sensor_x = parts[2][2..parts[2].len() - 1].parse::<i64>().unwrap();
    let sensor_y = parts[3][2..parts[3].len() - 1].parse::<i64>().unwrap();
    let beacon_x = parts[8][2..parts[8].len() - 1].parse::<i64>().unwrap();
    let beacon_y = parts[9][2..].parse::<i64>().unwrap();

    ((sensor_x, sensor_y), (beacon_x, beacon_y))
}

pub mod optimised {
    use super::*;
    use std::collections::{HashMap, HashSet};

    pub fn part1_general(input: &str, row: i32) -> i32 {
        // covers more general case
        // when sensors and beacons covers not one solid line for given row

        let mut exclude: HashSet<i32> = HashSet::new();

        let arr = input
            .lines()
            .map(|line| {
                let ((sensor_x, sensor_y), (beacon_x, beacon_y)) = parse_line(line);

                if sensor_y == row {
                    exclude.insert(sensor_x);
                }
                if beacon_y == row {
                    exclude.insert(beacon_x);
                }

                get_interval((sensor_x, sensor_y), (beacon_x, beacon_y), row)
            })
            .filter(|(l, r)| l < r)
            .collect::<Vec<(i32, i32)>>();

        let res = sum_intervals(arr);

        res - exclude.len() as i32
    }

    fn get_interval(sensor: Coords, beacon: Coords, row: i32) -> (i32, i32) {
        let size = get_distance(sensor, beacon);
        let row_size = size - (sensor.1 - row).abs();

        let from = sensor.0 - row_size;
        let to = sensor.0 + row_size + 1;

        (from, to)
    }

    #[cfg(test)]
    mod test_get_interval {
        use super::*;

        #[test]
        fn works() {
            //    2 1 0 1 2 3 4 5 6 7
            // 2  # # # # # # # # # .
            // 1  # # # # S # # # # #
            // 0  # # # # # # # # # .
            //-1  . B # # # # # # . .
            //-2  . . # # # # # . . .
            let result = get_interval((2, 3), (-1, -1), -1);
            assert_eq!(result, (-1, 6));
        }
    }

    fn sum_intervals(mut intervals: Vec<(i32, i32)>) -> i32 {
        intervals.sort_unstable_by(|x, y| x.0.cmp(&y.0));

        let (mut start, mut end) = intervals[0];
        let mut total = 0;

        for (curr_start, curr_end) in intervals.into_iter().skip(1) {
            if curr_start > end {
                total += end - start;
                start = curr_start;
                end = curr_end;
            } else if curr_end > end {
                end = curr_end;
            }
        }

        total += end - start;
        total
    }

    pub fn part1(input: &str, row: i32) -> i32 {
        let mut exclude: HashSet<i32> = HashSet::new();
        let mut left = i32::MAX;
        let mut right = i32::MIN;

        input.lines().for_each(|line| {
            let ((sensor_x, sensor_y), (beacon_x, beacon_y)) = parse_line(line);

            if sensor_y == row {
                exclude.insert(sensor_x);
            }
            if beacon_y == row {
                exclude.insert(beacon_x);
            }

            let (l, r) = get_interval((sensor_x, sensor_y), (beacon_x, beacon_y), row);
            left = left.min(l);
            right = right.max(r);
        });

        right - left - exclude.len() as i32
    }
}
