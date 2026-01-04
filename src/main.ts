import GameController from "./game-controller";

function main() {
  const gridContainer = document.querySelector("#sudoku-grid");
  if (!gridContainer) return;

  new GameController(gridContainer);
}

main();
