package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	inp, _ := os.ReadFile("../inputs/d01/input.txt")

	res1 := part1(string(inp))
	fmt.Println("part1", res1, res1 == 1020036)

	res2 := part2(string(inp))
	fmt.Println("part2", res2, res2 == 286977330)
}

func part1(inp string) int {
	rawNums := strings.Split(inp, "\n")

	m := make(map[int]int)
	for _, it := range rawNums {
		num, _ := strconv.Atoi(it)
		n, has := m[2020-num]
		if has {
			return num * n
		}
		m[num] = num
	}

	return 0
}

func part2(inp string) int {
	rawNums := strings.Split(inp, "\n")

	m := make(map[int]int)
	var nums []int
	for _, it := range rawNums {
		num, _ := strconv.Atoi(it)
		m[num] = num
		nums = append(nums, num)
	}

	for i := 0; i < len(m)-2; i++ {
		for j := i + 1; j < len(m)-1; j++ {
			n, has := m[2020-nums[i]-nums[j]]
			if has {
				return n * nums[i] * nums[j]
			}
		}
	}

	return 0
}
