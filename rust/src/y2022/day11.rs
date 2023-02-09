pub fn naive_js_copy_part1(input: &str) -> i32 {
    let mut monkeys = Monkey::parse_monkey(input);

    let mut inspected_times = vec![0; monkeys.len()];

    for _round in 1..=20 {
        for i in 0..monkeys.len() {
            let mc;
            {
                let monkey = &mut monkeys[i];
                mc = monkey.clone(); // todo remove clone (now I don't know how)
                monkey.items.clear();
            }

            for item in &mc.items {
                inspected_times[i] += 1;
                let new_worry = mc.operation.eval(*item) / 3;
                if new_worry % mc.divisible == 0 {
                    monkeys[mc.yes].items.push(new_worry);
                } else {
                    monkeys[mc.no].items.push(new_worry);
                }
            }
        }
    }

    inspected_times.sort();
    inspected_times[inspected_times.len() - 1] * inspected_times[inspected_times.len() - 2]
}

pub fn naive_js_copy_part2(input: &str) -> u64 {
    let mut monkeys = Monkey::parse_monkey(input);

    let super_mod = monkeys
        .iter()
        .map(|monkey| monkey.divisible)
        .product::<u64>();

    let mut inspected_times = vec![0; monkeys.len()];

    for _round in 1..=10_000 {
        for i in 0..monkeys.len() {
            let mc;
            {
                let monkey = &mut monkeys[i];
                mc = monkey.clone();
                monkey.items.clear();
            }

            for item in &mc.items {
                inspected_times[i] += 1;
                let new_worry = mc.operation.eval(*item) % super_mod;
                if new_worry % mc.divisible == 0 {
                    monkeys[mc.yes].items.push(new_worry);
                } else {
                    monkeys[mc.no].items.push(new_worry);
                }
            }
        }
    }

    inspected_times.sort();
    inspected_times[inspected_times.len() - 1] * inspected_times[inspected_times.len() - 2]
}

#[derive(Debug, Clone)]
struct Monkey {
    items: Vec<u64>,
    operation: Operation,
    divisible: u64,
    yes: usize,
    no: usize,
}

impl Monkey {
    fn parse_monkey(input: &str) -> Vec<Monkey> {
        let monkeys: Vec<Monkey> = input
            .split("\n\n")
            .map(|mon| {
                let mut lines = mon.lines();
                lines.next();

                let items: Vec<u64> = lines.next().unwrap()[18..]
                    .split(", ")
                    .map(|s| s.parse::<u64>().unwrap())
                    .collect();

                let op_line = &lines.next().unwrap()[19..];
                let div_line = &lines.next().unwrap()[21..];
                let yes_line = &lines.next().unwrap()[29..];
                let no_line = &lines.next().unwrap()[30..];

                Monkey {
                    items,
                    operation: Operation::parse_operation(op_line),
                    divisible: div_line.parse::<u64>().unwrap(),
                    yes: yes_line.parse::<usize>().unwrap(),
                    no: no_line.parse::<usize>().unwrap(),
                }
            })
            .collect();

        monkeys
    }
}

#[derive(Clone, Debug)]
enum Operation {
    Add(u64),
    Mul(u64),
    Square,
}

impl Operation {
    fn parse_operation(op: &str) -> Operation {
        if op == "old * old" {
            Operation::Square
        } else if let Some(s) = op.strip_prefix("old + ") {
            Operation::Add(s.parse::<u64>().unwrap())
        } else if let Some(s) = op.strip_prefix("old * ") {
            Operation::Mul(s.parse::<u64>().unwrap())
        } else {
            unreachable!()
        }
    }

    fn eval(&self, old_val: u64) -> u64 {
        match self {
            Operation::Add(val) => old_val + val,
            Operation::Mul(val) => old_val * val,
            Operation::Square => old_val * old_val,
        }
    }
}
