
# https://adventofcode.com/2021/day/25

input = open('../inputs/d25/input.txt', 'r').read()

def part1(inp):
    grid = [list('.' * len(l)) for l in inp.splitlines()]
    lines = inp.splitlines()

    height = len(lines)
    width = len(lines[0])
    
    herds = {}
    for i in range(len(lines)):
        for j in range(len(lines[0])):
            if lines[i][j] != '.':
                herds[(i,j)] = lines[i][j]

    step = 1
    changed = False
    while True:
        nextHerds = {}
        changed = False
        for (i, j), herd in herds.items():
            if herd == '>':
                if j + 1 < width:
                    if (i, j + 1) not in herds:
                        nextHerds[(i,j + 1)] = herd
                        changed = True
                    else:
                        nextHerds[(i,j)] = herd
                else:
                    if (i, 0) not in herds:
                        changed = True
                        nextHerds[(i, 0)] = herd
                    else:
                        nextHerds[(i,j)] = herd
            else:
                nextHerds[(i,j)] = herds[(i,j)]

        herds = nextHerds
        nextHerds = {}

        for (i, j), herd in herds.items():
            if herd == 'v':
                if i + 1 < height:
                    if (i + 1, j) not in herds:
                        nextHerds[(i + 1,j)] = herd
                        changed = True
                    else:
                        nextHerds[(i,j)] = herd
                else:
                    if (0, j) not in herds:
                        nextHerds[(0,j)] = herd
                        changed = True
                    else:
                        nextHerds[(i,j)] = herd
            else:
                nextHerds[(i,j)] = herds[(i,j)]
        if not changed:
            return step

        herds = nextHerds
        step += 1

    return None
        
print(part1(input), [308])
# print('part1', part1(input), [])

