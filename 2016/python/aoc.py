import re
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent.parent))
from utils import run_day


def ints(s):
    return [int(n) for n in re.split(r"\D+", s.strip())]
