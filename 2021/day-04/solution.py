
# https://adventofcode.com/2021/day/4

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    [nums, *boards] = inp.split('\n\n')

    nums = [int(n) for n in nums.split(',')]
    boards = [board.split('\n') for board in boards]

    def sprintToNums(str):
        return [int(n) for n in str.split()]

    boards = [[sprintToNums(row) for row in b] for b in boards]

    def isWin(board):
        for row in board:
            if len([n for n in row if n != None]) == 0:
                return True

        for row in zip(*board):
            if len([n for n in row if n != None]) == 0:
                return True

        return False

    def processNum(num):
        winBoard = None
        for b in boards:
            if isWin(b):
                continue

            for row in b:
                if (row.count(num) > 0):
                    row[row.index(num)] = None
            if isWin(b):
                winBoard = b

        return winBoard

    def sumRow(row):
        return sum([n for n in row if n != None])

    for num in nums:
        winBoard = processNum(num)

        if winBoard:
            boardSum = sum([sumRow(row) for row in winBoard])
            return boardSum * num

def part2(inp):
    [nums, *boards] = inp.split('\n\n')

    nums = [int(n) for n in nums.split(',')]
    boards = [board.split('\n') for board in boards]

    def sprintToNums(str):
        return [int(n) for n in str.split()]

    boards = [[sprintToNums(row) for row in b] for b in boards]

    def isWin(board):
        for row in board:
            if len([n for n in row if n != None]) == 0:
                return True

        for row in zip(*board):
            if len([n for n in row if n != None]) == 0:
                return True

        return False

    def processNum(num):
        winBoard = None
        for b in boards:
            if isWin(b):
                continue

            for row in b:
                if (row.count(num) > 0):
                    row[row.index(num)] = None
            if isWin(b):
                winBoard = b

        return winBoard

    def sumRow(row):
        return sum([n for n in row if n != None])

    result = 0
    for num in nums:
        winBoard = processNum(num)

        if winBoard:
            boardSum = sum([sumRow(row) for row in winBoard])
            result = boardSum * num

    return result

print('test1', part1(testInp), [4512])
print('part1', part1(input), [58838])

print('test2', part2(testInp), [1924])
print('part2', part2(input), [6256])
