import re

from aoc import run_day, ints


def part1(inp: str):
    # X(8x2)(3x3)ABCY
    # chars * times
    print(inp.split("\n"))

    state = "out"
    cnt = 0
    i = 0
    acc = ""

    while i < len(inp):
        ch = inp[i]
        if ch == "(":
            state = "in"
        elif ch == ")":
            state = "out"

            [s, times] = ints(acc)
            cnt += s * times - len(acc)

            # print(acc)
            # print(inp[i + 1 : i + 1 + s])

            i += s
            acc = ""
        else:
            if state == "in":
                acc += ch

            cnt += 1

        i += 1

    return cnt


def part2(inp: str):
    return 123


run_day(2016, 9).parts(
    [
        [1, part1],
        # [2, part2],
    ]
).end()

# print(part1("X(8x2)(3x3)ABCY"))
# print(part1("A(1x5)BC"))
# print(part1("A(2x2)BCD(2x2)EFG"))
# print(part1("(6x1)(1x3)A"))
