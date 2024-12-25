// @ts-ignore
import fs from "fs";

// Test

// const [left] = [
//   Buffer.from(fs.readFileSync('./left.list')).toString().split('\n').map(v => console.log(v)))
// ]
// left.map((number, index) => listSum(number, right[index]))

// const sum = listSum(left, right);
//
// [3, 4, 2, 1, 3, 3];console.log(right);
//
//
// const left = Buffer.from(fs.readFileSync("./left-order.list"))
//   .toString()
//   .split("\n")
//   .map((row) => row.split(""))
//   .map((row) => row.map((v) => parseInt(v)));
//
// const right = Buffer.from(fs.readFileSync("./right-order.list"))
//   .toString()
//   .split("\n")
//   .map((row) => row.split(""))
//   .map((row) => row.map((v) => parseInt(v)));
//

// const left = [[3, 4, 2, 1, 3, 3]];
// const right = [[4, 3, 5, 3, 9, 3]];

// for (const [index, value] of Object.entries(left)) {
//   const sum = listSum(value)
// }

const listSum = (list: number[], target: number[]) => {
  const difference = list.map((nr, index) => {
    const diff = nr - target[index];
    return diff >= 0 ? diff : diff * -1;
  });
  const sum = difference.reduce((acc, curr) => acc + curr, 0);

  return [difference, sum];
};

const left = Buffer.from(fs.readFileSync("./left-order.list"))
  .toString()
  .split("\n")
  .map((v) => parseInt(v))

const right = Buffer.from(fs.readFileSync("./right-order.list"))
  .toString()
  .split("\n")
  .map((v) => parseInt(v))

const results = left
  .flatMap((list, index) => {
    const [difference, sum] = listSum(list, right[index]);
    return sum === 11 ? difference : 0;
  })
  .filter((v) => v !== undefined);

const res = results.reduce((acc, curr) => acc + curr, 0);

console.log(res);
