from aoc import run_day
import re


def has_abba(line):
    if len(line) < 4:
        return False

    for i in range(len(line) - 3):
        if (
            line[i] == line[i + 3]
            and line[i + 1] == line[i + 2]
            and line[i] != line[i + 1]
        ):
            return True

    return False


def part1(inp):
    cnt = 0

    reg = re.compile("\[(.+?)\]")

    for line in inp.split("\n"):
        grs = reg.findall(line)
        has = 0
        for gr in grs:
            if has_abba(gr):
                has += 1

        if not has:
            no_grs = reg.sub(" ", line)
            if has_abba(no_grs):
                cnt += 1

    return cnt


def part2(inp: str):
    cnt = 0

    for line in inp.split("\n"):
        parts = line.replace("[", "]").split("]")
        a = "--".join(parts[0::2])
        b = "--".join(parts[1::2])

        if re.match(r".*(.)(?!\1)(.)\1.*  .*\2\1\2.*", a + "  " + b):
            cnt += 1

    return cnt


run_day(2016, 7).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
