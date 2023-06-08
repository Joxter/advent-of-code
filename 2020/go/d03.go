package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	inp, _ := os.ReadFile("../inputs/d03/input.txt")

	res1 := part1(string(inp))
	fmt.Println("part1", res1, res1 == 184)

	res2 := part2(string(inp))
	fmt.Println("part2", res2, res2 == 2431272960)
}

func part1(inp string) int {
	grid := parse(inp)
	return countTrees(grid, 3, 1)
}

func part2(inp string) int {
	grid := parse(inp)

	return countTrees(grid, 1, 1) *
		countTrees(grid, 3, 1) *
		countTrees(grid, 5, 1) *
		countTrees(grid, 7, 1) *
		countTrees(grid, 1, 2)
}

func countTrees(grid []string, right int, down int) int {
	res := 0
	offset := 0
	width := len(grid[0])

	for i := 0; i < len(grid); i += down {
		if grid[i][offset] == '#' {
			res++
		}
		offset = (offset + right) % width
	}

	return res
}

func parse(inp string) []string {
	return strings.Split(inp, "\n")
}
