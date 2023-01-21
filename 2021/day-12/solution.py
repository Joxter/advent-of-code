
# https://adventofcode.com/2021/day/12

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def parse(inp):
    map = {}

    for l in inp.splitlines():
        a, b = l.split('-')

        if a not in map:
            map[a] = list()
        if b not in map:
            map[b] = list()

        map[a].append(b)
        map[b].append(a)

    return map


def part1(inp):
    map = parse(inp)

    def dfs(map, node, path):
        if node == 'end':
            return 1

        paths = 0
        for nextName in map[node]:
            if nextName.islower() and nextName not in path or nextName.isupper():
                paths += dfs(map, nextName, path + [nextName])

        return paths

    res = dfs(map, 'start', ['start'])

    return res


def part2(inp):
    map = parse(inp)

    def dfs(map, node, path, isTwice):
        if node == 'end':
            return 1

        paths = 0
        for nextName in map[node]:
            if nextName == 'start':
                continue

            if nextName.islower():
                if nextName not in path:
                    paths += dfs(map, nextName, path + [nextName], isTwice)
                else:
                    if isTwice == False:
                        paths += dfs(map, nextName, path + [nextName], True)
            else:
                paths += dfs(map, nextName, path + [nextName], isTwice)

        return paths    

    res = dfs(map, 'start', ['start'], False)

    return res

print('test', part1(testInp), [10])
print('part1', part1(input), [3708])

print('test', part2(testInp), [36])
print('part2', part2(input), [93858])
