// @ts-nocheck
import fs from 'fs'

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

// const input = new String(fs.readFileSync('day4/input.txt'))

const mat = input.split("\n").map((row) => row.split(""));

let hits = [];
mat.forEach((row, rowIndex) => {
  hits.push(
    row
      .map((value, colIndex) => (value === "X" ? [rowIndex, colIndex] : -1))
      .filter((colIndex) => colIndex !== -1),
  );
});

const getMatValue = ([row, col]: [number, number]) => {
  try {
    return mat[row][col];
  } catch (err) {}
};

const WORD = "XMAS";
let wordHits = 0;

const isHit = (word) => {
  if (word === WORD) {
    wordHits++;
  }
};

const checkHit = ([row, col]: [number, number]) => {
  // Horizontal
  const horizontalForward = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row, col + i]),
  ).join("");
  isHit(horizontalForward);

  const horizontalBackward = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row, col - i]),
  ).join("");
  isHit(horizontalBackward);

  // Vertical
  const verticalUp = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row - i, col]),
  ).join("");
  isHit(verticalUp);

  const verticalDown = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row + i, col]),
  ).join("");
  isHit(verticalDown);

  // Diagonal
  const diagonal1 = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row + i, col + i]),
  ).join("");
  isHit(diagonal1);

  const diagonal2 = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row - i, col - i]),
  ).join("");
  isHit(diagonal2);

  const diagonal3 = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row - i, col + i]),
  ).join("");
  isHit(diagonal3);

  const diagonal4 = Array.from({ length: 4 }, (_, i) =>
    getMatValue([row + i, col - i]),
  ).join("");
  isHit(diagonal4);
};

for (const hit of hits.flat()) {
  checkHit(hit);
}

console.log("HITS", wordHits)
