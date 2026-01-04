import { DifficultyLevel } from "../sudoku/difficulty-levels";

export interface GameControlCallbacks {
  onNewGame: (difficulty: DifficultyLevel) => void;
}

export function setupGameControls(callbacks: GameControlCallbacks) {
  // TODO: Create and append buttons for Easy, Medium, Hard
  // TODO: Wire up click handlers that call callbacks.onNewGame(difficulty)

  // Example structure:
  // const easyButton = document.createElement("button");
  // easyButton.textContent = "Easy";
  // easyButton.addEventListener("click", () => {
  //   callbacks.onNewGame(DifficultyLevel.Easy);
  // });
  // document.body.append(easyButton);

  // Repeat for Medium and Hard buttons
}
