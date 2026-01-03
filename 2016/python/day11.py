from aoc import run_day, join


def get_ones5(n: int):
    arr = []
    i = 0
    while n:
        if n & 1:
            arr.append(i)
        n = n >> 1
        i += 1

    return arr


def get_ones7(n: int):
    return get_ones5(n)


def get_chip5(n: int):
    return n & 0b00000_11111


def get_chip7(n: int):
    return n & 0b0000000_1111111


def get_gen5(n: int):
    return (n >> 5) & 0b00000_11111


def get_gen7(n: int):
    return (n >> 7) & 0b0000000_1111111


def print_floors(floors: list[int]):
    for floor in floors[1:]:
        print(f"{floor:014b}")


def rev_5(n: int):
    return ~n & 0b11111


def rev_7(n: int):
    return ~n & 0b1111111


def is_valid5(floors: list[int]):
    for floor in floors:
        if not _is_valid5(floor):
            return False

    return True


def is_valid7(floors: list[int]):
    for floor in floors:
        if not _is_valid7(floor):
            return False

    return True


def _is_valid5(floor: int):
    chip = get_chip5(floor)
    gen = get_gen5(floor)

    for i in range(0, 5):
        has_chip = (1 << i) & chip
        has_gen = (1 << i) & gen
        has_wrong_gen = rev_5(1 << i) & gen

        if (has_chip and not has_gen) and has_wrong_gen:
            return False

    return True


def _is_valid7(floor: int):
    chip = get_chip7(floor)
    gen = get_gen7(floor)

    for i in range(0, 7):
        has_chip = (1 << i) & chip
        has_gen = (1 << i) & gen
        has_wrong_gen = rev_7(1 << i) & gen

        if (has_chip and not has_gen) and has_wrong_gen:
            return False

    return True


def part1(inp: str):
    """
    The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
    The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
    The third floor contains a thulium-compatible microchip.
    The fourth floor contains nothing relevant.
    """
    el = 1

    floors = [
        0,
        0b11000_11000,  # 1
        0b00111_00011,  # 2
        0b00000_00100,  # 3
        0b00000_00000,  # 4
    ]

    # floors = [
    #     0,
    #     0b00000_00011,  # 1
    #     0b00010_00000,  # 2
    #     0b00001_00000,  # 3
    #     0b00000_00000,  # 4
    # ]

    # limit = 100_000_000
    limit = 10000000_000_000
    q = [(floors, el, 0)]
    visited = set()

    while limit > 0 and len(q) > 0:
        limit -= 1

        floors, el, steps = q.pop(0)

        if limit % 100_000 == 0:
            print(len(q), len(visited))
            print_floors(floors)
            print((join(",", floors), el, steps))

        if floors[4] == 0b11111_11111:
            return steps

        if not is_valid5(floors):
            continue

        kk = f"{floors[1]},{floors[2]},{floors[3]},{floors[4]}"
        if (kk, el) in visited:
            continue

        visited.add((kk, el))

        f = floors[el]

        # print(f"    {f:10b}", limit)
        # print_floors(floors)

        if f != 0:
            ones = get_ones5(f)
            # print(ones)
            for one in ones:
                # up
                if el < 4:
                    new_f = floors.copy()
                    new_f[el] = (1 << one) ^ new_f[el]
                    new_f[el + 1] = (1 << one) | new_f[el + 1]

                    q.append((new_f, el + 1, steps + 1))

                # down
                if el > 1:
                    new_f = floors.copy()
                    new_f[el] = (1 << one) ^ new_f[el]
                    new_f[el - 1] = (1 << one) | new_f[el - 1]

                    q.append((new_f, el - 1, steps + 1))

            # continue

            for a in range(len(ones) - 1):
                for b in range(a + 1, len(ones)):
                    two = (1 << ones[a]) | (1 << ones[b])

                    # up
                    if el < 4:
                        new_f = floors.copy()
                        new_f[el] = two ^ new_f[el]
                        new_f[el + 1] = two | new_f[el + 1]

                        q.append((new_f, el + 1, steps + 1))

                    # down
                    if el > 1:
                        new_f = floors.copy()
                        new_f[el] = two ^ new_f[el]
                        new_f[el - 1] = two | new_f[el - 1]

                        q.append((new_f, el - 1, steps + 1))

    return None


def part2(inp: str):
    """
    The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
    The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
    The third floor contains a thulium-compatible microchip.
    The fourth floor contains nothing relevant.
    """
    el = 1

    floors = [
        0,
        0b1111000_1111000,  # 1
        0b0000111_0000011,  # 2
        0b0000000_0000100,  # 3
        0b0000000_0000000,  # 4
    ]

    limit = 10000000_000_000
    q = [(floors, el, 0)]
    visited = set()

    while limit > 0 and len(q) > 0:
        limit -= 1

        floors, el, steps = q.pop(0)

        if floors[1] and steps > 15:
            continue

        if not is_valid7(floors):
            continue

        if limit % 50_000 == 0:
            print(len(q), len(visited))
            print_floors(floors)
            print((join(",", floors), el, steps))

        if floors[4] == 0b1111111_1111111:
            return steps

        kk = f"{floors[1]},{floors[2]},{floors[3]},{floors[4]}"
        if (kk, el) in visited:
            continue
        visited.add((kk, el))

        f = floors[el]

        if f != 0:
            ones = get_ones7(f)
            # print(ones)
            for one in ones:
                # up
                if el < 4:
                    new_f = floors.copy()
                    new_f[el] = (1 << one) ^ new_f[el]
                    new_f[el + 1] = (1 << one) | new_f[el + 1]

                    q.append((new_f, el + 1, steps + 1))

                # down
                if el > 1:
                    new_f = floors.copy()
                    new_f[el] = (1 << one) ^ new_f[el]
                    new_f[el - 1] = (1 << one) | new_f[el - 1]

                    q.append((new_f, el - 1, steps + 1))

            # continue

            for a in range(len(ones) - 1):
                for b in range(a + 1, len(ones)):
                    two = (1 << ones[a]) | (1 << ones[b])

                    # up
                    if el < 4:
                        new_f = floors.copy()
                        new_f[el] = two ^ new_f[el]
                        new_f[el + 1] = two | new_f[el + 1]

                        q.append((new_f, el + 1, steps + 1))

                    # down
                    if el > 1:
                        new_f = floors.copy()
                        new_f[el] = two ^ new_f[el]
                        new_f[el - 1] = two | new_f[el - 1]

                        q.append((new_f, el - 1, steps + 1))

    return None


run_day(2016, 11).parts(
    [
        [1, part1],
        [2, part2],
    ]
).end(1)
