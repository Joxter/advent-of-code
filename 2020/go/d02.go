package main

import (
    "os"
    "fmt"
    "strings"
    "strconv"
)

func main() {
    inp, _ := os.ReadFile("../inputs/d02/input.txt")

    res1 := part1(string(inp))
    fmt.Println("part1", res1, res1 == 445)

    res2 := part2(string(inp))
    fmt.Println("part2", res2, res2 == 491)
}

func part1(inp string) int {
    lines := strings.Split(inp, "\n")
    res := 0

    for _, line := range lines {
        p := strings.Split(line, ": ")
        password := p[1]

        ch := string(p[0][len(p[0]) - 1])
        times := strings.Split(p[0][0:len(p[0]) - 2], "-")

        cnt := count(password, ch)
        min, _ := strconv.Atoi(times[0])
        max, _ := strconv.Atoi(times[1])

        if (cnt >= min  && cnt <= max ) {
            res++
        }
    }

    return res
}

func part2(inp string) int {
    lines := strings.Split(inp, "\n")
    res := 0

    for _, line := range lines {
        p := strings.Split(line, ": ")
        password := p[1]

        ch := string(p[0][len(p[0]) - 1])
        times := strings.Split(p[0][0:len(p[0]) - 2], "-")

        first, _ := strconv.Atoi(times[0])
        second, _ := strconv.Atoi(times[1])

        if (string(password[first - 1]) == ch) != (string(password[second - 1]) == ch) {
            res++
        }
    }

    return res
}

func count(s string, str string) int {
    cnt := 0

    for _, v := range s {
        if string(v) == str {
            cnt++
        }
    }

    return cnt
}




