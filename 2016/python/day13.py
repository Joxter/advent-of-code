from aoc import run_day


def is_wall(pos, C):
    (x, y) = pos
    n = x * x + 3 * x + 2 * x * y + y + y * y + C
    bin = "{0:b}".format(n).count("1")

    return bin % 2 == 0


def print_grid(grid, w, h):
    out = ""
    for y in range(h):
        line = ""
        for x in range(w):
            try:
                line += str(grid[(x, y)])
            except:
                line += "."

        out += "\n" + line

    return out.strip()


def part1(inp: str):
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


def part1_grid_49(inp: str):
    grid = {}

    for y in range(49):
        for x in range(49):
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


def part1_no_grid(inp: str):
    grid = {}
    C = int(inp)

    q = [[(1, 1), 1]]

    while len(q) > 0:
        [pos, s] = q.pop(0)

        if pos[0] < 0 or pos[1] < 0:
            continue
        if pos in grid:
            continue
        if not is_wall(pos, C):
            continue
        if pos == (31, 39):
            return s - 1

        grid[pos] = s

        q.append([(pos[0] + 1, pos[1]), s + 1])
        q.append([(pos[0] - 1, pos[1]), s + 1])
        q.append([(pos[0], pos[1] + 1), s + 1])
        q.append([(pos[0], pos[1] - 1), s + 1])


run_day(2016, 13, 100).parts(
    [
        [1, part1],
        [1, part1_grid_49, "part1_grid_49"],
        [1, part1_no_grid, "part1_no_grid"],
        [2, part2],
    ]
).end()
