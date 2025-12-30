from aoc import run_day, ints


def part1(inp: str):
    print(inp.split("\n"))

    state = "out"
    cnt = 0
    i = 0
    acc = ""

    while i < len(inp):
        ch = inp[i]
        if ch == "(":
            state = "in"
        elif ch == ")":
            state = "out"

            [s, times] = ints(acc)
            cnt += s * times - len(acc)

            i += s
            acc = ""
        else:
            if state == "in":
                acc += ch
            cnt += 1

        i += 1

    return cnt


def part2(inp: str):
    state = "out"
    cnt = 0
    i = 0
    acc = ""

    while i < len(inp):
        ch = inp[i]
        if ch == "(":
            state = "in"
        elif ch == ")":
            state = "out"

            [s, times] = ints(acc)
            aaa = part2(inp[i + 1 : i + 1 + s]) * times
            cnt += aaa

            i += s
            acc = ""
        else:
            if state == "in":
                acc += ch
            else:
                cnt += 1

        i += 1

    return cnt


run_day(2016, 9).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
