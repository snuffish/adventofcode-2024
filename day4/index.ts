// @ts-nocheck

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
// const input = `SAMXAXMASX`;
// const input = `MXMXAXSAMX`;

const inputMatrix = input.split("\n").map((row) => row.split(""));

const positions = {};
inputMatrix.forEach((row, rowIndex) => {
  const cols = row
    .map((col, colIndex) => (col === "X" ? colIndex : undefined))
    .filter((v) => v !== undefined);

  if (cols) {
    positions[rowIndex] = cols;
  }
});

type StartPos = {
  row: number;
  col: number;
};

const WORD = "XMAS";

// Check horizontal
const checkHorizontal = (
  { row, col }: StartPos,
  direction = "FORWARD" | "BACKWARD",
) => {
  const matRow = inputMatrix[row];
  try {
    const search =
      direction === "FORWARD"
        ? matRow.slice(col, col + 4).join("")
        : matRow
            .slice(col - 3, col + 1)
            .reverse()
            .join("");

    return search === WORD;
  } catch (err) {}

  return false;
};

const checkVertical = ({ row, col }: StartPos, direction = "UP" | "DOWN") => {
  try {
    const arr = Array(4)
      .fill()
      .map(() => {
        return [direction === "UP" ? row-- : row++, col];
      });

    const str = arr
      .map(([row, col]) => {
        return inputMatrix[row][col];
      })
      .join("");

    return str === WORD;
  } catch (err) {}

  return false;
};

for (const [row, cols] of Object.entries(positions)) {
  for (const col of cols) {
    const forward = checkHorizontal({ row, col }, "FORWARD");
    const backward = checkHorizontal({ row, col }, "BACKWARD");

    if (forward || backward) {
      // console.log(`Horizontal (${forward ? 'forward' : 'backward'}) =>`, [row, col]);
    }

    if (checkVertical(
      { row, col },
      "DOWN",
    )) {
      console.log(`Vertical (down) =>`, [row, col])
    }

    if (checkVertical(
      { row, col },
      "UP",
    )) {
      console.log(`Vertical (up) =>`, [row, col])
    }
  }
}
