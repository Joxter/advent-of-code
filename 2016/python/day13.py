from aoc import run_day


def print_grid(grid, w, h):
    out = ""
    for y in range(h):
        line = ""
        for x in range(w):
            line += str(grid[(x, y)])

        out += "\n" + line

    return out.strip()


def part1(inp: str):
    """

    - Find x*x + 3*x + 2*x*y + y + y*y.
    - Add the office designer's favorite number (your puzzle input).
    - Find the binary representation of that sum; count the number of bits that are 1.
       If the number of bits that are 1 is even, it's an open space.
       If the number of bits that are 1 is odd, it's a wall.
    """
    grid = {}

    for y in range(500):
        for x in range(500):
            n = x * x + 3 * x + 2 * x * y + y + y * y + int(inp)
            bin = "{0:b}".format(n).count("1")
            if bin % 2 == 0:
                grid[(x, y)] = 0
            else:
                grid[(x, y)] = "#"

    q = [[(1, 1), 1]]

    while len(q) > 0:
        [pos, s] = q.pop(0)

        if pos[0] < 0 or pos[1] < 0:
            continue
        if grid[pos] == "#":
            continue
        if grid[pos]:
            continue
        if pos == (31, 39):
            return s - 1

        grid[pos] = s

        q.append([(pos[0] + 1, pos[1]), s + 1])
        q.append([(pos[0] - 1, pos[1]), s + 1])
        q.append([(pos[0], pos[1] + 1), s + 1])
        q.append([(pos[0], pos[1] - 1), s + 1])


def part2(inp: str):
    grid = {}

    for y in range(500):
        for x in range(500):
            n = x * x + 3 * x + 2 * x * y + y + y * y + int(inp)
            bin = "{0:b}".format(n).count("1")
            if bin % 2 == 0:
                grid[(x, y)] = 0
            else:
                grid[(x, y)] = "#"

    q = [[(1, 1), 1]]

    while len(q) > 0:
        [pos, s] = q.pop(0)

        if pos[0] < 0 or pos[1] < 0:
            continue
        if grid[pos] == "#":
            continue
        if s >= 52:
            continue
        if grid[pos]:
            continue

        grid[pos] = 1

        q.append([(pos[0] + 1, pos[1]), s + 1])
        q.append([(pos[0] - 1, pos[1]), s + 1])
        q.append([(pos[0], pos[1] + 1), s + 1])
        q.append([(pos[0], pos[1] - 1), s + 1])

    return list(grid.values()).count(1)


run_day(2016, 13).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
