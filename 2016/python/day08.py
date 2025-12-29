from aoc import run_day, ints


def print_grid(grid):
    out = ""
    for yy in range(6):
        line = ""
        for xx in range(50):
            line += str(grid[(xx, yy)])

        out += "\n" + line

    return out.strip()


def do_rect(grid, x, y):
    for xx in range(x):
        for yy in range(y):
            grid[(xx, yy)] = 1


def do_row(grid, y, offset):
    new_row = [0] * 50

    for x in range(50):
        if grid[(x, y)]:
            new_row[(x + offset) % 50] = 1

    for x in range(50):
        grid[(x, y)] = new_row[x]


def do_column(grid, x, offset):
    new_col = [0] * 6

    for y in range(6):
        if grid[(x, y)]:
            new_col[(y + offset) % 6] = 1

    for y in range(6):
        grid[(x, y)] = new_col[y]


def part1(inp: str):
    grid = {}

    for xx in range(50):
        for yy in range(6):
            grid[(xx, yy)] = 0

    for line in inp.split("\n"):
        [a, b] = ints(line)
        if "rect" in line:
            do_rect(grid, a, b)
        elif "row" in line:
            do_row(grid, a, b)
        else:
            do_column(grid, a, b)

    return sum(grid.values())


def part2(inp: str):
    grid = {}

    for xx in range(50):
        for yy in range(6):
            grid[(xx, yy)] = 0

    for line in inp.split("\n"):
        [a, b] = ints(line)
        if "rect" in line:
            do_rect(grid, a, b)
        elif "row" in line:
            do_row(grid, a, b)
        else:
            do_column(grid, a, b)

    return print_grid(grid)


run_day(2016, 8).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
