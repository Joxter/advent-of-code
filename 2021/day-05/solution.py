
# https://adventofcode.com/2021/day/5

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    lines = [line.split(' -> ') for line in inp.split('\n')]
    grid = {}

    for (left, right) in lines:
        left, right = [int(n) for n in left.split(',')], [int(n) for n in right.split(',')]

        if (left[0] == right[0]):
            r = sorted([left[1], right[1]])
            for i in range(r[0], r[1] + 1):
                key = str(left[0]) + ',' + str(i)
                if key not in grid:
                    grid[key] = 0
                grid[key] += 1
        if (left[1] == right[1]):
            r = sorted([left[0], right[0]])
            for i in range(r[0], r[1] + 1):
                key = str(i) + ',' + str(left[1])
                if key not in grid:
                    grid[key] = 0
                grid[key] += 1

    res = 0
    for k in grid:
        if grid[k] > 1:
            res += 1

    return res

def part2(inp):
    lines = [line.split(' -> ') for line in inp.split('\n')]
    grid = {}

    def myRange(l, r):
        if l < r:
            return range(l, r + 1)
        return reversed(range(r, l + 1))

    for (left, right) in lines:
        left, right = [int(n) for n in left.split(',')], [int(n) for n in right.split(',')]

        if (left[0] == right[0]):
            r = sorted([left[1], right[1]])
            for i in range(r[0], r[1] + 1):
                key = str(left[0]) + ',' + str(i)
                if key not in grid:
                    grid[key] = 0
                grid[key] += 1
        elif (left[1] == right[1]):
            r = sorted([left[0], right[0]])
            for i in range(r[0], r[1] + 1):
                key = str(i) + ',' + str(left[1])
                if key not in grid:
                    grid[key] = 0
                grid[key] += 1
        else:
            r = myRange(left[0], right[0])
            r1 = myRange(left[1], right[1])
            rr = zip(r, r1)

            for l, r in rr:
                key = str(l) + ',' + str(r)
                if key not in grid:
                    grid[key] = 0
                grid[key] += 1

    res = 0
    for k in grid:
        if grid[k] > 1:
            res += 1

    return res

print('test1', part1(testInp), [5])
print('part1', part1(input), [5294])

print('test2', part2(testInp), [12])
print('part2', part2(input), [21698])
