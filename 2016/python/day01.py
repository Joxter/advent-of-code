input = open("../../inputs/2016/day01.txt", "r").read()


def part1(inp):
    depths = inp.split(", ")

    directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]
    dir = 0
    current = [0, 0]

    for r in depths:
        if r[0] == "R":
            dir += 1
        else:
            dir -= 1

        current[0] += directions[dir % 4][0] * int(r[1:])
        current[1] += directions[dir % 4][1] * int(r[1:])

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
    current = [0, 0]
    visited = {}

    for r in depths:
        if r[0] == "R":
            dir += 1
        else:
            dir -= 1

        for i in range(int(r[1:])):
            current[0] += directions[dir % 4][0]
            current[1] += directions[dir % 4][1]

            if visited.get((current[0], current[1]), False):
                return abs(current[0]) + abs(current[1])
            else:
                visited[(current[0], current[1])] = True


print("part1", part1(input), [271])
print("part2", part2(input), [153])
