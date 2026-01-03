import SudokuBoard from "./sudoku/sudoku-board";

function setupGrid(grid: Element) {
  const sudoku = new SudokuBoard();

  for (let i = 0; i < 9; i++) {
    grid.append(setupBigSquare(i));
  }

  sudoku.board.forEach((row, i) => {
    row.forEach((num, j) => {
      const cell = document.getElementById(`${i + 1}-${j + 1}`);
      if (cell == null) {
        console.error(
          `The cell at row = ${i + 1}, col = ${j + 1}, ` +
            `with id = ${i + 1}-${j + 1}, is null. Please investigate`,
        );
        return;
      }

      cell.textContent = num.toString();
    });
  });
}

function setupBigSquare(sqNumber: number): Element {
  let bigSquare = document.createElement("div");
  bigSquare.classList.add("big-square");

  let smallSquare, row, col;
  for (let i = 0; i < 9; i++) {
    // calculate which row and column this cell
    // falls on
    row = Math.floor(sqNumber / 3) * 3 + Math.floor(i / 3) + 1;
    col = (i % 3) + 3 * (sqNumber % 3) + 1;

    smallSquare = setupSmallSquare(row, col);
    bigSquare.append(smallSquare);
  }

  return bigSquare;
}

function setupSmallSquare(row: number, col: number): Element {
  let smallSquare = document.createElement("div");
  smallSquare.classList.add("small-square");
  smallSquare.id = `${row}-${col}`;

  return smallSquare;
}

export { setupGrid };
