
# https://adventofcode.com/2021/day/21

input = open('../inputs/d21/input.txt', 'r').read()
testInp = open('../inputs/d21/test.txt', 'r').read()

def part1(inp):
    [p1Position, p2Position] = [int(p.split(' ')[-1]) - 1 for p in inp.splitlines()]

    p1Score = 0
    p2Score = 0
    dice = 0
    diceCnt = 0
    isP1 = True

    while True:
        move = 0
        for i in range(3):
            if dice == 100:
                dice = 0

            dice += 1
            diceCnt += 1
            move += dice

        if isP1:
            p1Position = (move + p1Position) % 10
            p1Score += p1Position + 1
        else:
            p2Position = (move + p2Position) % 10
            p2Score += p2Position + 1

        if p1Score >= 1000:
            return p2Score * diceCnt
        elif p2Score >= 1000:
            return p1Score * diceCnt

        isP1 = not isP1

diceCnt = [(3,1), (4,3), (5,6), (6,7), (7,6), (8,3), (9,1)]

win1 = 0
win2 = 0
winScore = 21

def dfs(p1Score, p2Score, p1Position, p2Position, isP1, move, cnt):
    global win1
    global win2

    if isP1:
        p1Position = (move + p1Position) % 10
        p1Score += p1Position + 1
    else:
        p2Position = (move + p2Position) % 10
        p2Score += p2Position + 1

    if p1Score >= winScore:
        win1 += cnt
        return
    elif p2Score >= winScore:
        win2 += cnt
        return

    for (move_, cnt_) in diceCnt:
        dfs(p1Score, p2Score, p1Position, p2Position, not isP1, move_, cnt * cnt_)

def part2(inp):
    global win1
    global win2
    win1 = 0
    win2 = 0

    [p1Position, p2Position] = [int(p.split(' ')[-1]) - 1 for p in inp.splitlines()]

    for (move, cnt) in diceCnt:
        dfs(0, 0, p1Position, p2Position, True, move, cnt)

    return max([win1, win2])

print('test', part1(testInp) == 739785, [739785])
print('part1', part1(input) == 742257, [742257])

print('test', part2(testInp) == 444356092776315, [444356092776315])
print('part2', part2(input) == 93726416205179, [93726416205179])