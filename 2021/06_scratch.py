def part1(inp):
    lans = [int(n) for n in inp.split(',')]

    for day in range(80):
        newLans = 0

        for i in range(len(lans)):
            if lans[i] == 0:
                lans[i] = 6
                newLans += 1
            else:
                lans[i] -= 1

        lans = lans + newLans * [8]

    return len(lans)

def part2(inp):
    lans = [int(n) for n in inp.split(',')]

    bunches = []
    for d in range(0, 9):
        bunches.append([d, lans.count(d)])

    for day in range(256):
        newLans = 0

        for i in range(len(bunches)):
            if bunches[i][0] == 0:
                bunches[i][0] = -1
                newLans = bunches[i][1]
            else:
                bunches[i][0] = bunches[i][0] - 1

        for i in range(len(bunches)):
            if bunches[i][0] == 6:
                bunches[i][1] = bunches[i][1] + newLans

        for i in range(len(bunches)):
            if bunches[i][0] == -1:
                bunches[i][0] = 8
                bunches[i][1] = newLans

    return sum([b[1] for b in bunches])

print('test1', part1(testInp), [5934])
print('part1', part1(input), [363101])

print('test2', part2(testInp), [26984457539])
print('part2', part2(input), [1644286074024])
