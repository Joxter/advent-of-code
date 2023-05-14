import math

# https://adventofcode.com/2021/day/18

input = open('../inputs/d18/input.txt', 'r').read()
testInp = open('../inputs/d18/test.txt', 'r').read()

def parseRow(inp):
    res = [x for x in inp if x != ',']
    return res

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

def explode(arr):
    i = 0
    openBrackets = 0

    while i < len(arr):
        char = arr[i]
        if char == "[":
            openBrackets += 1
        elif char == "]":
            openBrackets -= 1

        if openBrackets > 4 and char.isdigit() and arr[i + 1].isdigit():
            j = i - 1
            while j >= 0:
                if arr[j].isdigit():
                    arr[j] = str(int(arr[j]) + int(char))
                    break
                j -= 1
            arr[i] = "0"

            i += 1
            rightChar = arr[i]

            j = i + 1
            while j < len(arr):
                if arr[j].isdigit():
                    arr[j] = str(int(arr[j]) + int(rightChar))
                    break
                j += 1
            arr[i] = "0"

            break

        i += 1

    if i < len(arr):
        arr.pop(i - 2)
        arr.pop(i - 2)
        arr.pop(i - 1)
        return explode(arr)

    return arr

def split(arr):
    i = 0
    openBrackets = 0

    while i < len(arr):
        char = arr[i]

        if char.isdigit() and int(char) > 9:
            arr[i] = str(math.floor(int(char) / 2))
            arr.insert(i + 1, str(math.ceil(int(char) / 2)))
            arr.insert(i, '[')
            arr.insert(i + 3, ']')
            break

        i += 1

    return arr

def magnitude(arr):
    res = 0
    i = 0

    if (len(arr) == 1):
        return int(arr[0])

    while i < len(arr):
        char = arr[i]
        nextChar = arr[i + 1]

        if char.isdigit() and nextChar.isdigit():
            arr[i] = str(int(char) * 3 + int(nextChar) * 2)
            arr.pop(i + 2)
            arr.pop(i + 1)
            arr.pop(i - 1)

            return magnitude(arr)

        i += 1

    return arr

def sumNums(a,b):
    joined = ['['] + a + b + [']']

    while True:
        afterExplode = explode(joined.copy())
        afterSplit = split(afterExplode)

        if ' '.join(afterSplit) == ' '.join(joined):
            return afterSplit
        else:
            joined = afterSplit


def part1(inp):
    [total, *nums] = [parseRow(n) for n in inp.splitlines()]

    for n in nums:
        total = sumNums(total, n)

    return magnitude(total)

def part2(inp):
    nums = [parseRow(n) for n in inp.splitlines()]
    max = 0

    for i in range(len(nums)):
        for j in range(len(nums)):
            if i == j:
                continue

            s = magnitude(sumNums(nums[i].copy(), nums[j].copy()))
            if s > max:
                max = s

    return max

print('test', part1(testInp), [4140])
print('part1', part1(input), [4235])

print('test', part2(testInp), [3993])
print('part2', part2(input), [4659])
