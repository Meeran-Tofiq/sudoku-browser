class SudokuBoard {
  board: number[][];
  private completedBoard: number[][];

  constructor() {
    this.completedBoard = this.generateCompletedBoard();
    this.board = this.generateNewBoard();
  }

  generateNewBoard(): number[][] {
    return this.completedBoard;
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

  getRow(row: number, board: number[][] = this.board): number[] {
    if (row > 8 || row < 0) return Array(9).fill(0);

    return board[row];
  }

  getCol(col: number, board: number[][] = this.board): number[] {
    if (col > 8 || col < 0) return Array(9).fill(0);

    let column: number[] = Array(9);
    for (let i = 0; i < 9; i++) {
      column[i] = board[i][col];
    }

    return column;
  }

  getSquare(x: number, y: number, board: number[][] = this.board): number[] {
    let square: number[] = Array(9);

    let squareRow = Math.floor(x / 3);
    let squareCol = Math.floor(y / 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        square[i * 3 + j] = board[i + squareRow * 3][j + squareCol * 3];
      }
    }

    return square;
  }
}

function shuffle<T>(array: T[], startIndex: number = 0): T[] {
  const result = [...array];

  if (startIndex < 0 || startIndex >= result.length) {
    return result;
  }

  let currentIndex = result.length;

  while (currentIndex > startIndex + 1) {
    const randomIndex =
      startIndex + Math.floor(Math.random() * (currentIndex - startIndex));

    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
}

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
