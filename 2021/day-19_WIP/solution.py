
# https://adventofcode.com/2021/day/19

input = open('../inputs/d19/input.txt', 'r').read()
testInp = open('../inputs/d19/test.txt', 'r').read()

def distance(dot1, dot2):
    d = pow(dot1[0] - dot2[0], 2) + pow(dot1[1] - dot2[1], 2) + pow(dot1[2] - dot2[2], 2)
    return d

def vector(dot1, dot2):
    v = (dot1[0] - dot2[0], dot1[1] - dot2[1], dot1[2] - dot2[2])
    return v

def parse(inp):
    scanners = {}
    for rawScanner in inp.split('\n\n'):
        [name, *dots] = rawScanner.splitlines()
        scannerId = int(name[12:-4])
        scanners[scannerId] = [[int(n) for n in line.split(',')] for line in dots]

    return scanners

def findDistanceMap(dots):
    destinations = []
    for i in range(len(dots)):
        for j in range(i + 1, len(dots)):
            dot1 = dots[i]
            dot2 = dots[j]
            d = distance(dot1, dot2)
            destinations.append((i, j, d))

    return destinations

def findDistanceMapBetweenScanners(scanners):
    destinationsMap = {}
    for scannerId, dots in scanners.items():
        destinationsMap[scannerId] = findDistanceMap(dots)

    return destinationsMap

def findInDist(distances, length):
    for n in range(len(distances)):
        (i, j, distance) = distances[n]

        if length == distance:
            return n

    return None

def renameInDist(distances, fromName, toName):
    for n in range(len(distances)):
        (i, j, distance) = distances[n]
        if i == fromName:
            distances[n] = (toName, j, distance)
        elif j == fromName:
            distances[n] = (i, toName, distance)

def part1(inp):
    scanners = parse(inp)
    distances = findDistanceMapBetweenScanners(scanners)
    #     12 dots have 66 distances

    commonDistances = {}

    uniqNodeName = 100

    for a in range(len(scanners)):
        for b in range(a + 1, len(scanners)):
            distA = list(map(lambda it: it[2], distances[a]))
            distB = list(map(lambda it: it[2], distances[b]))
#             print(distA)
            cd = len(set(distA) & set(distB))
#             print(set(distA) & set(distB))
            commonDistances[(a, b)] = cd
#
            if cd >= 66:
                for commonDist in set(distA) & set(distB):
                    indexA = findInDist(distances[a], commonDist)
#                     print(distances[b])
                    indexB = findInDist(distances[b], commonDist)

                    print(commonDist, [indexA, indexB], [distances[a][indexA], distances[b][indexB]])
                    aDot1 = distances[a][indexA][0]
                    aDot2 = distances[a][indexA][1]
                    bDot1 = distances[b][indexB][0]
                    bDot2 = distances[b][indexB][1]
                    print([scanners[a][aDot1], scanners[a][aDot2]], [scanners[b][bDot1], scanners[b][bDot2]])
                    print(vector(scanners[a][aDot1], scanners[a][aDot2]),vector(scanners[b][bDot1], scanners[b][bDot2]))

                    scannersB = []
                    for [x,y,z] in scanners[b]:
                        new_x = -x
                        new_y = y
                        new_z = -z
                        scannersB.append([new_x, new_y, new_z])
#                     print(scanners[b])
#                     print(scannersB)
                    distB2 = findDistanceMap(scannersB)
#                     print(findDistanceMap(scannersB))
                    indexB2 = findInDist(distB2, commonDist)
#                     print(indexB2)
                    bDot1_2 = distB2[indexB2][0]
                    bDot2_2 = distB2[indexB2][1]
                    print([scanners[a][aDot1], scanners[a][aDot2]], [scannersB[bDot1_2], scannersB[bDot2_2]])
                    offsetVector = vector(scanners[a][aDot1], scannersB[bDot1_2])

                    scannersBOffset = []
                    for [x,y,z] in scannersB:
                        scannersBOffset.append([x + offsetVector[0], y + offsetVector[1],z + offsetVector[2]])

                    print(scanners[a])
                    print(scannersBOffset) # TODO ТУТ нормалихорованный вектор B относительно вектора A

                    return

                    if distances[a][indexA][0] < 100:
                        if distances[b][indexB][0] < 100:
                            renameInDist(distances[a], distances[a][indexA][0], uniqNodeName)
                            renameInDist(distances[b], distances[b][indexB][0], uniqNodeName)
                            uniqNodeName += 1
                        elif distances[b][indexB][1] < 100:
                            renameInDist(distances[a], distances[a][indexA][0], uniqNodeName)
                            renameInDist(distances[b], distances[b][indexB][1], uniqNodeName)
                            uniqNodeName += 1
                        else:
                            return "ERROR 111"
#                     print(commonDist, [indexA, indexB], [distances[a][indexA], distances[b][indexB]])
                    if distances[a][indexA][1] < 100:
                        if distances[b][indexB][0] < 100:
                            print('>>>', distances[b][indexB])
                            renameInDist(distances[a], distances[a][indexA][1], uniqNodeName)
                            renameInDist(distances[b], distances[b][indexB][0], uniqNodeName)
                            uniqNodeName += 1
                        elif distances[b][indexB][1] < 100:
                            renameInDist(distances[a], distances[a][indexA][1], uniqNodeName)
                            renameInDist(distances[b], distances[b][indexB][1], uniqNodeName)
                            uniqNodeName += 1
                        else:
                            return "ERROR 222"

#                     print(commonDist, [indexA, indexB], [distances[a][indexA], distances[b][indexB]])
#                     return 4

                    # rename INDEXES to 100+
#             return 4

#     print(distances)

    uniqNames = {}
    for vals in distances.values():
        for n in vals:
            uniqNames[n[0]] = 1
            uniqNames[n[1]] = 1
    print(uniqNames)
    print(len(uniqNames))

#     print(commonDistances)

    return 3

def part2(inp):
    return 3

print('test', part1(testInp), [])
# print('part1', part1(input), [])


# print('test', part2(testInp), [])
# print('part2', part2(input), [])

"""
{
    (0, 1): 66, (0, 2): 3, (0, 3): 0, (0, 4): 15,
    (1, 2): 15, (1, 3): 66, (1, 4): 66,
    (2, 3): 3, (2, 4): 66,
    (3, 4): 15
}


- X axis
new_x [1   0     0   ]
new_y [0   0   -1   ]
new_z [0   1    0   ]

new_x = x
new_y = -z
new_z = y

- Y axis
[ 0   0   1 ]
[ 0   1   0 ]
[-1   0   0 ]

- Z axis
[ 0  -1   0 ]
[ 1   0   0 ]
[ 0   0   1 ]

 x1 y1 z1  -  x2 y2 z2
(2, 5, 7) and (5,-7, 2)

x2 = y1
y2 = -z1
z2 = x1

(1013, -286, 62) -> (-1013, -286, -62)
new_x = -x
new_y = y
new_z = -z


 """

