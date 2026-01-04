import {
  DIFFICULTY_METADATA,
  DifficultyLevel,
} from "../sudoku/difficulty-levels";

export interface GameControlCallbacks {
  onNewGame: (difficulty: DifficultyLevel) => void;
  onClear: () => void;
}

export function setupGameControls(callbacks: GameControlCallbacks) {
  const container = document.getElementById("game-controls");
  if (!container) return;

  DIFFICULTY_METADATA.forEach(({ level, label }) => {
    const button = createDifficultyButton(callbacks, level, label);
    container.append(button);
  });

  container.append(createClearButton(callbacks));
}

function createDifficultyButton(
  callbacks: GameControlCallbacks,
  difficulty: DifficultyLevel,
  label: string,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = label;
  button.classList.add("controls");
  button.classList.add("difficulty-button");

  button.addEventListener("click", () => {
    callbacks.onNewGame(difficulty);
  });

  return button;
}

function createClearButton(callbacks: GameControlCallbacks): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = "Reset Board";
  button.classList.add("controls");

  button.addEventListener("click", () => {
    callbacks.onClear();
  });

  return button;
}
