import re

from aoc import run_day
import hashlib


def memoize(func):
    cache = {}

    def inner(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]

    return inner


def part1(inp: str):
    @memoize
    def hash(n):
        return hashlib.md5(f"{inp}{n}".encode("utf-8")).hexdigest()

    n = 0
    keys = 0

    while True:
        while True:
            m = re.search(r"(.)\1\1", hash(n))

            n += 1
            if m:
                tri = m.group(1) * 5
                break

        for ii in range(n + 1, n + 1001):
            if tri in hash(ii):
                keys += 1

                break

        if keys == 64:
            return n - 1


def part2(inp: str):
    @memoize
    def hash(n):
        s = f"{inp}{n}"
        for _ in range(2017):
            s = hashlib.md5(s.encode("utf-8")).hexdigest()
        return s

    n = 0
    keys = 0

    while True:
        while True:
            m = re.search(r"(.)\1\1", hash(n))

            n += 1
            if m:
                tri = m.group(1) * 5
                break

        for ii in range(n + 1, n + 1001):
            if tri in hash(ii):
                keys += 1

                break

        if keys == 64:
            return n - 1


run_day(2016, 14).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end()
