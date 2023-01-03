
# https://adventofcode.com/2021/day/___

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    grid = [[int(c) for c in list(line)] for line in inp.splitlines()]

    res = 0

    for i in renge(0, len(grid)):
        for j in renge(0, len(grid[0])):

    print(grid)
    return 3

def part2(inp):
    return 3

print('test', part1(testInp), [15])
# print('part1', part1(input), [])

# print('test', part2(testInp), [])
# print('part2', part2(input), [])
