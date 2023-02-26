pub mod naive_1 {
    use std::collections::HashMap;

    enum Node<'a> {
        Num(f64),
        Plus(&'a str, &'a str),
        Minus(&'a str, &'a str),
        Div(&'a str, &'a str),
        Mul(&'a str, &'a str),
    }

    impl<'a> Node<'a> {
        fn left_right(&'a self) -> (&'a str, &'a str) {
            match self {
                Node::Plus(l, r) => (l, r),
                Node::Minus(l, r) => (l, r),
                Node::Mul(l, r) => (l, r),
                Node::Div(l, r) => (l, r),
                Node::Num(_) => unreachable!(),
            }
        }
    }

    pub fn part1(input: &str) -> f64 {
        let ops = parse(input);

        calc(&ops, "root")
    }

    pub fn part2(input: &str) -> f64 {
        let mut ops = parse(input);

        ops.insert("humn", Node::Num(f64::NAN));
        let (left, right) = ops.get("root").unwrap().left_right();
        let target = calc(&ops, right);

        calc_human(&ops, left, target)
    }

    fn parse(input: &str) -> HashMap<&str, Node> {
        let mut ops = HashMap::new();

        input.lines().for_each(|line| {
            let (name, op) = line.split_once(": ").unwrap();

            if let Ok(n) = op.parse::<f64>() {
                ops.insert(name, Node::Num(n));
            } else {
                let v = Vec::from_iter(op.split_whitespace());

                match (v[0], v[1], v[2]) {
                    (l, "+", r) => ops.insert(name, Node::Plus(l, r)),
                    (l, "-", r) => ops.insert(name, Node::Minus(l, r)),
                    (l, "*", r) => ops.insert(name, Node::Mul(l, r)),
                    (l, "/", r) => ops.insert(name, Node::Div(l, r)),
                    _ => unreachable!(),
                };
            }
        });

        ops
    }

    fn calc(ops: &HashMap<&str, Node>, node_name: &str) -> f64 {
        return match ops.get(node_name).unwrap() {
            Node::Num(n) => *n,
            Node::Plus(l, r) => calc(ops, l) + calc(ops, r),
            Node::Minus(l, r) => calc(ops, l) - calc(ops, r),
            Node::Mul(l, r) => calc(ops, l) * calc(ops, r),
            Node::Div(l, r) => calc(ops, l) / calc(ops, r),
        };
    }

    fn calc_human(ops: &HashMap<&str, Node>, node_name: &str, target: f64) -> f64 {
        if node_name == "humn" {
            return target;
        }

        let node = ops.get(node_name).unwrap();

        if let Node::Num(n) = node {
            *n
        } else {
            let (left, right) = node.left_right();

            let left_val = calc(ops, left);
            let right_val = calc(ops, right);

            if left_val.is_nan() {
                match node {
                    Node::Plus(_, _) => calc_human(ops, left, target - right_val),
                    Node::Minus(_, _) => calc_human(ops, left, target + right_val),
                    Node::Mul(_, _) => calc_human(ops, left, target / right_val),
                    Node::Div(_, _) => calc_human(ops, left, target * right_val),
                    Node::Num(_) => unreachable!(),
                }
            } else {
                match node {
                    Node::Plus(_, _) => calc_human(ops, right, target - left_val),
                    Node::Minus(_, _) => calc_human(ops, right, left_val - target),
                    Node::Mul(_, _) => calc_human(ops, right, target / left_val),
                    Node::Div(_, _) => calc_human(ops, right, left_val / target),
                    Node::Num(_) => unreachable!(),
                }
            }
        }
    }
}

pub mod naive_2 {
    use std::collections::HashMap;

    enum Node<'a> {
        Num(f64),
        Op(&'a str, char, &'a str),
    }

    impl<'a> Node<'a> {
        fn extract_op(&'a self) -> (&'a str, char, &'a str) {
            match self {
                Node::Op(l, op, r) => (l, *op, r),
                Node::Num(_) => unreachable!(),
            }
        }
    }

    pub fn part1(input: &str) -> f64 {
        let ops = parse(input);

        calc(&ops, "root")
    }

    pub fn part2(input: &str) -> f64 {
        let mut ops = parse(input);

        ops.insert("humn", Node::Num(f64::NAN));
        let (left, _, right) = ops.get("root").unwrap().extract_op();
        let target = calc(&ops, right);

        calc_human(&ops, left, target)
    }

    fn parse(input: &str) -> HashMap<&str, Node> {
        let mut ops = HashMap::new();

        input.lines().for_each(|line| {
            let (name, op) = line.split_once(": ").unwrap();

            if let Ok(n) = op.parse::<f64>() {
                ops.insert(name, Node::Num(n));
            } else {
                let v = Vec::from_iter(op.split_whitespace());

                ops.insert(name, Node::Op(v[0], v[1].chars().next().unwrap(), v[2]));
            }
        });

        ops
    }

    fn calc(ops: &HashMap<&str, Node>, node_name: &str) -> f64 {
        return match ops.get(node_name).unwrap() {
            Node::Num(n) => *n,
            Node::Op(l, '+', r) => calc(ops, l) + calc(ops, r),
            Node::Op(l, '-', r) => calc(ops, l) - calc(ops, r),
            Node::Op(l, '*', r) => calc(ops, l) * calc(ops, r),
            Node::Op(l, '/', r) => calc(ops, l) / calc(ops, r),
            _ => unreachable!(),
        };
    }

    fn calc_human(ops: &HashMap<&str, Node>, node_name: &str, target: f64) -> f64 {
        if node_name == "humn" {
            return target;
        }

        let node = ops.get(node_name).unwrap();

        if let Node::Num(n) = node {
            *n
        } else {
            let (left, op, right) = node.extract_op();

            let left_val = calc(ops, left);
            let right_val = calc(ops, right);

            if left_val.is_nan() {
                match op {
                    '+' => calc_human(ops, left, target - right_val),
                    '-' => calc_human(ops, left, target + right_val),
                    '*' => calc_human(ops, left, target / right_val),
                    '/' => calc_human(ops, left, target * right_val),
                    _ => unreachable!(),
                }
            } else {
                match op {
                    '+' => calc_human(ops, right, target - left_val),
                    '-' => calc_human(ops, right, left_val - target),
                    '*' => calc_human(ops, right, target / left_val),
                    '/' => calc_human(ops, right, left_val / target),
                    _ => unreachable!(),
                }
            }
        }
    }
}
