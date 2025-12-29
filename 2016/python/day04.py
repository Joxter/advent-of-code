import re

from aoc import run_day


def calc_hash(str):
    chars = list(set(str) - {"-"})

    chars.sort(key=lambda x: str.count(x) * 1000 - ord(x), reverse=True)

    return "".join(chars)[0:5]


def part1(inp):
    result = 0

    for line in inp.split("\n"):
        name = re.search(r"[-a-z]+", line).group()
        hash = line[-6:-1]

        if calc_hash(name) == hash:
            s = re.search(r"\d+", line).group()
            result += int(s)

    return result


def part2(inp):
    result = 0

    for line in inp.split("\n"):
        name = re.search(r"[-a-z]+", line).group()
        s = int(re.search(r"\d+", line).group())

        secret_name = ""
        for ch in name:
            if ch == "-":
                secret_name += " "
            else:
                new_id = (ord(ch) - ord("a") + s) % 26
                secret_name += chr(ord("a") + new_id)

        if secret_name == "northpole object storage ":
            return s

    return result


run_day(2016, 4).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
