package main

import (
	"fmt"
	"math/bits"
	"os"
	"strings"
)

func main() {
	inp, _ := os.ReadFile("../inputs/d06/input.txt")

	res1 := part1(string(inp))
	fmt.Println("part1", res1, res1 == 6273)

	res2 := part2(string(inp))
	fmt.Println("part2", res2, res2 == 3254)
}

func part1(inp string) int {
	total := 0

	for _, group := range strings.Split(inp, "\n\n") {
		mask := 0

		for _, ans := range strings.Split(group, "\n") {
			mask = mask | getMask(ans)
		}

		total += bits.OnesCount(uint(mask))
	}

	return total
}

func part2(inp string) int {
	total := 0

	for _, group := range strings.Split(inp, "\n\n") {
		mask := 1<<27 - 1

		for _, ans := range strings.Split(group, "\n") {
			mask = mask & getMask(ans)
		}

		total += bits.OnesCount(uint(mask))
	}

	return total
}

func getMask(ans string) int {
	mask := 0

	for _, ch := range []byte(ans) {
		mask = mask | 1<<(ch-byte('a'))
	}

	return mask
}
