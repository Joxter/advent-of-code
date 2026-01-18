from aoc import run_day, ints


def part1(inp: str):

    disks = []
    for line in inp.split("\n"):
        [n, total, time, pos] = ints(line)
        disks.append((n, total, pos))

    time = 0
    while True:
        ok = True
        for n, total, pos in disks:
            if (pos + time + n) % total > 0:
                ok = False
                break

        if ok:
            return time

        time += 1


def part2(inp: str):
    disks = []
    for line in inp.split("\n"):
        [n, total, time, pos] = ints(line)
        disks.append((n, total, pos))

    disks.append((7, 11, 0))

    time = 0
    while True:
        ok = True
        for n, total, pos in disks:
            if (pos + time + n) % total > 0:
                ok = False
                break

        if ok:
            return time

        time += 1

    return -1


run_day(2016, 15).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
