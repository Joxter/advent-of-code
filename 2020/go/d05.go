package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	inp, _ := os.ReadFile("../inputs/d05/input.txt")

	res1 := part1(string(inp))
	fmt.Println("part1", res1, res1 == 858)

	res2 := part2(string(inp))
	fmt.Println("part2", res2, res2 == 557)
}

func part1(inp string) int {
	max := 0

	for _, code := range strings.Split(inp, "\n") {
		decoded := getSeatId(code)

		if decoded > max {
			max = decoded
		}
	}

	return max
}

func part2(inp string) int {
	total := 0
	min := 1000
	max := 0
	n := 0

	for _, code := range strings.Split(inp, "\n") {
		n++

		decoded := getSeatId(code)
		if decoded > max {
			max = decoded
		}
		if decoded < min {
			min = decoded
		}
		total += decoded
	}

	sum := ((float64(n + 1)) / 2.0) * float64(min+max)

	return int(sum) - total
}

func getSeatId(code string) int {
	row := string(code[0:7])
	col := string(code[7:])

	row = strings.Replace(row, "F", "0", -1)
	row = strings.Replace(row, "B", "1", -1)

	col = strings.Replace(col, "R", "1", -1)
	col = strings.Replace(col, "L", "0", -1)

	rowN, _ := strconv.ParseInt(row, 2, 32)
	colN, _ := strconv.ParseInt(col, 2, 32)

	return int(rowN)*8 + int(colN)
}
