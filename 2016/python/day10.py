from aoc import run_day, ints


def part1(inp: str):
    bots = [[] for _ in range(300)]
    insts = {}

    for line in inp.split("\n"):
        if line.startswith("value"):
            [val, b] = ints(line)
            bots[b].append(val)
        else:
            [b, l, h] = ints(line)
            parts = line.split(" ")
            if parts[5] == "bot":
                lo = (None, l)
            else:
                lo = (l, None)

            if parts[-2] == "bot":
                hi = (None, h)
            else:
                hi = (h, None)

            insts[b] = (lo, hi)

    while True:
        bot = -1
        for ind, b in enumerate(bots):
            if len(b) == 2:
                bot = ind

        if bot == -1:
            break

        if min(bots[bot]) == 17 and max(bots[bot]) == 61:
            return bot

        if insts[bot][0][0] is None:
            bots[insts[bot][0][1]].append(min(bots[bot]))

        if insts[bot][1][0] is None:
            bots[insts[bot][1][1]].append(max(bots[bot]))

        bots[bot] = []


def part2(inp: str):
    bots = [[] for _ in range(300)]
    outputs = [0 for _ in range(30)]
    insts = {}

    for line in inp.split("\n"):
        if line.startswith("value"):
            [val, b] = ints(line)
            bots[b].append(val)
        else:
            [b, l, h] = ints(line)
            parts = line.split(" ")
            if parts[5] == "bot":
                lo = (None, l)
            else:
                lo = (l, None)

            if parts[-2] == "bot":
                hi = (None, h)
            else:
                hi = (h, None)

            insts[b] = (lo, hi)

    while True:
        bot = -1
        for ind, b in enumerate(bots):
            if len(b) == 2:
                bot = ind

        if bot == -1:
            break

        if insts[bot][0][0] is None:
            bots[insts[bot][0][1]].append(min(bots[bot]))
        else:
            outputs[insts[bot][0][0]] = min(bots[bot])

        if insts[bot][1][0] is None:
            bots[insts[bot][1][1]].append(max(bots[bot]))
        else:
            outputs[insts[bot][1][0]] = max(bots[bot])

        bots[bot] = []

    return outputs[0] * outputs[1] * outputs[2]


run_day(2016, 10).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
