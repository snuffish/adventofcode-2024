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

let total = 0;

const checkArr = (arrs) => {
  for (const arr of arrs) {
    let convert = arr.map(([row, col]) => {
      try {
        if (inputMatrix[row][col]) {
          return inputMatrix[row][col];
        }
      } catch (err) {}
    });

    const str = convert.join("");
    const str2 = convert.reverse().join("");

    if (str === WORD || str2 === WORD) {
      console.log("HIT")
      total++
    }
    return str === WORD || str2 === WORD
  }
};


const checkDiagonal = ({ row, col }: StartPos) => {
  const diagonal1 = Array.from({ length: 4 }, (_, i) => [row++, col++]);
  const diagonal2 = Array.from({ length: 4 }, (_, i) => [row--, col--]);
  const diagonal3 = Array.from({ length: 4 }, (_, i) => [row++, col--]);
  const diagonal4 = Array.from({ length: 4 }, (_, i) => [row--, col++]);
  const horizontalForward = Array.from({ length: 4 }, (_, i) => [row, col + i]);
  const horizontalBackward = Array.from({ length: 4 }, (_, i) => [row, col - i]);
  const verticalUp = Array.from({ length: 4 }, (_, i) => [row + i, col]);
  const verticalDown = Array.from({ length: 4 }, (_, i) => [row - i, col]);

  // return checkArr([diagonal1, diagonal2, diagonal3, diagonal4, horizontalForward, horizontalBackward, verticalUp, verticalDown]);
  checkArr([diagonal1])
  checkArr([diagonal2])
  checkArr([diagonal3])
  checkArr([diagonal4])
  checkArr([horizontalForward])
  checkArr([horizontalBackward])
  checkArr([verticalUp])
  checkArr([verticalDown])
};

for (const [row, cols] of Object.entries(positions)) {
  for (const col of cols) {
    const forward = checkHorizontal({ row, col }, "FORWARD");
    const backward = checkHorizontal({ row, col }, "BACKWARD");

    if (forward || backward) {
      // console.log(`Horizontal (${forward ? 'forward' : 'backward'}) =>`, [row, col]);
      total++;
    }

    if (checkVertical({ row, col }, "DOWN")) {
      console.log(`Vertical (down) =>`, [row, col]);
      total++;
    }

    if (checkVertical({ row, col }, "UP")) {
      console.log(`Vertical (up) =>`, [row, col]);
      total++;
    }

    checkDiagonal({ row, col });
  }
}

console.log("TOTAL", total);
