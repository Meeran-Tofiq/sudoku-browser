import type { DifficultyLevel } from "./sudoku/difficulty-levels";
import SudokuBoard from "./sudoku/sudoku-board";
import { setupGameControls } from "./ui/game-controls";
import { GridRenderer } from "./ui/grid-renderer";

export default class GameController {
  private sudokuBoard: SudokuBoard;
  private gridRenderer: GridRenderer;
  private selectedCell: { row: number; col: number } | null = null;
  private preFilled: Set<string> = new Set();

  constructor(gridContainer: Element) {
    this.sudokuBoard = new SudokuBoard();
    this.gridRenderer = new GridRenderer(gridContainer, {
      onCellClick: (row, col) => this.handleCellClick(row, col),
    });
    this.setupControls();
    this.setupKeyboardInput();
  }

  private setupControls() {
    setupGameControls({
      onNewGame: (difficulty) => this.setupNewGame(difficulty),
      onClear: () => this.clearBoard(),
    });
  }

  private setupKeyboardInput() {
    document.addEventListener("keydown", (event) => {
      // Handle arrow key navigation
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault(); // Prevent page scrolling
        this.handleArrowKey(event.key);
        return;
      }

      if (!this.selectedCell) return;

      const num = parseInt(event.key);
      if (num >= 1 && num <= 9) {
        this.handleNumberInput(num);
      } else if (event.key === "Backspace" || event.key === "Delete") {
        this.handleClearCell();
      }
    });
  }

  private setupNewGame(difficulty: DifficultyLevel) {
    this.sudokuBoard.createNewBoard(difficulty);
    let board = this.sudokuBoard.getInitialBoard();

    this.preFilled.clear();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== null) {
          this.preFilled.add(`${row}-${col}`);
        }
      }
    }

    this.gridRenderer.render(board);
    this.selectedCell = null;
  }

  private handleCellClick(row: number, col: number) {
    this.selectedCell = { row, col };
    this.gridRenderer.selectCell(row, col);
  }

  private handleNumberInput(num: number) {
    if (!this.selectedCell) return;

    const { row, col } = this.selectedCell;
    const cellKey = `${row}-${col}`;

    if (this.preFilled.has(cellKey)) {
      console.log("Cannot edit pre-filled cells");
      return;
    }

    // Update internal board state
    this.sudokuBoard.handleNumberInput(row, col, num);

    // Update visual representation
    this.gridRenderer.setUserInput(row, col, num);
  }

  private handleClearCell() {
    if (!this.selectedCell) return;

    const { row, col } = this.selectedCell;
    const cellKey = `${row}-${col}`;

    if (this.preFilled.has(cellKey)) {
      console.log("Cannot clear pre-filled cells");
      return; // Can't clear pre-filled
    }

    // Update internal board state
    this.sudokuBoard.handleClearCell(row, col);

    // Update visual representation
    this.gridRenderer.clearCell(row, col);
  }

  private clearBoard() {
    // Clear all user input cells (not pre-filled)
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cellKey = `${row}-${col}`;
        if (!this.preFilled.has(cellKey)) {
          this.gridRenderer.clearCell(row, col);
        }
      }
    }
    this.selectedCell = null;
    this.sudokuBoard.handleClearBoard();
  }

  private handleArrowKey(key: string) {
    // If no cell selected, select the center cell
    if (!this.selectedCell) {
      this.selectedCell = { row: 4, col: 4 };
      this.gridRenderer.selectCell(4, 4);
      return;
    }

    let { row, col } = this.selectedCell;

    switch (key) {
      case "ArrowUp":
        row = Math.max(0, row - 1);
        break;
      case "ArrowDown":
        row = Math.min(8, row + 1);
        break;
      case "ArrowLeft":
        col = Math.max(0, col - 1);
        break;
      case "ArrowRight":
        col = Math.min(8, col + 1);
        break;
    }

    this.selectedCell = { row, col };
    this.gridRenderer.selectCell(row, col);
  }
}
