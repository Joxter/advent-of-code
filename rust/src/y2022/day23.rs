use std::collections::{HashMap, HashSet};

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let mut elfes = parse(input);

    let mut prop_array = vec!['n', 's', 'w', 'e'];

    for _round in 1..=10 {
        let mut proposals: HashMap<Coords, Vec<Coords>> = HashMap::new();

        elfes.el.iter().for_each(|coords| {
            let (x, y) = *coords;

            if elfes.no_elfes(vec![
                (x - 1, y - 1),
                (x, y - 1),
                (x + 1, y - 1),
                //
                (x - 1, y),
                (x + 1, y),
                //
                (x - 1, y + 1),
                (x, y + 1),
                (x + 1, y + 1),
            ]) {
                return;
            }

            for prop in &prop_array {
                let moved = match *prop {
                    'n' => elfes.propose_n((x, y), &mut proposals),
                    's' => elfes.propose_s((x, y), &mut proposals),
                    'w' => elfes.propose_w((x, y), &mut proposals),
                    'e' => elfes.propose_e((x, y), &mut proposals),
                    _ => unreachable!(),
                };

                if moved {
                    break;
                }
            }
        });

        let first = prop_array.remove(0);
        prop_array.push(first);

        proposals.iter().for_each(|(coords, els)| {
            if els.len() == 1 {
                elfes.el.remove(&els[0]);
                elfes.el.insert(*coords);
            }
        });
    }
    let (x_range, y_range) = elfes.get_rect();

    (x_range.0.abs() + x_range.1.abs() + 1) * (y_range.0.abs() + y_range.1.abs() + 1)
        - elfes.el.len() as i32
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let mut elfes = parse(input);

    let mut prop_array = vec!['n', 's', 'w', 'e'];

    let mut round = 0;
    loop {
        round += 1;

        let mut proposals: HashMap<Coords, Vec<Coords>> = HashMap::new();
        let mut free_elf = 0;

        elfes.el.iter().for_each(|coords| {
            let (x, y) = *coords;

            if elfes.no_elfes(vec![
                (x - 1, y - 1),
                (x, y - 1),
                (x + 1, y - 1),
                //
                (x - 1, y),
                (x + 1, y),
                //
                (x - 1, y + 1),
                (x, y + 1),
                (x + 1, y + 1),
            ]) {
                free_elf += 1;
                return;
            }

            for prop in &prop_array {
                let moved = match *prop {
                    'n' => elfes.propose_n((x, y), &mut proposals),
                    's' => elfes.propose_s((x, y), &mut proposals),
                    'w' => elfes.propose_w((x, y), &mut proposals),
                    'e' => elfes.propose_e((x, y), &mut proposals),
                    _ => unreachable!(),
                };

                if moved {
                    break;
                }
            }
        });
        if elfes.el.len() == free_elf {
            break;
        }

        let first = prop_array.remove(0);
        prop_array.push(first);

        proposals.iter().for_each(|(coords, els)| {
            if els.len() == 1 {
                elfes.el.remove(&els[0]);
                elfes.el.insert(*coords);
            }
        });
    }

    round
}

type Coords = (i32, i32);

struct Elfes {
    el: HashSet<Coords>,
}

impl Elfes {
    fn render(&self, x_range: Coords, y_range: Coords) {
        let mut res = "".to_string();

        for y in y_range.0..=y_range.1 {
            for x in x_range.0..=x_range.1 {
                res.push(if self.el.contains(&(x, y)) { '#' } else { '.' });
            }
            res.push_str(&format!("{:02}\n", y));
        }

        println!("{res}");
    }

    fn no_elfes(&self, coords: Vec<Coords>) -> bool {
        coords.iter().all(|ccc| !self.el.contains(ccc))
    }

    fn get_rect(&self) -> (Coords, Coords) {
        let mut x_range = (100, -100);
        let mut y_range = (100, -100);

        self.el.iter().for_each(|(x, y)| {
            x_range.0 = i32::min(*x, x_range.0);
            x_range.1 = i32::max(*x, x_range.1);
            y_range.0 = i32::min(*y, y_range.0);
            y_range.1 = i32::max(*y, y_range.1);
        });

        (x_range, y_range)
    }

    fn propose_n(&self, (x, y): Coords, proposals: &mut HashMap<Coords, Vec<Coords>>) -> bool {
        if self.no_elfes(vec![(x - 1, y - 1), (x, y - 1), (x + 1, y - 1)]) {
            let entry = proposals.entry((x, y - 1)).or_default();
            entry.push((x, y));
            return true;
        }
        false
    }

    fn propose_s(&self, (x, y): Coords, proposals: &mut HashMap<Coords, Vec<Coords>>) -> bool {
        if self.no_elfes(vec![(x - 1, y + 1), (x, y + 1), (x + 1, y + 1)]) {
            let entry = proposals.entry((x, y + 1)).or_default();
            entry.push((x, y));
            return true;
        }
        false
    }

    fn propose_w(&self, (x, y): Coords, proposals: &mut HashMap<Coords, Vec<Coords>>) -> bool {
        if self.no_elfes(vec![(x - 1, y - 1), (x - 1, y), (x - 1, y + 1)]) {
            let entry = proposals.entry((x - 1, y)).or_default();
            entry.push((x, y));
            return true;
        }
        false
    }

    fn propose_e(&self, (x, y): Coords, proposals: &mut HashMap<Coords, Vec<Coords>>) -> bool {
        if self.no_elfes(vec![(x + 1, y - 1), (x + 1, y), (x + 1, y + 1)]) {
            let entry = proposals.entry((x + 1, y)).or_default();
            entry.push((x, y));
            return true;
        }
        false
    }
}

fn parse(input: &str) -> Elfes {
    let mut elfes = HashSet::new();
    input.lines().enumerate().for_each(|(y, line)| {
        line.chars().enumerate().for_each(|(x, char)| {
            if char == '#' {
                elfes.insert((x as i32, y as i32));
            }
        })
    });

    Elfes { el: elfes }
}
