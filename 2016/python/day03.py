input = open("../inputs/2016/day03.txt", "r").read()


def part1(inp):
    result = 0

    for l in inp.split("\n"):
        nums = [int(n) for n in l.split()]
        nums.sort()
        if nums[0] + nums[1] > nums[2]:
            result += 1

    return result


def part2(inp):
    result = 0

    grid = []
    for l in inp.split("\n"):
        grid.append([int(n) for n in l.split()])

    rows = list(zip(*grid))

    for i in range(int(len(rows[0]) / 3)):
        nums = [rows[0][i * 3], rows[0][i * 3 + 1], rows[0][i * 3 + 2]]
        nums.sort()
        if nums[0] + nums[1] > nums[2]:
            result += 1

    for i in range(int(len(rows[0]) / 3)):
        nums = [rows[1][i * 3], rows[1][i * 3 + 1], rows[1][i * 3 + 2]]
        nums.sort()
        if nums[0] + nums[1] > nums[2]:
            result += 1

    for i in range(int(len(rows[0]) / 3)):
        nums = [rows[2][i * 3], rows[2][i * 3 + 1], rows[2][i * 3 + 2]]
        nums.sort()
        if nums[0] + nums[1] > nums[2]:
            result += 1

    return result


print("part1", part1(input), [1032])
print("part2", part2(input), [1838])
