import type { DifficultyLevel } from "./difficulty-levels";
import { shuffle, pickRandom } from "../utils/random";

export type Cell = number | null;

class SudokuBoard {
  private board!: Cell[][];
  private completedBoard!: number[][];

  createNewBoard(difficulty: DifficultyLevel) {
    this.completedBoard = this.generateCompletedBoard();
    this.board = [...this.completedBoard];

    for (let i = 0; i < difficulty; i++) {
      let randomRow = pickRandom(this.board);
      randomRow[Math.floor(Math.random() * randomRow.length)] = null;
    }
  }

  // It should generate the first row, then for every cell afterwards,
  // generate a number by removing those in the current square+column+row
  // from the list of possible numbers
  private generateCompletedBoard(): number[][] {
    let completed: number[][] = new Array(9).fill(undefined);
    completed.forEach((_, i) => {
      completed[i] = new Array(9);
    });

    // first, generate first row randomly
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    completed[0] = shuffle(numbers);

    for (let row = 1; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        let r = this.getRow(row, completed);
        let c = this.getCol(col, completed);
        let s = this.getSquare(row, col, completed);
        const excluded = [...r, ...c, ...s];

        const availableNums: number[] = numbers.filter(
          (n) => !excluded.includes(n),
        );
        if (availableNums.length === 0) {
          col = -1;
          completed[row] = Array(9);
          continue;
        }

        completed[row][col] = pickRandom(availableNums);
      }
    }

    return completed;
  }

  getRow(row: number, board: Cell[][] = this.board): Cell[] {
    if (row > 8 || row < 0) return Array(9).fill(0);

    return board[row];
  }

  getCol(col: number, board: Cell[][] = this.board): Cell[] {
    if (col > 8 || col < 0) return Array(9).fill(0);

    let column: Cell[] = Array(9);
    for (let i = 0; i < 9; i++) {
      column[i] = board[i][col];
    }

    return column;
  }

  getSquare(x: number, y: number, board: Cell[][] = this.board): Cell[] {
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

  getBoard(): Cell[][] {
    return [...this.board];
  }
}

export default SudokuBoard;
