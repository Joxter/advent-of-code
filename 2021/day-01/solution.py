
input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    depths = inp.split('\n')
    cnt = 0
    for n in range(1, len(depths)):
        if int(depths[n - 1]) < int(depths[n]):
            cnt += 1
    return cnt

def part2(inp):
    depths = inp.split('\n')
    cnt = 0
    for n in range(3, len(depths)):
        if int(depths[n - 3]) < int(depths[n]):
            cnt += 1
    return cnt

print('test1', part1(testInp), [7])
print('part1', part1(input))

print('test2', part2(testInp), [5])
print('part2', part2(input))
