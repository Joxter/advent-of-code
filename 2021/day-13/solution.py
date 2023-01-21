
# https://adventofcode.com/2021/day/13

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def parse(inp):
    coords, folds_ = inp.split('\n\n')
    # x y (right, down)
    # fold the paper up (for horizontal y=... lines) 
    #              left (for vertical   x=... lines)

    grid = set()
    for l in coords.splitlines():
        x, y = l.split(',')
        grid.add((int(x), int(y)))
    
    folds = []
    for l in folds_.splitlines():
        if l[11] == 'x':
            folds.append(('left', int(l[13:])))
        if l[11] == 'y':
            folds.append(('up', int(l[13:])))

    return grid, folds

def fold(grid, f):
    res = set()
    direction, n = f

    if direction == 'left':
        for x, y in grid:
            if x > n:
                res.add((n - (x - n), y))
            else:
                res.add((x, y))
    else:
        for x, y in grid:
            if y > n:
                res.add((x, n - (y - n)))
            else:
                res.add((x, y))

    return res
        

def part1(inp):
    grid, folds = parse(inp)

    one = fold(grid, folds[0])

    return len(one)

def render(grid):
    res = '';

    left = min([x for x, y in grid])
    right = max([x for x, y in grid])

    top = min([y for x, y in grid])
    bottom = max([y for x, y in grid])


    for i in range(top, bottom + 1):
        for j in range(left, right + 1):
            if (j, i) in grid:
                res += '#'
            else:
                res += ' '
        res += '\n'

    print(res)


def part2(inp):
    grid, folds = parse(inp)

    for f in folds:
        grid = fold(grid, f)

    render(grid)

    return None

print('test', part1(testInp), [17])
print('part1', part1(input), [827])

print('test', part2(testInp), [])
print('part2', part2(input), [])
