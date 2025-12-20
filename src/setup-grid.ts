function setupGrid(grid: Element) {
  for (let i = 0; i < 9; i++) {
    grid.append(setupBigSquare());
  }
}

function setupBigSquare(): Element {
  let bigSquare = document.createElement("div");
  bigSquare.classList.add("big-square");

  let smallSquare;
  for (let i = 0; i < 9; i++) {
    smallSquare = document.createElement("div");
    smallSquare.classList.add("small-sqaure");
    bigSquare.append(smallSquare);
  }

  return bigSquare;
}

export { setupGrid };
