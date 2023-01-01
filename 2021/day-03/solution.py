
# https://adventofcode.com/2021/day/3

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    lines = inp.split('\n')

    commonBits = [0] * len(lines[0])

    for line in lines:
        for i in range(len(lines[0])):
            if line[i] == '1':
                commonBits[i] += 1
            else:
                commonBits[i] -= 1

    oxy = [('1' if n > 0 else '0') for n in commonBits]
    co2 = [('0' if n > 0 else '1') for n in commonBits]

    gamma, delta = int(''.join(oxy), 2), int(''.join(co2), 2)

    return gamma * delta

def getRatingOf(lines, targetOnes, targetZeros, offset):
    if len(lines) == 1:
        return lines[0]

    isMoreOne = 0
    for line in lines:
        if line[offset] == '1':
            isMoreOne += 1
        else:
            isMoreOne -= 1

    if (isMoreOne >= 0):
        filteredList = [line for line in lines if line[offset] == targetOnes]
    else:
        filteredList = [line for line in lines if line[offset] == targetZeros]

    return getRatingOf(filteredList, targetOnes, targetZeros, offset + 1)

def part2(inp):
    lines = inp.split('\n')

    oxy = getRatingOf(lines, '1', '0', 0)
    co2 = getRatingOf(lines, '0', '1', 0)

    gamma, delta = int(oxy, 2), int(co2, 2)

    return gamma * delta


print('test1', part1(testInp), [198])
print('part1', part1(input), [3687446])

print('test2', part2(testInp), [230])
print('part2', part2(input), [4406844])
