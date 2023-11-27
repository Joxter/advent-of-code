use std::collections::HashSet;

type Coords = (i32, i32, i32); // x y z

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let mut cubes: HashSet<Coords> = HashSet::new();
    input.lines().for_each(|line| {
        let (x, yz) = line.split_once(',').unwrap();
        let (y, z) = yz.split_once(',').unwrap();

        cubes.insert((
            x.parse::<i32>().unwrap(),
            y.parse::<i32>().unwrap(),
            z.parse::<i32>().unwrap(),
        ));
    });

    cubes
        .iter()
        .map(|coords| 6 - get_cubes_around(&cubes, *coords))
        .sum()
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let mut cubes: HashSet<Coords> = HashSet::new();
    let mut max: Coords = (0, 0, 0);

    input.lines().for_each(|line| {
        let (x, yz) = line.split_once(',').unwrap();
        let (y, z) = yz.split_once(',').unwrap();
        let (x, y, z) = (
            x.parse::<i32>().unwrap(),
            y.parse::<i32>().unwrap(),
            z.parse::<i32>().unwrap(),
        );

        cubes.insert((x, y, z));

        if x > max.0 {
            max.0 = x
        };
        if y > max.1 {
            max.1 = y
        };
        if z > max.2 {
            max.2 = z
        };
    });

    max.0 += 1;
    max.1 += 1;
    max.2 += 1;

    let water = fill_in_with_water(max, &cubes);

    return cubes
        .iter()
        .map(|coords| get_cubes_around(&water, *coords))
        .sum();
}

fn get_cubes_around(cubes: &HashSet<Coords>, (x, y, z): Coords) -> i32 {
    let mut cnt = 0;

    if cubes.contains(&(x + 1, y, z)) {
        cnt += 1
    }
    if cubes.contains(&(x, y + 1, z)) {
        cnt += 1
    }
    if cubes.contains(&(x, y, z + 1)) {
        cnt += 1
    }

    if cubes.contains(&(x - 1, y, z)) {
        cnt += 1
    }
    if cubes.contains(&(x, y - 1, z)) {
        cnt += 1
    }
    if cubes.contains(&(x, y, z - 1)) {
        cnt += 1
    }

    cnt
}

fn fill_in_with_water(max: Coords, cubes: &HashSet<Coords>) -> HashSet<Coords> {
    let mut water = HashSet::new();
    let mut stack = vec![(0, 0, 0)];

    while let Some((x, y, z)) = stack.pop() {
        if x < -1 || y < -1 || z < -1 {
            continue;
        }
        if x > max.0 || y > max.1 || z > max.2 {
            continue;
        }
        if water.contains(&(x, y, z)) || cubes.contains(&(x, y, z)) {
            continue;
        }
        water.insert((x, y, z));

        stack.push((x + 1, y, z));
        stack.push((x, y + 1, z));
        stack.push((x, y, z + 1));
        stack.push((x - 1, y, z));
        stack.push((x, y - 1, z));
        stack.push((x, y, z - 1));
    }

    water
}
