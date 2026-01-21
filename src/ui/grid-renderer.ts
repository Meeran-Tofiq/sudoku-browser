import type { Cell } from "../sudoku/sudoku-board";

export interface GridRendererCallbacks {
  onCellClick: (row: number, col: number) => void;
}

export class GridRenderer {
  private gridElement: Element;
  private callbacks?: GridRendererCallbacks;
  private selectedCell: { row: number; col: number } | null = null;

  constructor(gridElement: Element, callbacks?: GridRendererCallbacks) {
    this.gridElement = gridElement;
    this.callbacks = callbacks;
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

    if (this.callbacks) {
      smallSquare.addEventListener("click", () => {
        this.callbacks!.onCellClick(row - 1, col - 1);
      });
    }

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
          cell.classList.remove("user-input");
        } else {
          cell.textContent = "";
          cell.classList.remove("pre-filled", "user-input");
        }
      }
    }
  }

  highlightNumber(num: number) {
    const highlightClass = "highlight";
    Array.from(document.querySelectorAll(`.${highlightClass}`)).forEach(
      (element) => element.classList.remove(highlightClass),
    );

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.getElementById(`${row + 1}-${col + 1}`);
        if (!cell) continue;

        const value = parseInt(cell.textContent);
        if (value !== num) continue;

        cell.classList.add(highlightClass);
      }
    }
  }

  selectCell(row: number, col: number) {
    if (this.selectedCell) {
      const prevCell = document.getElementById(
        `${this.selectedCell.row + 1}-${this.selectedCell.col + 1}`,
      );
      prevCell?.classList.remove("selected");
    }

    this.selectedCell = { row, col };
    const cell = document.getElementById(`${row + 1}-${col + 1}`);
    if (!cell) return;
    cell.classList.add("selected");
    this.highlightNumber(parseInt(cell.textContent));
  }

  setUserInput(row: number, col: number, value: number) {
    const cell = document.getElementById(`${row + 1}-${col + 1}`);
    if (!cell) return;

    cell.textContent = value.toString();
    cell.classList.add("user-input");
    cell?.classList.remove("pre-filled");
    this.highlightNumber(value);
  }

  clearCell(row: number, col: number) {
    const cell = document.getElementById(`${row + 1}-${col + 1}`);
    if (!cell) return;

    cell.textContent = "";
    cell.classList.remove("user-input");
  }
}
