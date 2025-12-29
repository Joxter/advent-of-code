from aoc import run_day


def part1(inp):
    arrs = [[0] * 123 for _ in range(8)]

    for line in inp.split("\n"):
        for i, ch in enumerate(line):
            arrs[i][ord(ch)] += 1

    res = ""
    for arr in arrs:
        m = arr.index(max(arr))
        res += chr(m)

    return res


def part2(inp):
    arrs = [[0] * 123 for _ in range(8)]

    for line in inp.split("\n"):
        for i, ch in enumerate(line):
            arrs[i][ord(ch)] += 1

    res = ""
    for arr in arrs:
        min_cnt = 100
        min_i = 0

        for i, cnt in enumerate(arr):
            if min_cnt > cnt > 0:
                min_i = i
                min_cnt = cnt

        res += chr(min_i)

    return res


run_day(2016, 6).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
