
# https://adventofcode.com/2021/day/3

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    lines = inp.split('\n')

    commonBits = [0] * len(lines[0])

    for line in lines:
        for i in range(len(lines[0])):
            if line[i] == '0':
                commonBits[i] -= 1
            else:
                commonBits[i] += 1

    oxy = ''.join(list(map(lambda n: ('1' if n > 0 else '0'), commonBits)))
    co2 = ''.join(list(map(lambda n: ('0' if n > 0 else '1'), commonBits)))
    gamma, delta = int(oxy, 2) , int(co2, 2)

    return gamma * delta

def findOxyRating(lines, offset):
    if len(lines) == 1:
        return lines[0]

    isMoreOne = 0
    for line in lines:
        if line[offset] == '1':
            isMoreOne += 1
        else:
            isMoreOne -= 1

    if (isMoreOne >= 0):
        oxyList = list(filter(lambda line: line[offset] == '1', lines))
    else:
        oxyList = list(filter(lambda line: line[offset] == '0', lines))

    return findOxyRating(oxyList, offset + 1)

def findCo2Rating(lines, offset):
    if len(lines) == 1:
        return lines[0]

    isMoreOne = 0
    for line in lines:
        if line[offset] == '1':
            isMoreOne += 1
        else:
            isMoreOne -= 1

    if (isMoreOne < 0):
        co2List = list(filter(lambda line: line[offset] == '1', lines))
    else:
        co2List = list(filter(lambda line: line[offset] == '0', lines))

    return findCo2Rating(co2List, offset + 1)

def part2(inp):
    lines = inp.split('\n')

    oxy = findOxyRating(lines, 0)
    co2 = findCo2Rating(lines, 0)

    gamma, delta = int(oxy, 2) , int(co2, 2)

    return gamma * delta


print('test1', part1(testInp), [198])
print('part1', part1(input))

print('test2', part2(testInp), [230])
print('part2', part2(input))
