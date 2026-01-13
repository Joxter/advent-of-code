from aoc import run_day


def solve(inp: str, c):
    registers = {
        "a": 0,
        "b": 0,
        "c": c,
        "d": 0,
    }

    i = 0
    ins = inp.split("\n")

    while i < len(ins):
        line = ins[i]

        if line.startswith("jnz"):
            [_, x, y] = line.split(" ")

            if x in registers:
                val = registers[x]
            else:
                val = int(x)

            if val != 0:
                i += int(y)
            else:
                i += 1

        if line.startswith("cpy"):
            [_, x, y] = line.split(" ")

            if x in registers:
                registers[y] = registers[x]
            else:
                registers[y] = int(x)

            i += 1

        if line.startswith("inc"):
            [_, x] = line.split(" ")
            registers[x] += 1
            i += 1

        if line.startswith("dec"):
            [_, x] = line.split(" ")
            registers[x] -= 1
            i += 1

    return registers["a"]


def part1(inp: str):
    return solve(inp, 0)


def part2(inp: str):
    return solve(inp, 1)


run_day(2016, 12).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
