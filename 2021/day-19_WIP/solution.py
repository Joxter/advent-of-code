
# https://adventofcode.com/2021/day/19

input = open('../inputs/d19/input.txt', 'r').read()
testInp = open('../inputs/d19/test.txt', 'r').read()

def parse(inp):
    scanners = {}
    for rawScanner in inp.split('\n\n'):
        [name, *dots] = rawScanner.splitlines()
        scannerId = int(name[12:-4])
        scanners[scannerId] = [[int(n) for n in line.split(',')] for line in dots]

#     print(scanners)
    return scanners

def findDistanceMapBetweenScanners(scanners):
    destinationsMap = {}
    for scannerId, dots in scanners.items():
        destinationsMap[scannerId] = {}
        for i in range(len(dots)):
            for j in range(i+1, len(dots)):
                dot1 = dots[i]
                dot2 = dots[j]
                distance= pow(dot1[0] - dot2[0], 2) + pow(dot1[1] - dot2[1], 2) + pow(dot1[2] - dot2[2], 2)
                destinationsMap[scannerId][(i, j)] = distance


    return destinationsMap


def part1(inp):
    scanners = parse(inp)
    distances = findDistanceMapBetweenScanners(scanners)
    times = {}
#     12 dots have 66 distances

    for i in distances[0].keys():
        for n in range(len(scanners)):
            d = distances[n][i]
            if d not in times:
                times[d] = 0
            times[d] += 1

#    printed sorted "times" by values
    sortedTimesValues = sorted(times.items(), key=lambda x: x[1])

    print(sortedTimesValues)

#     print(distances)
#     print(len(distances[0]))
    return 3

def part2(inp):
    return 3

print('test', part1(testInp), [])
# print('part1', part1(input), [])


# print('test', part2(testInp), [])
# print('part2', part2(input), [])
