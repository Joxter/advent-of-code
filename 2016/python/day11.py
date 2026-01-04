from aoc import run_day, join


def get_ones5(n: int):
    arr = []
    i = 0
    while n:
        if n & 1:
            arr.append(1 << i)
        n = n >> 1
        i += 1

    return arr


def get_ones7(n: int):
    return get_ones5(n)


def print_floors(floors: list[int]):
    for floor in floors[1:]:
        print(f"{floor:014b}")


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
    chip = floor & 0b11111
    gen = (floor >> 5) & 0b11111

    return gen == 0 or chip & ~gen == 0


def _is_valid7(floor: int):
    chip = floor & 0b1111111
    gen = (floor >> 7) & 0b1111111

    return gen == 0 or chip & ~gen == 0


def part1(inp: str):
    el = 1
    floors = [
        0,
        0b11000_11000,  # 1
        0b00111_00011,  # 2
        0b00000_00100,  # 3
        0b00000_00000,  # 4
    ]

    q = [(floors, el, 0)]
    visited = set()

    while len(q) > 0:
        floors, el, steps = q.pop(0)

        if floors[4] == 0b11111_11111:
            return steps

        kk = f"{floors[1]},{floors[2]},{floors[3]},{floors[4]}"
        if (kk, el) in visited:
            continue
        visited.add((kk, el))

        ones = get_ones5(floors[el])
        for one in ones:
            # up
            if el < 4:
                new_f = floors.copy()
                new_f[el] = one ^ new_f[el]
                new_f[el + 1] = one | new_f[el + 1]

                if _is_valid5(new_f[el]) and _is_valid5(new_f[el + 1]):
                    q.append((new_f, el + 1, steps + 1))

            # down
            if el > 1 and floors[el - 1]:
                new_f = floors.copy()
                new_f[el] = one ^ new_f[el]
                new_f[el - 1] = one | new_f[el - 1]

                if _is_valid5(new_f[el]) and _is_valid5(new_f[el - 1]):
                    q.append((new_f, el - 1, steps + 1))

        for a in range(len(ones) - 1):
            for b in range(a + 1, len(ones)):
                two = ones[a] | ones[b]

                # up
                if el < 4:
                    new_f = floors.copy()
                    new_f[el] = two ^ new_f[el]
                    new_f[el + 1] = two | new_f[el + 1]

                    if _is_valid5(new_f[el]) and _is_valid5(new_f[el + 1]):
                        q.append((new_f, el + 1, steps + 1))

                # down
                if el > 1 and floors[el - 1]:
                    new_f = floors.copy()
                    new_f[el] = two ^ new_f[el]
                    new_f[el - 1] = two | new_f[el - 1]

                    if _is_valid5(new_f[el]) and _is_valid5(new_f[el - 1]):
                        q.append((new_f, el - 1, steps + 1))

    return None


def part2(inp: str):
    el = 1
    floors = [
        0,
        0b1111000_1111000,  # 1
        0b0000111_0000011,  # 2
        0b0000000_0000100,  # 3
        0b0000000_0000000,  # 4
    ]

    q = [(floors, el, 0)]
    visited = set()

    while len(q) > 0:
        floors, el, steps = q.pop(0)

        if floors[1] and steps > 15:
            continue

        if floors[4] == 0b1111111_1111111:
            return steps

        kk = f"{floors[1]},{floors[2]},{floors[3]},{floors[4]}"
        if (kk, el) in visited:
            continue
        visited.add((kk, el))

        f = floors[el]

        if f == 0:
            continue

        ones = get_ones7(f)
        for one in ones:
            # up
            if el < 4:
                new_f = floors.copy()
                new_f[el] = one ^ new_f[el]
                new_f[el + 1] = one | new_f[el + 1]

                if _is_valid7(new_f[el]) and _is_valid7(new_f[el + 1]):
                    q.append((new_f, el + 1, steps + 1))

            # down
            if el > 1 and floors[el - 1]:
                new_f = floors.copy()
                new_f[el] = one ^ new_f[el]
                new_f[el - 1] = one | new_f[el - 1]

                if _is_valid7(new_f[el]) and _is_valid7(new_f[el - 1]):
                    q.append((new_f, el - 1, steps + 1))

        for a in range(len(ones) - 1):
            for b in range(a + 1, len(ones)):
                two = ones[a] | ones[b]

                # up
                if el < 4:
                    new_f = floors.copy()
                    new_f[el] = two ^ new_f[el]
                    new_f[el + 1] = two | new_f[el + 1]

                    if _is_valid7(new_f[el]) and _is_valid7(new_f[el + 1]):
                        q.append((new_f, el + 1, steps + 1))

                # down
                if el > 1 and floors[el - 1]:
                    new_f = floors.copy()
                    new_f[el] = two ^ new_f[el]
                    new_f[el - 1] = two | new_f[el - 1]

                    if _is_valid7(new_f[el]) and _is_valid7(new_f[el - 1]):
                        q.append((new_f, el - 1, steps + 1))

    return None


def get_moves(items):
    moves = 0
    while items[-1] != sum(items):
        lowest_floor = 0
        while items[lowest_floor] == 0:
            lowest_floor += 1
        moves += 2 * (items[lowest_floor] - 1) - 1
        items[lowest_floor + 1] += items[lowest_floor]
        items[lowest_floor] = 0
    return moves


def part1_reddit(inp: str):
    return get_moves([line.count(",") + 1 for line in inp.split("\n")])


def part2_reddit(inp: str):
    items = [line.count(",") + 1 for line in inp.split("\n")]
    items[0] += 4
    return get_moves(items)


run_day(2016, 11).parts(
    [
        # [1, part1],  # 5 sec     -> 3.7 sec
        # [2, part2],  # 2:40 min  -> 2:30 sec
        [1, part1_reddit],  # instant
        [2, part2_reddit],  # instant
    ]
).end()
