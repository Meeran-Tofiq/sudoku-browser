import type { Cell } from "../sudoku/sudoku-board";

export class GridRenderer {
  private gridElement: Element;

  constructor(gridElement: Element) {
    this.gridElement = gridElement;
    this.setupGrid();
  }

  private setupGrid() {
    for (let i = 0; i < 9; i++) {
      this.gridElement.append(this.setupBigSquare(i));
    }
  }

  private setupBigSquare(sqNumber: number): Element {
    let bigSquare = document.createElement("div");
    bigSquare.classList.add("big-square");

    let smallSquare, row, col;
    for (let i = 0; i < 9; i++) {
      // calculate which row and column this cell falls on
      row = Math.floor(sqNumber / 3) * 3 + Math.floor(i / 3) + 1;
      col = (i % 3) + 3 * (sqNumber % 3) + 1;

      smallSquare = this.setupSmallSquare(row, col);
      bigSquare.append(smallSquare);
    }

    return bigSquare;
  }

  private setupSmallSquare(row: number, col: number): Element {
    let smallSquare = document.createElement("div");
    smallSquare.classList.add("small-square");
    smallSquare.id = `${row}-${col}`;

    return smallSquare;
  }

  render(board: Cell[][]) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.getElementById(`${row + 1}-${col + 1}`);
        if (!cell) continue;

        const value = board[row][col];
        if (value !== null) {
          cell.textContent = value.toString();
          cell.classList.add("pre-filled");
        } else {
          cell.textContent = "";
          cell.classList.remove("pre-filled");
        }
      }
    }
  }
}
