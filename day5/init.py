import numpy as np

input = """47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47"""

# 75,47,61,53,29
# 97,61,53,29,13
# 75,29,13
# 75,97,47,61,53
# 61,13,29
# 97,13,75,29,47"""

lines = input.splitlines()

rules = {}
tests = []


def initRulesTests():
    for line in lines:
        if line == "":
            continue

        if bool(line.find("|") != -1):
            [left, right] = line.split("|")
            pageRuleList = rules.get(left, [])
            pageRuleList.append(int(right))
            rules[left] = pageRuleList

        elif bool(line.find(",") != 1):
            items = line.split(",")
            testList = []
            [testList.append(int(x)) for x in items]
            tests.append(testList)


# print(rules)


def checkPage(page):
    list = rules.get(str(page), False)
    # print(f"page=>{page} | list=>{list}")
    if not list:
        return False

    arr = np.array(list)
    filter_arr = np.array(list) < page
    newarr = arr[filter_arr]


def main() -> None:
    initRulesTests()
    for test in tests:
        for page in test:
            checkPage(page)


if __name__ == "__main__":
    pass
    # main()

arr = np.array([5, 6, 7])
filter_arr = arr > 4
newarr = arr[filter_arr]
print(newarr.length)
