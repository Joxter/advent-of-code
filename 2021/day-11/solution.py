
# https://adventofcode.com/2021/day/11

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def renderMap(map, step):
    print('')
    print('after step', step)
    for line in map:
        print(''.join([str(c) for c in line]))

def part1(inp):
    map = [[int(c) for c in list(line)] for line in inp.splitlines()]

    totalF = 0 

    def inc(row, col, flashes):
        cnt = 0
        if (row >= 0 and row < 10 and col >= 0 and col < 10 and map[col][row] < 10):
            if (map[col][row] == 9):
                cnt += 1;
                map[col][row] = 10

                cnt += inc(row + 1, col + 1, 0)
                cnt += inc(row - 1, col - 1, 0)
                cnt += inc(row - 1, col + 1, 0)
                cnt += inc(row + 1, col - 1, 0)
                cnt += inc(row + 1, col, 0)
                cnt += inc(row - 1, col, 0)
                cnt += inc(row, col + 1, 0)
                cnt += inc(row, col - 1, 0)
            else:
                map[col][row] += 1

        return flashes + cnt


    for step in range(0, 100):
        for row in range(0, 10):
            for col in range(0, 10):
                totalF += inc(row, col, 0)

        for row in range(0, 10):
            for col in range(0, 10):
                if map[row][col] == 10: 
                    map[row][col] = 0

    return totalF

def part2(inp):
    map = [[int(c) for c in list(line)] for line in inp.splitlines()]

    def inc(row, col, flashes):
        cnt = 0
        if (row >= 0 and row < 10 and col >= 0 and col < 10 and map[col][row] < 10):
            if (map[col][row] == 9):
                cnt += 1;
                map[col][row] = 10

                cnt += inc(row + 1, col + 1, 0)
                cnt += inc(row - 1, col - 1, 0)
                cnt += inc(row - 1, col + 1, 0)
                cnt += inc(row + 1, col - 1, 0)
                cnt += inc(row + 1, col, 0)
                cnt += inc(row - 1, col, 0)
                cnt += inc(row, col + 1, 0)
                cnt += inc(row, col - 1, 0)
            else:
                map[col][row] += 1

        return flashes + cnt

    step = 0
    while True:
        step += 1

        flashes = 0
        for row in range(0, 10):
            for col in range(0, 10):
                flashes += inc(row, col, 0)

        if flashes == 100:
            return step

        for row in range(0, 10):
            for col in range(0, 10):
                if map[row][col] == 10: 
                    map[row][col] = 0

print('test', part1(testInp), [1656])
print('part1', part1(input), [1729])

print('test', part2(testInp), [195])
print('part2', part2(input), [237]) 






