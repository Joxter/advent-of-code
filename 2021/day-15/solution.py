import queue

# https://adventofcode.com/2021/day/15

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def printGrid(grid):
    for l in grid:
        print(l)

def part1(inp):
    grid = [list(l) for l in inp.splitlines()]
    size = len(grid)
    best = [[9 * size * size] * size for i in range(size)]

    q = queue.Queue()
    q.put([-int(grid[0][0]), [0, 0]])

    skipped = 0
    steps = 0
    maxLen = 0

    while (q.qsize() > 0):
        steps += 1
        maxLen = max(maxLen, q.qsize())
        s, current = q.get()

        if current[0] < 0 or current[0] >= size or current[1] < 0 or current[1] >= size:
            continue

        s += int(grid[current[0]][current[1]])

        if s < best[current[0]][current[1]]:
            best[current[0]][current[1]] = s
        else:
            skipped += 1
            continue

        q.put([s, [current[0], current[1] + 1]])
        q.put([s, [current[0] + 1, current[1]]])
        q.put([s, [current[0], current[1] - 1]])
        q.put([s, [current[0] - 1, current[1]]])

    print('skipped', skipped)
    print('steps', steps)
    print('maxLen', maxLen)

    return best[-1][-1]

def part2(inp):
    grid_ = [list(l) for l in inp.splitlines()]
    size_ = len(grid_)

    grid = [];
    for i in range(0, size_):
        row = []
        for j in range(0, 5 * size_):
            if j < size_:
                row.append(int(grid_[i][j % size_]))
            else:
                if row[j - size_] + 1 == 10:
                    row.append(1)
                else:
                    row.append(row[j - size_] + 1)
        grid.append(row)

    for i in range(size_, 5 * size_):
        row = []
        for j in range(0, 5 * size_):
            if grid[i - size_][j] + 1 == 10:
                row.append(1)
            else:
                row.append(grid[i - size_][j] + 1)
        grid.append(row)

    size = len(grid)
    best = [[9 * size * size] * size for i in range(size)]

    q = queue.Queue()
    q.put([-grid[0][0], [0, 0]])

    skipped = 0
    steps = 0
    maxLen = 0

    while (q.qsize() > 0):
        steps += 1
        maxLen = max(maxLen, q.qsize())
        s, current = q.get()

        if current[0] < 0 or current[0] >= size or current[1] < 0 or current[1] >= size:
            continue

        s += int(grid[current[0]][current[1]])

        if s < best[current[0]][current[1]]:
            best[current[0]][current[1]] = s
        else:
            skipped += 1
            continue

        q.put([s, [current[0], current[1] + 1]])
        q.put([s, [current[0] + 1, current[1]]])
        q.put([s, [current[0], current[1] - 1]])
        q.put([s, [current[0] - 1, current[1]]])

    print('skipped', skipped)
    print('steps', steps)
    print('maxLen', maxLen)

    return best[-1][-1]

print('test', part1(testInp), [40])
print('part1', part1(input), [652])

print('test', part2(testInp), [315])
# print('part2', part2(input), [2938]) # EXTREMELY SLOW, like 30 min or so
