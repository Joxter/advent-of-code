import math

# https://adventofcode.com/2021/day/16

input = open('../inputs/d16/input.txt', 'r').read()
testInp = open('../inputs/d16/test.txt', 'r').read()

def parseLine(inp):
    hexMap = {
        '0': '0000',
        '1': '0001',
        '2': '0010',
        '3': '0011',
        '4': '0100',
        '5': '0101',
        '6': '0110',
        '7': '0111',
        '8': '1000',
        '9': '1001',
        'A': '1010',
        'B': '1011',
        'C': '1100',
        'D': '1101',
        'E': '1110',
        'F': '1111',
    }

    return ''.join([hexMap[c] for c in inp])

def parse(binStr, left):
    packetVersion = int(binStr[left:left+3], 2)
    left += 3
    typeID = int(binStr[left:left+3], 2)
    left += 3

    aa = None
    if typeID == 4:
        aa = parseLiteral(binStr, left)
    else:
        aa = parseOperator(binStr, left)

    res = {
        **aa,
        "packetVersion": packetVersion,
        "typeID": typeID,
    }
    return res

def parseLiteral(binStr, left):
    literal = ""

    while left < len(binStr):
        fifth = binStr[left:left+5]
        literal += fifth[1:]
        left += 5

        if fifth[0] == '0':
            return {
                "literal": int(literal, 2),
                "left": left,
            }

    return None

def parseOperator(binStr, left):
    subPackets = []

    while left < len(binStr):
        lengthType = binStr[left]
        left += 1

        if lengthType == '0':
            totalLength = int(binStr[left:left+15], 2)
            left += 15
            finish = left + totalLength

            while left < finish:
                res = parse(binStr, left)
                subPackets.append(res)
                left = res["left"]

            break
        else:
            numberOfSubPackets = int(binStr[left:left+11], 2)
            left += 11

            for n in range(numberOfSubPackets):
                res = parse(binStr, left)
                subPackets.append(res)
                left = res["left"]

            break

    return {
        "subPackets": subPackets,
        "left": left,
    }

def countVersions(data):
    if "subPackets" in data:
        return data["packetVersion"] + sum([countVersions(d) for d in data["subPackets"]])

    return data["packetVersion"]

def evaluate(data):
    if data["typeID"] == 0:
        # sum everything:
        return sum([evaluate(d) for d in data["subPackets"]])

    if data["typeID"] == 1:
        # product everything:
        return math.prod([evaluate(d) for d in data["subPackets"]])

    if data["typeID"] == 2:
        # minimum of everything:
        return min([evaluate(d) for d in data["subPackets"]])

    if data["typeID"] == 3:
        # max of everything:
        return max([evaluate(d) for d in data["subPackets"]])

    if data["typeID"] == 4:
        return data["literal"]

    if data["typeID"] == 5:
        if evaluate(data["subPackets"][0]) > evaluate(data["subPackets"][1]):
            return 1
        else:
            return 0

    if data["typeID"] == 6:
        if evaluate(data["subPackets"][0]) < evaluate(data["subPackets"][1]):
            return 1
        else:
            return 0

    if data["typeID"] == 7:
        if evaluate(data["subPackets"][0]) == evaluate(data["subPackets"][1]):
            return 1
        else:
            return 0

    return None

def part1(inp):
    binStr = parseLine(inp)
#     binStr = parseLine("D2FE28")
#     binStr = parseLine("38006F45291200")
#     binStr = parseLine("8A004A801A8002F478")
#     binStr = parseLine("620080001611562C8802118E34")
#     binStr = parseLine("C0015000016115A2E0802F182340")
#     binStr = parseLine("A0016C880162017C3686B18A3D4780")

    res = parse(binStr, 0)

    return countVersions(res)

def part2(inp):
    binStr = parseLine(inp)
#     binStr = parseLine("C200B40A82")
#     binStr = parseLine("04005AC33890")
#     binStr = parseLine("880086C3E88112")

    res = parse(binStr, 0)

    return evaluate(res)

print('test', part1(testInp), [20])
print('part1', part1(input), [943])

print('test', part2(testInp), [1])
print('part2', part2(input), [167737115857])
