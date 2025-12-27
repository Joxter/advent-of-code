input = open("../inputs/2016/day02.txt", "r").read()


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

    current = [1, 1]
    result = ""

    for l in inp.split("\n"):
        for dir in list(l):
            current[0] += directions[dir][0]
            current[1] += directions[dir][1]

            current[0] = clamp(current[0], 0, 2)
            current[1] = clamp(current[1], 0, 2)

        result += keys[(current[0], current[1])]

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

    current = [2, 0]
    result = ""

    for l in inp.split("\n"):
        for dir in list(l):
            nextPos = list(current)

            nextPos[0] += directions[dir][0]
            nextPos[1] += directions[dir][1]

            if keys.get((nextPos[0], nextPos[1]), False):
                current = nextPos

        result += keys[(current[0], current[1])]

    return result


print("part1", part1(input), ["35749"])
print("part2", part2(input), ["9365C"])
