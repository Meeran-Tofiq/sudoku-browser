import {
  DIFFICULTY_METADATA,
  DifficultyLevel,
} from "../sudoku/difficulty-levels";

export interface GameControlCallbacks {
  onNewGame: (difficulty: DifficultyLevel) => void;
}

export function setupGameControls(callbacks: GameControlCallbacks) {
  const container = document.getElementById("game-controls");
  if (!container) return;

  DIFFICULTY_METADATA.forEach(({ level, label }) => {
    const button = createDifficultyButton(callbacks, level, label);
    container.append(button);
  });
}

function createDifficultyButton(
  callbacks: GameControlCallbacks,
  difficulty: DifficultyLevel,
  label: string,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = label;
  button.classList.add("difficulty-button");

  button.addEventListener("click", () => {
    callbacks.onNewGame(difficulty);
  });

  return button;
}
