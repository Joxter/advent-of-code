from aoc import run_day


def clamp(n, min, max):
    if n < min:
        return min
    elif n > max:
        return max
    else:
        return n


def part1(inp):
    directions = {
        "U": [-1, 0],
        "R": [0, 1],
        "D": [1, 0],
        "L": [0, -1],
    }
    keys = {
        (0, 0): "1",
        (0, 1): "2",
        (0, 2): "3",
        (1, 0): "4",
        (1, 1): "5",
        (1, 2): "6",
        (2, 0): "7",
        (2, 1): "8",
        (2, 2): "9",
    }

    current = (1, 1)
    result = ""

    for l in inp.split("\n"):
        for dir in list(l):
            current = (
                clamp(current[0] + directions[dir][0], 0, 2),
                clamp(current[1] + directions[dir][1], 0, 2),
            )

        result += keys[current]

    return result


def part2(inp):
    directions = {
        "U": [-1, 0],
        "R": [0, 1],
        "D": [1, 0],
        "L": [0, -1],
    }
    keys = {
        #
        (0, 2): "1",
        #
        (1, 1): "2",
        (1, 2): "3",
        (1, 3): "4",
        #
        (2, 0): "5",
        (2, 1): "6",
        (2, 2): "7",
        (2, 3): "8",
        (2, 4): "9",
        #
        (3, 1): "A",
        (3, 2): "B",
        (3, 3): "C",
        #
        (4, 2): "D",
    }

    current = (2, 0)
    result = ""

    for l in inp.split("\n"):
        for dir in list(l):
            nextPos = (
                current[0] + directions[dir][0],
                current[1] + directions[dir][1],
            )

            if nextPos in keys:
                current = nextPos

        result += keys[current]

    return result


run_day(2016, 2).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
