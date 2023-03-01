pub fn naive_js_copy_part1(input: &str) -> String {
    let mut res = "0".to_string();

    input.lines().for_each(|line| {
        res = sum(&res, line);
    });

    res
}

fn sum(a: &str, b: &str) -> String {
    let a = Vec::from_iter(a.chars().rev());
    let b = Vec::from_iter(b.chars().rev());

    let mut res = "".to_string();
    let mut rem = '0';

    for i in 0..(a.len().max(b.len())) {
        let char_a = a.get(i).map_or('0', |t| *t);
        let char_b = b.get(i).map_or('0', |t| *t);

        let (new_rem, ss) = sum_ab(char_a, char_b);
        let (new_rem_2, ss_2) = sum_ab(ss, rem);

        res.push(ss_2);
        rem = sum_ab(new_rem, new_rem_2).1;
    }
    if rem != '0' {
        res.push(rem);
    }

    res.chars().rev().collect::<String>()
}

fn sum_ab(a: char, b: char) -> (char, char) {
    match (a, b) {
        ('=', '=') => ('-', '1'),
        ('=', '-') => ('-', '2'),
        ('=', '0') => ('0', '='),
        ('=', '1') => ('0', '-'),
        ('=', '2') => ('0', '0'),

        ('-', '=') => ('-', '2'),
        ('-', '-') => ('0', '='),
        ('-', '0') => ('0', '-'),
        ('-', '1') => ('0', '0'),
        ('-', '2') => ('0', '1'),

        ('0', '=') => ('0', '='),
        ('0', '-') => ('0', '-'),
        ('0', '0') => ('0', '0'),
        ('0', '1') => ('0', '1'),
        ('0', '2') => ('0', '2'),

        ('1', '=') => ('0', '-'),
        ('1', '-') => ('0', '0'),
        ('1', '0') => ('0', '1'),
        ('1', '1') => ('0', '2'),
        ('1', '2') => ('1', '='),

        ('2', '=') => ('0', '0'),
        ('2', '-') => ('0', '1'),
        ('2', '0') => ('0', '2'),
        ('2', '1') => ('1', '='),
        ('2', '2') => ('1', '-'),

        _ => unreachable!(),
    }
}
