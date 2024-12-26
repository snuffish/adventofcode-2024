// @ts-nocheck
import fs from 'fs'

const input = new String(fs.readFileSync('day3/input.txt'))

const regex = /mul\(\d+,\d+\)/g;
const matches = input.match(regex);

const mul = (x: number, y: number) => {
  return x * y
}

let total = 0
matches && matches.map(m => {
  const sum = eval(m)
  total += sum
})

console.log(total)
// Answer: 160672468
