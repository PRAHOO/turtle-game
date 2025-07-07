const board = document.getElementById("puzzle-board");
const winMessage = document.getElementById("win-message");

const rows = 4;
const cols = 4;

// Timer code
let time = 0;
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    document.getElementById("timer").textContent = `Time: ${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Generate all tile positions and shuffle them
let tiles = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    tiles.push({ row, col, img: `tiles/tile_${row}_${col}.jpg` });
  }
}

// Shuffle tiles
let shuffledTiles = [...tiles].sort(() => Math.random() - 0.5);

// Track selected tiles
let selected = [];

function drawBoard() {
  board.innerHTML = "";
  shuffledTiles.forEach((tile, index) => {
    const div = document.createElement("div");
    div.className = "tile";

    const img = document.createElement("img");
    img.src = tile.img;
    img.alt = `tile-${index}`;

    div.appendChild(img);
    div.dataset.index = index;
    div.onclick = () => selectTile(index);
    board.appendChild(div);
  });
}


function selectTile(index) {
  selected.push(index);

  if (selected.length === 2) {
    swapTiles(selected[0], selected[1]);
    selected = [];
    drawBoard();
    checkWin();
  }
}

function swapTiles(i, j) {
  const temp = shuffledTiles[i];
  shuffledTiles[i] = shuffledTiles[j];
  shuffledTiles[j] = temp;
}

function checkWin() {
  const won = shuffledTiles.every((tile, i) => {
    const correctTile = tiles[i];
    return tile.img === correctTile.img;
  });

  if (won) {
    stopTimer();
    winMessage.textContent = "🎉 You Win! Kemp's Ridley turtles are the smallest turtle species in the world!";
    document.getElementById("extra-links").style.display = "block";
  }
}


window.onload = () => {
  drawBoard();
  startTimer();
};


