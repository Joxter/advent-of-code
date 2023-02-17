use std::collections::HashMap;

/*
// todo copy the c
*/

pub fn naive_js_copy_part1(input: &str) -> i32 {
    let (new_map, all_opened, heads) = parse(input);

    return dfs(&new_map, "AA", 0, 0, 1, all_opened, &heads);

    fn dfs(
        new_map: &HashMap<&str, Valve2>,
        node_name: &str,
        released: i32,
        opened: i32,
        minutes: i32,
        all_opened: i32,
        heads: &HashMap<&str, i32>,
    ) -> i32 {
        if opened == all_opened || minutes > 30 {
            return released;
        }

        new_map
            .get(node_name)
            .unwrap()
            .next
            .iter()
            .filter(|nod_name| {
                // dbg!(nod_name);
                return nod_name.0 == "AA" || (opened & heads.get(nod_name.0).unwrap()) == 0;
            })
            .map(|(nod_name, cost)| {
                let mut rate = new_map.get(nod_name).unwrap().rate;
                let mut left_mins = 30 - (minutes + cost);

                let new_opened = if *nod_name == "AA" {
                    opened
                } else {
                    heads.get(nod_name).unwrap() | opened
                };

                dfs(
                    &new_map,
                    nod_name,
                    released + rate * left_mins,
                    new_opened,
                    minutes + cost + 1,
                    all_opened,
                    &heads,
                )
            })
            .max()
            .unwrap()
    }

    /*  let maxMins = 30;

      let { allOpened, heads, newNewMap } = parse(inp);

      return dfs(newNewMap.AA, { released: 0, opened: heads['AA'] }, 1);

      function dfs(node, { released, opened }, minutes) {
        if (opened === allOpened || minutes > maxMins) {
          return released;
        }

        let result = Math.max(
          ...node.next
            .filter(_nodeName => {
              let [nodeName] = _nodeName.split(',');
              return (opened & heads[nodeName]) === 0;
            })
            .map(_nodeName => {
              let [nodeName, cost] = _nodeName.split(',');

              let rate = newNewMap[nodeName].rate;
              let minLeft = maxMins - (minutes + +cost);

              return dfs(
                newNewMap[nodeName],
                {
                  released: released + +rate * minLeft,
                  opened: opened | heads[nodeName],
                },
                minutes + +cost + 1
              );
            })
        );
        // cash[key] = result;

        return result;
      }

    */
    4
}

pub fn naive_js_copy_part2(input: &str) -> i32 {
    let mut arr: Vec<i32> = input
        .split("\n\n")
        .map(|lines| lines.lines().map(|line| line.parse::<i32>().unwrap()).sum())
        .collect();

    arr.sort_by(|a, b| b.cmp(a));
    arr[0] + arr[1] + arr[2]
}

struct Valve<'a> {
    rate: i32,
    next: Vec<&'a str>,
    name: &'a str,
}

struct Valve2<'a> {
    rate: i32,
    next: Vec<(&'a str, i32)>,
    name: &'a str,
}

fn parse(input: &str) -> (HashMap<&str, Valve2>, i32, HashMap<&str, i32>) {
    let mut map: HashMap<&str, Valve> = HashMap::new();

    let mut max_valves = 0;
    let mut heads: HashMap<&str, i32> = HashMap::new();

    input.lines().for_each(|line| {
        let parts = Vec::from_iter(line.split_whitespace());

        let name = parts[1];
        let rate = parts[4][5..parts[4].len() - 1].parse::<i32>().unwrap();
        let next = Vec::from_iter(parts[9..].into_iter().map(|n| &n[0..2]));

        if rate > 0 && name != "AA" {
            heads.insert(name, 1 << max_valves);
            max_valves += 1;
        }

        map.insert(name, Valve { rate, next, name });
    });
    let all_opened = i32::pow(2, max_valves) - 1;

    let new_map = transform_map(&map);

    (new_map, all_opened, heads)
}

fn transform_map<'a, 'b>(map: &HashMap<&'a str, Valve<'b>>) -> HashMap<&'b str, Valve2<'b>> {
    let mut val_heads_names = vec!["AA"];

    val_heads_names.extend(map.iter().filter(|(_, v)| v.rate > 0).map(|(_, v)| v.name));

    let mut new_map: HashMap<&str, Valve2> = HashMap::new();

    for from_name in &val_heads_names {
        let mut next = vec![];
        for to_name in &val_heads_names {
            if from_name != to_name {
                next.push(find_path(map, from_name, to_name));
            }
        }

        new_map.insert(
            &from_name,
            Valve2 {
                name: from_name,
                rate: map.get(from_name).unwrap().rate,
                next,
            },
        );
    }

    new_map
}

fn find_path<'a>(map: &HashMap<&str, Valve>, start: &str, finish: &'a str) -> (&'a str, i32) {
    let mut results: Vec<i32> = vec![];

    dfs(&mut results, vec![start], 0, finish, &map);

    return (finish, *results.iter().min().unwrap());

    fn dfs<'a>(
        results: &mut Vec<i32>,
        path: Vec<&str>,
        score: i32,
        finish: &str,
        map: &HashMap<&str, Valve>,
    ) {
        let last = path.last().unwrap();
        if *last == finish {
            results.push(score);
        }

        for node_name in &map.get(last.clone()).unwrap().next {
            if !path.contains(node_name) {
                let mut new_path = path.clone();
                new_path.push(node_name);
                dfs(results, new_path, score + 1, finish, &map);
            }
        }
    }
}

/*

  function dfs(path, score) {
    let last = path[path.length - 1];
    if (last === finish) {
      results.push([score, path]);
      return;
    }

    for (let i = 0; i < map[last].next.length; i++) {
      let [nodeName] = map[last].next[i].split(',');
      if (!path.includes(nodeName)) {
        dfs([...path, nodeName], score + 1);
      }
    }
  }
*/
