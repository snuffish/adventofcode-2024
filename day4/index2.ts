// @ts-nocheck
import fs from "fs";

// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;
//
const input = new String(fs.readFileSync('day4/input.txt'))

const mat = input.split("\n").map((row) => row.split(""));

let hits = []
mat.forEach((row, rowIndex) => {
  hits.push(
    row
      .map((value, colIndex) => (value === "A" ? [rowIndex, colIndex] : -1))
      .filter((colIndex) => colIndex !== -1)
  )
});

const getInputChar = ([row, col]) => {
  try {
    return mat[row][col];
  } catch (err) {}
};

const WORD = "MAS";

const masHits = []

for (const hit of hits.flat()) {
  const [row, col] = hit
  const check1 = [
    [row + 1, col - 1],
    [row, col],
    [row - 1, col + 1],
  ];

  const check2 = [
    [row + 1, col + 1],
    [row, col],
    [row - 1, col - 1],
  ];


  const word1Bits = check1.map((chPos) => getInputChar(chPos))
  const word2Bits = check2.map((chPos) => getInputChar(chPos))

  const word1 = word1Bits.join('')
  const word1_reverse = word1Bits.reverse().join('')

  const word2 = word2Bits.join('')
  const word2_reverse = word2Bits.reverse().join('')

  if ((word1.startsWith(WORD) || word1_reverse.startsWith(WORD)) && (word2.startsWith(WORD) || word2_reverse.startsWith(WORD))) {
    console.log("FOUND", hit)
    masHits.push(hit)
  }
}

console.log(masHits.length)

