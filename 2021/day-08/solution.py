import re

# https://adventofcode.com/2021/day/8

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def part1(inp):
    digits = [l.split(' | ') for l in inp.splitlines()]

    cnt = 0
    for [l, right] in digits:
        for d in right.split():
            if (len(d) in [2, 3, 4, 7]):
                cnt += 1

    return cnt

def part2(inp):
    digits = [[l.split(' | ')[0].split(), l.split(' | ')[1].split()] for l in inp.splitlines()]

    def getLen(words, l):
        for w in words:
            if len(w) == l:
                return w

    def getAllLen(words, l):
        return [w for w in words if len(w) == l]

    result = 0

    for [left, right] in digits:
        nums = [''] * 10
        nums[1] = getLen(left, 2)
        nums[4] = getLen(left, 4)
        nums[7] = getLen(left, 3)
        nums[8] = getLen(left, 7)

        cf = set(getLen(left, 3)) & set(getLen(left, 2))
        a = set(getLen(left, 3)) - set(getLen(left, 2))
        c = None

        for sixW in getAllLen(left, 6):
            if (len(set(sixW) & cf) == 1):
                c = set(list(set(sixW) & cf)[0])
                nums[6] = sixW
                break
        f = cf - c

        five1, five2, five3 = getAllLen(left, 5)

        common5 = set(five1) & set(five2) & set(five3)

        dg = common5 - a

        for fiveW in [five1, five2, five3]:
            if len(set(fiveW) & cf) == 2:
                nums[3] = fiveW
            if len(set(fiveW) & c) == 0:
                nums[2] = fiveW
            if len(set(fiveW) & f) == 0:
                nums[5] = fiveW

        for sixW in getAllLen(left, 6):
            if (len(set(sixW) & dg) == 1):
                nums[0] = sixW

        for w in left:
            if (w not in nums):
                nums[9] = w

        code = 0
        for w in right:
            for n in nums:
                ww = ''.join(sorted(list(w)))
                nn = ''.join(sorted(list(n)))
                if (ww == nn):
                    code = code * 10 + nums.index(n)

        result += code


    return result

print('test', part1(testInp), [26])
print('part1', part1(input), [543])

print('test', part2(testInp), [61229])
print('part2', part2(input), [994266])

# len 2 -> 1
# len 3 -> 7
# len 4 -> 4
# len 5 -> 2 3 5
# len 6 -> 0 6 9
# len 7 -> 8
"""
 a
b c
 d
e f
 g
"""

# 3 chars - 2 char = find 'a'
# берем цифры из 6 chars, смотрим какого нет из (2 char) оно = 'c', остальное из char2 = 'f'
#      та 6 chars цифра без 'c' -> это 6

# берем все общие элементы среди 5 chars - получаем 'a' 'd' 'g' -> вычитваем найденное 'a' получаем 'd' 'g',
#       5 chars цифра с 'с' 'f' -> это 3
#       5 chars цифра без 'c'   -> это 5
#       5 chars цифра без 'f'   -> это 2
# берем цифры из 6 chars, та что без 'd' или 'g' -> это 0
#                                остальная цифра -> это 9
