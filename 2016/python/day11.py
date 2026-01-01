from aoc import run_day, join


def get_ones(n: int):
    arr = []
    for i, ch in enumerate("{0:10b}".format(n)):
        if ch == "1":
            arr.append(9 - i)

    return arr


def get_chip(n: int):
    return n & 0b00000_11111


def get_gen(n: int):
    return (n >> 5) & 0b00000_11111


def print_floors(floors: list[int]):
    for floor in floors:
        print(f"{floor:10b}")


def rev_5(n: int):
    return ~n & 0b11111


def is_valid(floors: list[int]):
    for floor in floors:
        if not _is_valid(floor):
            return False

    return True


def _is_valid(floor: int):
    chip = get_chip(floor)
    gen = get_gen(floor)

    for i in range(0, 5):
        has_chip = (1 << i) & chip
        has_gen = (1 << i) & gen
        has_wrong_gen = rev_5(1 << i) & gen

        if (has_chip and not has_gen) and has_wrong_gen:
            return False

    return True


# print("{0:10b}".format(0b01010))
# print("{0:10b}".format(rev_5(0b01010)))
# print(is_valid(0b00010_00010))
# print(is_valid(0b00011_00010))
# print(is_valid(0b00001_00010))
# print(is_valid(0b01000_01010))
# print(is_valid([0b0]))


def part1(inp: str):
    """
    The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
    The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
    The third floor contains a thulium-compatible microchip.
    The fourth floor contains nothing relevant.
    """
    # strontium 11, plutonium 11, thulium 23, ruthenium22, curium22
    # generator, chip
    # gen = [1, 1, 2, 2, 2]
    # chip = [1, 1, 3, 2, 2]
    el = 1

    # floors = [
    #     0,
    #     0b11000_11000,  # 1
    #     0b00111_00011,  # 2
    #     0b00000_00100,  # 3
    #     0b00000_00000,  # 4
    # ]

    floors = [
        0,
        0b00000_00011,  # 1
        0b00010_00000,  # 2
        0b00001_00000,  # 3
        0b00000_00000,  # 4
    ]

    # limit = 100_000_000
    limit = 10000000_000_000
    q = [(floors, el, 0)]
    visited = set()

    while limit > 0 and len(q) > 0:
        limit -= 1

        floors, el, steps = q.pop(0)

        if limit % 100_000 == 0:
            print("----", limit)
            print(len(q), len(visited))
            print_floors(floors)
            print((join(",", floors), el, steps))

        # if floors[4] == 0b11111_11111:
        #     return steps
        if floors[4] == 0b00011_00011:
            return steps

        if not is_valid(floors):
            continue

        if (join(",", floors), el, steps) in visited:
            continue

        visited.add((join(",", floors), el, steps))

        # if el < 4:
        #     q.append((floors, el + 1, steps + 1))
        # if el > 1:
        #     q.append((floors, el - 1, steps + 1))

        f = floors[el]

        # print(f"    {f:10b}", limit)
        # print_floors(floors)

        if f != 0:
            ones = get_ones(f)
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


def go_up(it, n):
    if it[n] < 4:
        a = add[n]
        return (
            it[0] + a[0],
            it[1] + a[1],
            it[2] + a[2],
            it[3] + a[3],
            it[4] + a[4],
        )

    return None


def go_down(it, n):
    if it[n] > 0:
        a = add[n]
        return (
            it[0] - a[0],
            it[1] - a[1],
            it[2] - a[2],
            it[3] - a[3],
            it[4] - a[4],
        )

    return None


def all_4(it):
    return it[0] == 4 and it[1] == 4 and it[2] == 4 and it[3] == 4 and it[4] == 4


def part2(inp: str):
    return 123


run_day(2016, 11).parts(
    [
        [1, part1],
        # [2, part2],
    ]
).end()
