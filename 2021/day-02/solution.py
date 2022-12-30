
# https://adventofcode.com/2021/day/2

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    lines = inp.split('\n')

    hor = 0
    depth = 0

    for line in lines:
        match line.split(' '):
            case ['forward', n]:
                hor += int(n)
            case ['down', n]:
                depth += int(n)
            case ['up', n]:
                depth -= int(n)

    return hor * depth

def part2(inp):
    lines = inp.split('\n')

    hor = 0
    depth = 0
    aim = 0

    for line in lines:
        match line.split(' '):
            case ['forward', n]:
                hor += int(n)
                depth += aim * int(n)
            case ['down', n]:
                aim += int(n)
            case ['up', n]:
                aim -= int(n)

    return hor * depth

print('test1', part1(testInp), [150])
print('part1', part1(input))

print('test2', part2(testInp), [900])
print('part2', part2(input))
