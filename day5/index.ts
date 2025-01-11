// @ts-nocheck

const input = `47|53
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

97,13,75,29,47`;
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`;

const pageRules = {}
const arr: number[][] = []
const rows = input.split("\n");
const section1 = rows.splice(0, rows.findIndex(v => v === '')).map(v => {
  let [left,right] = v.split('|').map(Number)
  let list = arr[left] ?? []
  list.push(right)

  arr[left] = list
  pageRules[left] = list
})

const checkPage = (update) => {
  for (const page of update) {
    const rules = pageRules[page]
    if (rules) {
      const max = Math.max(...rules)

      if (page < max) {
        // return false
      }
    }
    console.log(page)
  }

  return true
}

const updates = rows.filter(v => v !== '').map(v => v.split(',').map(Number))
for (const update of updates) {
  console.log(checkPage(update))
}




// const it = list.entries()
// let item
// do {
//  item = it.next()
//
//   console.log(item.value)
// } while(!item.done)

// while (iterator.next()) {
//   console.log("DSDS")
// }
// console.log(list[])
