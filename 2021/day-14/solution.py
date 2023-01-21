
# https://adventofcode.com/2021/day/14

input = open('./input.txt', 'r').read()
testInp = open('./test.txt', 'r').read()

def parse(inp):
    pattern, pairs_ = inp.split('\n\n') 

    pairs = {}
    for p in pairs_.splitlines():
        k, v = p.split(' -> ')
        pairs[k] = v

    return list(pattern), pairs

def part1(inp):
    pattern, pairs = parse(inp)

    def step(pattern, pairs):
        res = [pattern[0]]

        for i in range(1, len(pattern)):
            key = pattern[i - 1] + pattern[i]
            if key in pairs:
                res.append(pairs[key])
                res.append(pattern[i])
            else:
                res.append(pattern[i])

        return res 

    for i in range(1, 11):
        pattern = step(pattern, pairs)

    cnts = {}

    for ch in pattern:
        if ch not in cnts:
            cnts[ch] = 0
        cnts[ch] += 1

    return max(cnts.values()) - min(cnts.values())

def part2(inp):
    pattern, templatePairs = parse(inp)

    pairs = {}
    for i in range(1, len(pattern)):
        key = pattern[i - 1] + pattern[i]
        if key not in pairs:
            pairs[key] = 0
        pairs[key] += 1

    def step(pairs, templatePairs):
        res = {};
        for p in pairs:
            if p in templatePairs and pairs[p] > 0:
                key1 = p[0] + templatePairs[p]
                key2 = templatePairs[p] + p[1]

                if key1 not in res:
                    res[key1] = 0
                res[key1] += pairs[p]

                if key2 not in res:
                    res[key2] = 0
                res[key2] += pairs[p]

        return res

    for i in range(1, 41):
        pairs = step(pairs, templatePairs)

    cnts = {}
    for p in pairs:
        if p[0] not in cnts:
            cnts[p[0]] = 0
        cnts[p[0]] += pairs[p]

    cnts[pattern[-1]] += 1

    return max(cnts.values()) - min(cnts.values())

print('test', part1(testInp), [1588])
print('part1', part1(input), [2899])

print('test', part2(testInp), [2188189693529])
print('part2', part2(input), [3528317079545])
