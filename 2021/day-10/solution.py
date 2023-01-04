
# https://adventofcode.com/2021/day/10

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    res = 0

    pairs = {'}': '{',']': '[','>': '<',')': '('}

    for line in inp.splitlines():
        stack = []
        brokeChar = None

        for char in line:
            if (char not in pairs):
                stack.append(char)
            elif (pairs[char] == stack[-1]):
                stack.pop()
            else:
                brokeChar = char
                break

        if brokeChar == ')': res += 3
        if brokeChar == ']': res += 57
        if brokeChar == '}': res += 1197
        if brokeChar == '>': res += 25137

    return res

def part2(inp):

    pairs = {'}': '{',']': '[','>': '<',')': '('}
    pairsEnd = {'{': '}','[': ']','<': '>','(': ')'}

    scores = []

    for line in inp.splitlines():
        stack = []
        brokeChar = None

        score = 0
        for char in line:
            if (char not in pairs):
                stack.append(char)
            elif (pairs[char] == stack[-1]):
                stack.pop()
            else:
                brokeChar = char
                break

        if brokeChar == None:
            for ch in [pairsEnd[char] for char in reversed(stack)]:
                if ch == ')': score = score * 5 + 1
                if ch == ']': score = score * 5 + 2
                if ch == '}': score = score * 5 + 3
                if ch == '>': score = score * 5 + 4
            scores.append(score)

    scores.sort()

    return scores[(len(scores)) // 2]

print('test', part1(testInp), [26397])
print('part1', part1(input), [388713])

print('test', part2(testInp), [288957])
print('part2', part2(input), [3539961434])
