import type { DifficultyLevel } from "./difficulty-levels";
import { pickRandom } from "../utils/random";

export type Cell = number | null;

// A valid completed Sudoku board used as the seed for generation
const SEED_BOARD: number[][] = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
];

class SudokuBoard {
  private initialBoard!: Cell[][];
  private completedBoard!: number[][];
  private board!: Cell[][];

  createNewBoard(difficulty: DifficultyLevel) {
    this.completedBoard = this.generateCompletedBoard();

    this.initialBoard = structuredClone(this.completedBoard);
    for (let i = 0; i < difficulty; i++) {
      let randomRow = pickRandom(this.initialBoard);
      randomRow[Math.floor(Math.random() * randomRow.length)] = null;
    }

    this.board = structuredClone(this.initialBoard);
  }

  private generateCompletedBoard(): number[][] {
    let board = structuredClone(SEED_BOARD);

    // Apply random transformations to create a unique board
    const numShuffles = 20;
    for (let i = 0; i < numShuffles; i++) {
      const operation = Math.floor(Math.random() * 5);
      switch (operation) {
        case 0:
          board = this.swapRowsInBand(board);
          break;
        case 1:
          board = this.swapColsInBand(board);
          break;
        case 2:
          board = this.swapRowBands(board);
          break;
        case 3:
          board = this.swapColBands(board);
          break;
        case 4:
          board = this.swapNumbers(board);
          break;
      }
    }

    return board;
  }

  // Swap two random rows within the same 3-row band
  private swapRowsInBand(board: number[][]): number[][] {
    const band = Math.floor(Math.random() * 3); // 0, 1, or 2
    const row1 = band * 3 + Math.floor(Math.random() * 3);
    let row2 = band * 3 + Math.floor(Math.random() * 3);
    while (row2 === row1) row2 = band * 3 + Math.floor(Math.random() * 3);

    [board[row1], board[row2]] = [board[row2], board[row1]];
    return board;
  }

  // Swap two random columns within the same 3-column band
  private swapColsInBand(board: number[][]): number[][] {
    const band = Math.floor(Math.random() * 3);
    const col1 = band * 3 + Math.floor(Math.random() * 3);
    let col2 = band * 3 + Math.floor(Math.random() * 3);
    while (col2 === col1) col2 = band * 3 + Math.floor(Math.random() * 3);

    for (let row = 0; row < 9; row++) {
      [board[row][col1], board[row][col2]] = [board[row][col2], board[row][col1]];
    }
    return board;
  }

  // Swap two entire 3-row bands
  private swapRowBands(board: number[][]): number[][] {
    const band1 = Math.floor(Math.random() * 3);
    let band2 = Math.floor(Math.random() * 3);
    while (band2 === band1) band2 = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
      [board[band1 * 3 + i], board[band2 * 3 + i]] =
        [board[band2 * 3 + i], board[band1 * 3 + i]];
    }
    return board;
  }

  // Swap two entire 3-column bands
  private swapColBands(board: number[][]): number[][] {
    const band1 = Math.floor(Math.random() * 3);
    let band2 = Math.floor(Math.random() * 3);
    while (band2 === band1) band2 = Math.floor(Math.random() * 3);

    for (let row = 0; row < 9; row++) {
      for (let i = 0; i < 3; i++) {
        [board[row][band1 * 3 + i], board[row][band2 * 3 + i]] =
          [board[row][band2 * 3 + i], board[row][band1 * 3 + i]];
      }
    }
    return board;
  }

  // Swap all occurrences of two numbers
  private swapNumbers(board: number[][]): number[][] {
    const num1 = Math.floor(Math.random() * 9) + 1;
    let num2 = Math.floor(Math.random() * 9) + 1;
    while (num2 === num1) num2 = Math.floor(Math.random() * 9) + 1;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === num1) board[row][col] = num2;
        else if (board[row][col] === num2) board[row][col] = num1;
      }
    }
    return board;
  }

  getRow(row: number, board: Cell[][] = this.initialBoard): Cell[] {
    if (row > 8 || row < 0) return Array(9).fill(0);

    return board[row];
  }

  getCol(col: number, board: Cell[][] = this.initialBoard): Cell[] {
    if (col > 8 || col < 0) return Array(9).fill(0);

    let column: Cell[] = Array(9);
    for (let i = 0; i < 9; i++) {
      column[i] = board[i][col];
    }

    return column;
  }

  getSquare(x: number, y: number, board: Cell[][] = this.initialBoard): Cell[] {
    let square: Cell[] = Array(9);

    let squareRow = Math.floor(x / 3);
    let squareCol = Math.floor(y / 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        square[i * 3 + j] = board[i + squareRow * 3][j + squareCol * 3];
      }
    }

    return square;
  }

  getInitialBoard(): Cell[][] {
    return [...this.initialBoard];
  }

  getBoard(): Cell[][] {
    return [...this.board];
  }

  handleNumberInput(row: number, col: number, value: number): boolean {
    if (row > 8 || row < 0) return false;
    if (col > 8 || col < 0) return false;
    if (value > 9 || value < 1) return false;
    if (this.board[row][col] === value) return false;

    this.board[row][col] = value;
    return true;
  }

  handleClearCell(row: number, col: number) {
    if (row > 8 || row < 0) return;
    if (col > 8 || col < 0) return;

    this.board[row][col] = null;
  }

  handleClearBoard() {
    this.board = [...this.initialBoard];
  }

  checkWinCondition(): boolean {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] !== this.completedBoard[row][col])
          return false;
      }
    }
    return true;
  }
}

export default SudokuBoard;
