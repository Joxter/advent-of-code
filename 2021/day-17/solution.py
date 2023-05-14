import math

# https://adventofcode.com/2021/day/17

input = open('../inputs/d01/input.txt', 'r').read()
testInp = open('../inputs/d01/test.txt', 'r').read()

def hits(xRange, yRange, vect):
    gridObj = {}

    for i in range(xRange[0], xRange[1] + 1):
        for j in range(yRange[0], yRange[1] + 1):
            gridObj[str(i) + " " + str(j)] = 'T'

    [dX, dY] = vect
    positionX = 0
    positionY = 0

    while positionY >= yRange[0]:
        positionX += dX
        positionY += dY

        key = str(positionX) + " " + str(positionY)
        if key in gridObj:
            return True

        if dX > 0:
            dX -= 1
        dY -= 1

    return False

def part1(inp):
    [_ ,_ , xRaw, yRaw] = inp.split(' ')
    xRange = [int(n) for n in xRaw[2:-1].split('..')]
    yRange = [int(n) for n in yRaw[2:].split('..')]

    return sum(range(1, -yRange[0]))

def part2(inp):
    [_ ,_ , xRaw, yRaw] = inp.split(' ')
    xRange = [int(n) for n in xRaw[2:-1].split('..')]
    yRange = [int(n) for n in yRaw[2:].split('..')]

    cnt = 0

    x = (-1 + math.sqrt(1 + 8 * xRange[0])) / 2
    for i in range(math.ceil(x), xRange[1] + 1):
        for j in range(yRange[0], abs(yRange[0]) + 1):
            if hits(xRange, yRange, [i, j]):
                cnt += 1

    return cnt

print('test', part1(testInp), [45])
print('part1', part1(input), [3003])

print('test', part2(testInp), [112])
print('part2', part2(input), [940])
