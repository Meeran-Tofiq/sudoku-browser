import { setupGrid } from "./setup-grid";

function main() {
  const grid = document.querySelector("#sudoku-grid");
  if (grid) setupGrid(grid);
}

main();
