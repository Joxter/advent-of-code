import os
import time
from pathlib import Path


def run_day(year, day, iters=1):
    """
    Run Advent of Code solutions with automatic input loading and answer checking.

    Usage:
        run_day(2016, 1).parts([[1, part1], [2, part2]]).end()

    Or with labels:
        run_day(2016, 1).parts([[1, part1, "fast"], [2, part2]]).end()

    Or individually:
        run_day(2016, 1).part(1, part1).part(2, part2).end()
    """
    DD = str(day).zfill(2)

    # Get the script's directory to build relative paths
    script_dir = Path(__file__).parent

    # Read input file
    input_path = script_dir / "inputs" / str(year) / f"day{DD}.txt"
    if not input_path.exists():
        raise FileNotFoundError(
            f"Input file for {year}/{day} not found. Too soon for {day} december {year}?"
        )

    # Read expected answers
    ans_folder = script_dir / str(year) / "answers"
    part1_ans = _file_to_string_or_empty(ans_folder / f"day{DD}-part1.txt")
    part2_ans = _file_to_string_or_empty(ans_folder / f"day{DD}-part2.txt")

    # Read and prepare input data
    with open(input_path) as f:
        input_data = f.read().strip()

    print(f"🎄{year}/{DD} https://adventofcode.com/{year}/day/{day}")
    if iters > 1:
        print("                    best      total")

    answers = {}

    class Runner:
        def part(self, part_num, fn, label=""):
            answer = part1_ans if part_num == 1 else part2_ans

            res = None
            min_time = float('inf')
            total_start = time.time()

            for _ in range(iters):
                start = time.time()
                res = str(fn(input_data))
                elapsed = time.time() - start
                min_time = min(min_time, elapsed)

            total_time = time.time() - total_start

            time_str = _format_time(min_time)
            total_time_str = f" [{_format_time(total_time)}]" if iters > 1 else ""

            if not answer:
                print(f"      ❓  part{part_num} {res} [{time_str}] {label}")
                answers[part_num] = res
            else:
                if res == answer:
                    print(f"      ✅  part{part_num} [{time_str}]{total_time_str} {label}")
                else:
                    print(f"      ❌  part{part_num} [{time_str}]{total_time_str} {label}")
                    print(f"        expected: {answer}")
                    print(f"        actual:   {res}")

            return self

        def parts(self, parts_list):
            for part_info in parts_list:
                if len(part_info) == 2:
                    self.part(part_info[0], part_info[1])
                elif len(part_info) == 3:
                    self.part(part_info[0], part_info[1], part_info[2])
            return self

        def end(self, save_correct_ans=False):
            if not save_correct_ans:
                return

            ans_folder.mkdir(parents=True, exist_ok=True)

            if not part1_ans and 1 in answers:
                (ans_folder / f"day{DD}-part1.txt").write_text(answers[1])

            if not part2_ans and 2 in answers:
                (ans_folder / f"day{DD}-part2.txt").write_text(answers[2])

    return Runner()


def _file_to_string_or_empty(path):
    try:
        return path.read_text().strip()
    except FileNotFoundError:
        return ""


def _format_time(time_sec):
    time_msec = int(time_sec * 1000)
    minutes = time_msec // 60000
    seconds = (time_msec // 1000) % 60
    msec = time_msec % 1000
    return f"{minutes}:{seconds:02d}.{msec:03d}"
