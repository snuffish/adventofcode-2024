// @ts-nocheck
import fs from "fs";

const input = new String(fs.readFileSync('day3/input.txt'))
// const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;
const matches = input.match(regex);

const mul = (x: number, y: number) => {
  return x * y;
};

let add = true;
let total = 0;

for (const m of matches) {
  if (m === `do()`) {
    add = true;
  }
  if (m === `don't()`) {
    add = false;
  }

  if (add && m.startsWith('mul')) {
    const sum = eval(m);
    total += sum;
  }
}

console.log(total)
// Answer: 84893551
