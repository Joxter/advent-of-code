package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	inp, _ := os.ReadFile("../inputs/d04/input.txt")

	res1 := part1(string(inp))
	fmt.Println("part1", res1, res1 == 219)

	res2 := part2(string(inp))
	fmt.Println("part2", res2, res2 == 127)
}

func part1(inp string) int {
	valid := 0

	for _, raw := range strings.Split(inp, "\n\n") {
		if isValidPassport1(raw) {
			valid++
		}
	}

	return valid
}

func part2(inp string) int {
	valid := 0

	for _, raw := range strings.Split(inp, "\n\n") {
		if isValidPassport2(raw) {
			valid++
		}
	}

	return valid
}

func isValidPassport1(raw string) bool {
	count := 0
	cid := false

	for _, part := range strings.Fields(raw) {
		kayAndVal := strings.Split(part, ":")

		switch kayAndVal[0] {
		case "byr":
			count++
		case "iyr":
			count++
		case "eyr":
			count++
		case "hgt":
			count++
		case "hcl":
			count++
		case "ecl":
			count++
		case "pid":
			count++
		case "cid":
			cid = true
			count++
		}
	}

	if count == 8 || count == 7 && !cid {
		return true
	}

	return false
}

func isValidPassport2(raw string) bool {
	count := 0

	for _, part := range strings.Fields(raw) {
		kayAndVal := strings.Split(part, ":")

		switch kayAndVal[0] {
		case "byr":
			// byr (Birth Year) - four digits; at least 1920 and at most 2002.
			num, err := strconv.Atoi(kayAndVal[1])
			if err == nil && num >= 1920 && num <= 2002 {
				count++
			} else {
				return false
			}
		case "iyr":
			// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
			num, err := strconv.Atoi(kayAndVal[1])
			if err == nil && num >= 2010 && num <= 2020 {
				count++
			} else {
				return false
			}
		case "eyr":
			// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
			num, err := strconv.Atoi(kayAndVal[1])
			if err == nil && num >= 2020 && num <= 2030 {
				count++
			} else {
				return false
			}
		case "hgt":
			// hgt (Height) - a number followed by either cm or in:
			//    	If cm, the number must be at least 150 and at most 193.
			// 	    If in, the number must be at least 59 and at most 76.
			length := len(kayAndVal[1])
			item := kayAndVal[1][length-2 : length]
			num, err := strconv.Atoi(kayAndVal[1][0 : length-2])

			if item == "cm" {
				if err == nil && num >= 150 && num <= 193 {
					count++
				}
			} else if item == "in" {
				if err == nil && num >= 59 && num <= 76 {
					count++
				}
			} else {
				return false
			}
		case "hcl":
			// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
			matched, _ := regexp.Match(`^#[1234567890abcdef]{6}$`, []byte(kayAndVal[1]))

			if matched {
				count++
			} else {
				return false
			}
		case "ecl":
			// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
			if kayAndVal[1] == "amb" ||
				kayAndVal[1] == "blu" ||
				kayAndVal[1] == "brn" ||
				kayAndVal[1] == "gry" ||
				kayAndVal[1] == "grn" ||
				kayAndVal[1] == "hzl" ||
				kayAndVal[1] == "oth" {
				count++
			} else {
				return false
			}
		case "pid":
			// pid (Passport ID) - a nine-digit number, including leading zeroes.
			if len(kayAndVal[1]) == 9 {
				matched, _ := regexp.Match(`^0*[1234567890]*$`, []byte(kayAndVal[1]))

				if matched {
					count++
				}
			} else {
				return false
			}
		case "cid":
			// cid (Country ID) - ignored, missing or not.
		}
	}

	if count == 7 {
		return true
	}

	return false
}
