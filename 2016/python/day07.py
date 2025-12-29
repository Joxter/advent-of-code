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


def has_aba(line):
    if len(line) < 3:
        return False

    for i in range(len(line) - 2):
        if line[i] == line[i + 2] and line[i] != line[i + 1]:
            return True

    return False


# print(has_abba("ioxxoj"))
# print(has_abba("oxxo"))
# print(has_abba("ljox3xo"))
# print(has_abba("xo"))


def part1(inp):
    cnt = 0

    for line in inp.split("\n"):
        grs = re.findall(r"\[(.+?)\]", line)
        has = 0
        for gr in grs:
            if has_abba(gr):
                has += 1

        if not has:
            no_grs = re.sub(r"\[(.+?)\]", " ", line)
            if has_abba(no_grs):
                cnt += 1

    return cnt


def part2(inp):
    cnt = 0

    for line in inp.split("\n"):
        grs = re.findall(r"\[(.+?)\]", line)
        has = 0
        for gr in grs:
            if has_abba(gr):
                has += 1

        if not has:
            no_grs = re.sub(r"\[(.+?)\]", " ", line)
            if has_abba(no_grs):
                cnt += 1

    return cnt


run_day(2016, 7).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
