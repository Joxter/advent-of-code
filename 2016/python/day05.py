import hashlib

from aoc import run_day


def part1(inp):
    n = 0
    result = ""

    for n_ in range(8):
        while (
            not hashlib.md5((inp + str(n)).encode("utf-8"))
            .hexdigest()
            .startswith("00000")
        ):
            n += 1

        result += hashlib.md5((inp + str(n)).encode("utf-8")).hexdigest()[5]
        n += 1

    return result


def part2(inp):
    n = 0
    result = [
        None,
        None,
        None,
        None,
        None,
        None,
        None,
        None,
    ]

    while result.count(None) > 0:
        while (
            not hashlib.md5((inp + str(n)).encode("utf-8"))
            .hexdigest()
            .startswith("00000")
        ):
            n += 1

        h = hashlib.md5((inp + str(n)).encode("utf-8")).hexdigest()

        position = h[5]
        char = h[6]

        if "01234567".find(position) > -1 and result[int(position)] is None:
            result[int(position)] = char

        n += 1

    return "".join(result)


run_day(2016, 5).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end(1)
