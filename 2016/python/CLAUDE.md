# Advent of Code Solutions

This repository contains Advent of Code solutions across multiple years.

## Code Style for AoC

**Keep it simple and fast to write:**
- Short variable names are okay (n, s, x, result, etc.)
- Code duplication is fine - no need to extract functions
- Prioritize clarity and simplicity over production best practices
- Focus on getting the correct answer quickly

## Python Best Practices to Follow

Use Pythonic idioms that make code clearer:
- `[None] * 8` instead of typing 8 values manually
- `x in "abc"` instead of `"abc".find(x) > -1`
- `s.isdigit()` instead of `s in "0123456789"`
- `None in my_list` instead of `my_list.count(None) > 0`
- F-strings: `f"{x}{y}"` instead of `x + str(y)`

## What to Avoid

- Don't compute expensive operations twice (cache hash results, etc.)
- Remove unused imports
- Avoid shadowing built-ins (`str`, `hash`, `list`) - can cause bugs

## Project Structure

- `YYYY/python/dayXX.py` - Python solutions
- Solutions should work standalone and be self-contained
