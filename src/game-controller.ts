import type { DifficultyLevel } from "./sudoku/difficulty-levels";
import SudokuBoard from "./sudoku/sudoku-board";
import { setupGameControls } from "./ui/game-controls";
import { GridRenderer } from "./ui/grid-renderer";

export default class GameController {
  private sudokuBoard: SudokuBoard;
  private gridRenderer: GridRenderer;

  constructor(gridContainer: Element) {
    this.sudokuBoard = new SudokuBoard();
    this.gridRenderer = new GridRenderer(gridContainer);
    this.setupControls();
  }

  private setupControls() {
    setupGameControls({
      onNewGame: (difficulty) => this.setupNewGame(difficulty),
    });
  }

  private setupNewGame(difficulty: DifficultyLevel) {
    this.sudokuBoard.createNewBoard(difficulty);
    this.gridRenderer.render(this.sudokuBoard.getBoard());
  }
}
