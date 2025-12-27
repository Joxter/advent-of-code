from aoc import ints, run_day


def part1(inp):
    count = 0

    for line in inp.split("\n"):
        a, b, c = sorted(ints(line))
        if a + b > c:
            count += 1

    return count


def part2(inp):
    grid = [ints(line) for line in inp.split("\n")]

    count = 0
    for col in zip(*grid):
        for i in range(0, len(col), 3):
            a, b, c = sorted(col[i : i + 3])
            if a + b > c:
                count += 1

    return count


run_day(2016, 3).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
