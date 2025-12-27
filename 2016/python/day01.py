from aoc import run_day


def part1(inp):
    depths = inp.split(", ")

    directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]
    dir = 0
    current = (0, 0)

    for r in depths:
        if r[0] == "R":
            dir += 1
        else:
            dir -= 1

        current = (
            current[0] + directions[dir % 4][0] * int(r[1:]),
            current[1] + directions[dir % 4][1] * int(r[1:]),
        )

    return abs(current[0]) + abs(current[1])


def part2(inp):
    depths = inp.split(", ")

    directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]
    dir = 0
    current = (0, 0)
    visited = {}

    for r in depths:
        if r[0] == "R":
            dir += 1
        else:
            dir -= 1

        for i in range(int(r[1:])):
            current = (
                current[0] + directions[dir % 4][0],
                current[1] + directions[dir % 4][1],
            )

            if current in visited:
                return abs(current[0]) + abs(current[1])
            else:
                visited[current] = True


run_day(2016, 1).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
