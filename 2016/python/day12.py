from aoc import run_day


def solve(inp: str, c):
    registers = {
        "a": 0,
        "b": 0,
        "c": c,
        "d": 0,
    }

    i = 0
    ins = [line.split(" ") for line in inp.split("\n")]

    while i < len(ins):
        line = ins[i]

        if line[0] == "jnz":
            [_, x, y] = line

            if x in registers:
                val = registers[x]
            else:
                val = int(x)

            if val != 0:
                i += int(y)
            else:
                i += 1

        elif line[0] == "cpy":
            [_, x, y] = line

            if x in registers:
                registers[y] = registers[x]
            else:
                registers[y] = int(x)

            i += 1

        elif line[0] == "inc":
            [_, x] = line
            registers[x] += 1
            i += 1

        elif line[0] == "dec":
            [_, x] = line
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
