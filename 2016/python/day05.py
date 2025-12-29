import hashlib

from aoc import run_day


def part1(inp):
    n = 0
    result = ""

    for n_ in range(8):
        while (
            not hashlib.md5((f"{inp}{n}").encode("utf-8"))
            .hexdigest()
            .startswith("00000")
        ):
            n += 1

        result += hashlib.md5((f"{inp}{n}").encode("utf-8")).hexdigest()[5]
        n += 1

    return result


def part2(inp):
    n = 0
    result = [None] * 8

    while None in result:
        while (
            not hashlib.md5((f"{inp}{n}").encode("utf-8"))
            .hexdigest()
            .startswith("00000")
        ):
            n += 1

        h = hashlib.md5((f"{inp}{n}").encode("utf-8")).hexdigest()

        position = h[5]
        char = h[6]

        if position in "01234567" and result[int(position)] is None:
            result[int(position)] = char

        n += 1

    return "".join(result)


run_day(2016, 5).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end(1)
