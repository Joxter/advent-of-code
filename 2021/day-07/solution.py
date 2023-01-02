import math

# https://adventofcode.com/2021/day/___

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    positions = [int(n) for n in inp.split(',')]

    res = math.inf

    for n in range(min(positions), max(positions) + 1):
        fuel = 0

        for pos in positions:
            fuel += abs(pos - n)

        if (fuel < res):
            res = fuel
        else:
            return res

def part2(inp):
    positions = [int(n) for n in inp.split(',')]

    res = math.inf

    def cost(l):
        return (1 + l) * l // 2

    for n in range(min(positions), max(positions) + 1):
        fuel = 0

        for pos in positions:
            fuel += cost(abs(pos - n))

        if (fuel < res):
            res = fuel
        else:
            return res

print('test', part1(testInp), [37])
print('part1', part1(input), [323647])

print('test', part2(testInp), [168])
print('part2', part2(input), [87640209])
