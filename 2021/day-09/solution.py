
# https://adventofcode.com/2021/day/9

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    grid = [[int(c) for c in list(line)] for line in inp.splitlines()]

    res = 0

    def getCellVal(i, j):
        if (i >= 0 and i < len(grid) and j >= 0 and j < len(grid[0])):
            return grid[i][j]
        return 9

    for i in range(0, len(grid)):
        for j in range(0, len(grid[0])):
            if (
              grid[i][j] < getCellVal(i + 1, j) and
              grid[i][j] < getCellVal(i - 1, j) and
              grid[i][j] < getCellVal(i, j + 1) and
              grid[i][j] < getCellVal(i, j - 1)
            ):
                res += 1 + grid[i][j]

    return res

def part2(inp):
    grid = [[int(c) for c in list(line)] for line in inp.splitlines()]

    res = 0

    def getCellVal(i, j):
        if (i >= 0 and i < len(grid) and j >= 0 and j < len(grid[0])):
            return grid[i][j]
        return 9

    def dfs(i,j):
        if (getCellVal(i,j) == 9):
            return 0
        grid[i][j] = 9

        return dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1) + 1

    basins = []
    for i in range(0, len(grid)):
        for j in range(0, len(grid[0])):
            basinSize = dfs(i, j)

            if (basinSize):
                basins.append(basinSize)

    basins.sort(reverse=True)

    return basins[0] * basins[1] * basins[2]

print('test', part1(testInp), [15])
print('part1', part1(input), [607])

print('test', part2(testInp), [1134])
print('part2', part2(input), [900864])
