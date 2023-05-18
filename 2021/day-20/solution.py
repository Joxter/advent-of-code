
# https://adventofcode.com/2021/day/20

input = open('../inputs/d20/input.txt', 'r').read()
testInp = open('../inputs/d20/test.txt', 'r').read()

def getCode(x, y, image):
    code = ''
    for i in range(x-1, x+2):
        for j in range(y-1, y+2):
            if i >= 0 and i < len(image) and j >= 0 and j < len(image[0]):
                code += image[i][j]
            else:
                code += '.'

    return int(code.replace('.', '0').replace('#', '1'), 2)

def simulate(inp, iterations):
    [alg, image] = inp.split('\n\n')
    image = [list(l) for l in image.splitlines()]

    size = len(image)

    newImage = []
    offset = int(size + iterations + 5)
    newSize = size + offset * 2

    for i in range(offset):
        newImage.append(['.'] * newSize)
    for row in image:
        newImage.append(['.'] * offset + row + ['.'] * offset)
    for i in range(offset):
        newImage.append(['.'] * newSize)

    image = newImage

    for it in range(1, iterations + 1):
        newImage = []
        for i in range(newSize):
            row = []
            for j in range(newSize):
                row.append(alg[getCode(i, j, image)])
            newImage.append(row)

        newImage[0][0] = newImage[0][1]
        newImage[-1][0] = newImage[0][1]
        newImage[-1][-1] = newImage[0][1]
        newImage[0][-1] = newImage[0][1]

        image = newImage

    return sum([row.count('#') for row in image])

def part1(inp):
    return simulate(inp, 2)

def part2(inp):
    return simulate(inp, 50)

print('test', part1(testInp), [35])
print('part1', part1(input), [5097])

print('test', part2(testInp), [3351])
print('part2', part2(input), [17987])
