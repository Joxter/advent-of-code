use serde_json::Value;
use std::cmp::Ordering;

/*
    soo dirty..
*/
pub fn naive_js_copy_part1(input: &str) -> usize {
    let pairs = Vec::from_iter(input.split("\n\n").map(|inp| {
        let (l, r) = inp.split_once('\n').unwrap();

        (
            Parts::json_to_vec(&serde_json::from_str::<Value>(l).unwrap()),
            Parts::json_to_vec(&serde_json::from_str::<Value>(r).unwrap()),
        )
    }));

    pairs
        .iter()
        .enumerate()
        .map(|(i, (l, r))| {
            let r = Parts::compare(l, r);

            if r == Ordering::Greater {
                i + 1
            } else {
                0
            }
        })
        .sum()
}

pub fn naive_js_copy_part2(input: &str) -> usize {
    let mut arr = Vec::from_iter(
        input
            .lines()
            .filter(|l| !l.is_empty())
            .map(|l| Parts::json_to_vec(&serde_json::from_str::<Value>(l).unwrap())),
    );

    arr.push(Parts::json_to_vec(
        &serde_json::from_str::<Value>("[[2]]").unwrap(),
    ));
    arr.push(Parts::json_to_vec(
        &serde_json::from_str::<Value>("[[6]]").unwrap(),
    ));

    arr.sort_by(|a, b| {
        if Parts::compare(a, b) == Ordering::Greater {
            Ordering::Less
        } else {
            Ordering::Greater
        }
    });

    let index_of_2 = arr
        .iter()
        .position(|it| {
            if let Parts::Arr(a) = it {
                if a.len() == 1 && a[0].is_array() {
                    let aa = a[0].extract_arr();
                    if aa.len() == 1 && !aa[0].is_array() {
                        return aa[0].extract_num() == 2;
                    }
                }
            }
            false
        })
        .unwrap();

    let index_of_6 = arr
        .iter()
        .position(|it| {
            if let Parts::Arr(a) = it {
                if a.len() == 1 && a[0].is_array() {
                    let aa = a[0].extract_arr();
                    if aa.len() == 1 && !aa[0].is_array() {
                        return aa[0].extract_num() == 6;
                    }
                }
            }
            false
        })
        .unwrap();

    (index_of_2 + 1) * (index_of_6 + 1)
}

#[derive(Debug,Clone)]
enum Parts {
    Num(i64),
    Arr(Vec<Parts>),
}

impl Parts {
    fn is_array(&self) -> bool {
        match self {
            Self::Num(_) => false,
            Self::Arr(_) => true,
        }
    }

    fn to_array(&self) -> Parts {
        match self {
            Self::Num(n) => Parts::Arr(vec![Parts::Num(n.to_owned())]),
            Self::Arr(a) => Parts::Arr(a.clone()),
        }
    }

    fn extract_num(&self) -> i64 {
        match self {
            Self::Num(n) => n.to_owned(),
            _ => unreachable!(),
        }
    }

    fn extract_arr(&self) -> Vec<Parts> {
        match self {
            Self::Arr(n) => n.clone(),
            _ => unreachable!(),
        }
    }

    fn json_to_vec(inp: &Value) -> Parts {
        match inp {
            Value::Number(n) => return Parts::Num(n.as_i64().unwrap()),
            Value::Array(a) => {
                let mut arr: Vec<Parts> = vec![];
                for i in 0..a.len() {
                    arr.push(Parts::json_to_vec(a.get(i).unwrap()));
                }

                return Parts::Arr(arr);
            }
            _ => (),
        }

        unreachable!();
    }

    fn compare(left: &Parts, right: &Parts) -> Ordering {
        match (left, right) {
            (Parts::Arr(l), Parts::Arr(r)) => {
                for i in 0..usize::min(l.len(), r.len()) {
                    let l_val = &l[i];
                    let r_val = &r[i];

                    if l_val.is_array() || r_val.is_array() {
                        let res = Parts::compare(&(l_val.to_array()), &r_val.to_array());
                        if res != Ordering::Equal {
                            return res;
                        }
                    } else {
                        if l_val.extract_num() > r_val.extract_num() {
                            return Ordering::Less;
                        }
                        if l_val.extract_num() < r_val.extract_num() {
                            return Ordering::Greater;
                        }
                    }
                }

                if l.len() < r.len() {
                    return Ordering::Greater;
                }
                if l.len() > r.len() {
                    return Ordering::Less;
                }
                Ordering::Equal
            }
            _ => unreachable!(),
        }
    }
}
