package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	inp, _ := os.ReadFile("../inputs/d07/input.txt")

	res1 := part1(string(inp))
	fmt.Println("part1", res1, res1 == 177)

	res2 := part2(string(inp))
	fmt.Println("part2", res2, res2 == 34988)
}

func part1(inp string) int {
	rules := make(map[string]map[string]int)

	for _, line := range strings.Split(inp, "\n") {
		parentBag, innerBags := parseLine(line)

		for _, innerBag := range innerBags {
			_, ok := rules[innerBag.Name]
			if !ok {
				rules[innerBag.Name] = make(map[string]int)
			}

			rules[innerBag.Name][parentBag] = innerBag.Count
		}
	}

	canContains := keys(rules["shiny gold"])
	result := make(map[string]bool)
	var name string

	for len(canContains) > 0 {
		canContains, name = slicePop(canContains)
		result[name] = true

		newItems, has := rules[name]
		if has {
			canContains = append(canContains, keys(newItems)...)
		}
	}

	return len(result)
}

func slicePop[T any](s []T) ([]T, T) {
	i := len(s) - 1
	elem := s[i]
	s = append(s[:i], s[i+1:]...)
	return s, elem
}

func keys(m map[string]int) []string {
	var keys []string

	for key := range m {
		keys = append(keys, key)
	}

	return keys
}

func part2(inp string) int {
	rules := make(map[string]map[string]int)

	for _, line := range strings.Split(inp, "\n") {
		parentBag, innerBags := parseLine(line)

		for _, innerBag := range innerBags {
			_, ok := rules[parentBag]
			if !ok {
				rules[parentBag] = make(map[string]int)
			}

			rules[parentBag][innerBag.Name] = innerBag.Count
		}
	}

	return countBags(rules, "shiny gold")
}

func countBags(rules map[string]map[string]int, name string) int {
	sum := 0

	for newName, cnt := range rules[name] {
		sum += countBags(rules, newName)*cnt + cnt
	}

	return sum
}

type BagCnt struct {
	Name  string
	Count int
}

func parseLine(line string) (string, []BagCnt) {
	bagNameRegex := regexp.MustCompile(`(\w+ \w+) bags contain.+`)
	innerBagRegex := regexp.MustCompile(`((\d+) (\w+ \w+)) bag?`)

	// matches :=
	parentBag := bagNameRegex.FindStringSubmatch(line)[1]

	var innerBags []BagCnt

	for _, match := range innerBagRegex.FindAllStringSubmatch(line, -1) {
		count, _ := strconv.Atoi(match[2])
		innerBags = append(innerBags, BagCnt{match[3], count})
	}

	return parentBag, innerBags
}
