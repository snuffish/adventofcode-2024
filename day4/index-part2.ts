// @ts-nocheck
import fs from "fs";

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
      .map((value, colIndex) => (value === "A" ? [rowIndex, colIndex] : -1))
      .filter((colIndex) => colIndex !== -1),
  );
});

const getMatValue = ([row, col]: [number, number]) => {
  try {
    return mat[row][col];
  } catch (err) {}
};

const WORD_XMAS = "XMAS";
let wordHits = 0;

const isHit = (wordArrPositions) => {
  const wordArr = wordArrPositions.map((pos) => getMatValue(pos));

  if (wordArrPositions.join("") === WORD_XMAS) {
    wordHits++
    return true;
  }
};

const checkMasCross = ([row, col]: [number, number]) => {
  const diagonal1 = [
    getMatValue([row - 1, col - 1]),
    getMatValue([row, col]),
    getMatValue([row + 1, col + 1]),
  ];
  console.log(diagonal1);

  const diagonal2 = [
    getMatValue([row + 1, col + 1]),
    getMatValue([row, col]),
    getMatValue([row - 1, col - 1]),
  ];
  console.log(diagonal2);
};

const checkHit = ([row, col]: [number, number]) => {
  // Horizontal
    const horizontalForward = Array.from({ length: 4 }, (_, i) => [row, col + i]);
  if (isHit(horizontalForward)) {
    const cross = checkMasCross(horizontalForward[1]);
  }

  const horizontalBackward = Array.from({ length: 4 }, (_, i) => [
    row,
    col - i,
  ]);
  if (isHit(horizontalForward)) {
    const cross = checkMasCross(horizontalForward[1]);
  }

  // Vertical
  const verticalUp = Array.from({ length: 4 }, (_, i) => [row - i, col]);
  if (isHit(verticalUp)) {
    const cross = checkMasCross(verticalUp[1]);
  }


  const verticalDown = Array.from({ length: 4 }, (_, i) => [row + i, col]);
  if (isHit(verticalDown)) {
    const cross = checkMasCross(verticalDown[1]);
  }


  // Diagonal
  const diagonal1 = Array.from({ length: 4 }, (_, i) => [row + i, col + i]);
  if (isHit(diagonal1)) {
    const cross = checkMasCross(diagonal1[1]);
  }

  const diagonal2 = Array.from({ length: 4 }, (_, i) => [row - i, col - i]);
  if (isHit(diagonal2)) {
    const cross = checkMasCross(diagonal2[1]);
  }


  const diagonal3 = Array.from({ length: 4 }, (_, i) => [row - i, col + i]);
  if (isHit(diagonal3)) {
    const cross = checkMasCross(diagonal3[1]);
  }

  const diagonal4 = Array.from({ length: 4 }, (_, i) => [row + i, col - i]);
  if (isHit(diagonal4)) {
    const cross = checkMasCross(diagonal4[1]);
  }

};

for (const hit of hits.flat()) {
  checkHit(hit);
}

console.log("HITS", wordHits);
