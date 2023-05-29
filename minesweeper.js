var board = [];
var rows = 8;
var columns = 8;

var minesCount = 10;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;
var gameState = [];
var gameStateIndex = -1;
var bomb = "💣";
var flag = "🚩";
var isMute = false;

window.onload = function () {
  startGame();
  console.log(isMute);
};

function playBackgroundmusic(){
  var backgroundMusic = document.getElementById("sound");
  if(isMute == false){
  backgroundMusic.volume = 0.2;
  backgroundMusic.play();
  }
}
function stopBackgroundmusic(){
  var backgroundMusic = document.getElementById("sound");
  backgroundMusic.pause();
}

function playClickSound(){
  var clickSound = document.getElementById("click");
  if(isMute == false){
  clickSound.volume = 0.2;
  clickSound.play();
  }
}

function muteSound() {
  var backgroundMusic = document.getElementById("sound");
  var muteIcon = document.getElementById("mute-icon");

  if (isMute) {
    backgroundMusic.volume = 0.2;
    isMute = false;
    muteIcon.innerText ="🔊"
  } else {
    backgroundMusic.volume = 0;
    isMute = true;
    muteIcon.innerText ="🔇"
  }

}
  
function startGame() {
    document.getElementById("bomb1").addEventListener("click", setBomb1);
    document.getElementById("bomb2").addEventListener("click", setBomb2);
    document.getElementById("bomb3").addEventListener("click", setBomb3);
    document.getElementById("flag1").addEventListener("click", setflag1);
    document.getElementById("flag2").addEventListener("click", setflag2);
    document.getElementById("flag3").addEventListener("click", setflag3);
    document.getElementById("mines-count").innerText = gameStateIndex+1;
    document.getElementById("flag-button").innerText = flag;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    document.querySelector(".program.mute").addEventListener("click", muteSound);
    document.getElementById("undo").addEventListener("click", undo);
    setMines();   

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.addEventListener("click", clickTile);
      tile.addEventListener("contextmenu", putFlag);
      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  saveState();
  console.log(gameStateIndex)
}
function setMines() {
  let minesLeft = minesCount;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
}
function clickTile() {
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  let tile = this;
  if (!flagEnabled && tile.innerText == flag) {
    return;
  }
  if (flagEnabled) {
    if (tile.innerText == "") {
      tile.innerText = flag;
      saveState();
      document.getElementById("mines-count").innerText = gameStateIndex
    } else if (tile.innerText == flag) {
      tile.innerText = "";
      saveState();
      document.getElementById("mines-count").innerText = gameStateIndex
    }
  } else if (minesLocation.includes(tile.id)) {
    alert("GAME OVER");
    gameOver = true;
    revealMines();
    playClickSound()
    stopBackgroundmusic()
    saveState();
    document.getElementById("mines-count").innerText = gameStateIndex
    return;
  } else {
    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
    playClickSound()
    playBackgroundmusic()
    saveState();
    document.getElementById("mines-count").innerText = gameStateIndex
    console.log(gameStateIndex)
  }
}

function revealMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = board[r][c];
      if (minesLocation.includes(tile.id)) {
        tile.innerText = bomb;
      }
    }
  }
}

function checkTile(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return 0;
  }

  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }

  return 0;
}

function checkMine(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }
  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  board[r][c].classList.add("tile-clicked");
  tilesClicked += 1;

  let minesFound = 0;

  minesFound += checkTile(r - 1, c - 1);
  minesFound += checkTile(r - 1, c);
  minesFound += checkTile(r - 1, c + 1);

  minesFound += checkTile(r, c - 1);
  minesFound += checkTile(r, c + 1);

  minesFound += checkTile(r + 1, c - 1);
  minesFound += checkTile(r + 1, c);
  minesFound += checkTile(r + 1, c + 1);

  if (minesFound > 0) {
    board[r][c].innerText = minesFound;
    board[r][c].classList.add("x" + minesFound.toString());
  } else {
    checkMine(r - 1, c - 1);
    checkMine(r - 1, c);
    checkMine(r - 1, c + 1);

    checkMine(r, c - 1);
    checkMine(r, c + 1);

    checkMine(r + 1, c - 1);
    checkMine(r + 1, c);
    checkMine(r + 1, c + 1);
  }

  if (tilesClicked == rows * columns - minesCount) {
    document.getElementById("mines-count").innerText = "won";
    alert("you won - click on the smiley face to restart");
    gameOver = true;
  }
}

function putFlag(e) {
  e.preventDefault();
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }
  let tile = this;
  if (tile.innerText == "") {
    tile.innerText = flag;
    saveState();
    document.getElementById("mines-count").innerText = gameStateIndex
  } else if (tile.innerText == flag) {
    tile.innerText = "";
    saveState();
    document.getElementById("mines-count").innerText = gameStateIndex
  }
}

function setFlag() {
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag-button").style.backgroundColor = "lightgray";
  } else {
    flagEnabled = true;
    document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}

function setBomb1() {
  alert("bomb changed");
  return (bomb = "💣");
}
function setBomb2() {
  alert("bomb changed");
  return (bomb = "💥");
}
function setBomb3() {
  alert("bomb changed");
  return (bomb = "🧨");
}

function setflag1() {
  flag = "🚩";
  document.getElementById("flag-button").innerText = flag;
  alert("flag changed");
  return;
}
function setflag2() {
  flag = "🏳️";
  document.getElementById("flag-button").innerText = flag;
  alert("flag changed");
  return;
}
function setflag3() {
  flag = "🏴";
  document.getElementById("flag-button").innerText = flag;
  alert("flag changed");
  return;
}

function saveState() {
  var state = {
    board: board.map((row) =>
      row.map((tile) => ({
        id: tile.id,
        text: tile.innerText,
        classes: [...tile.classList],
      }))
    ),
    tilesClicked: tilesClicked,
    gameOver: gameOver,
  };
  gameState.push(state);
  gameStateIndex++;
}

function clearFutureStates() {
  gameState.splice(gameStateIndex + 1);
}

function undo() {
  if (gameStateIndex < 0) {
    return;
  }
  gameStateIndex--;
  var state = gameState[gameStateIndex];

  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      var savedTile = state.board[rowIndex][colIndex];
      tile.innerText = savedTile.text;
      tile.className = savedTile.classes.join(" ");
    });
  });

  tilesClicked = state.tilesClicked;
  gameOver = state.gameOver;
  clearFutureStates();
  document.getElementById("mines-count").innerText = gameStateIndex
}

// saveTile =  {
//   id: tile.1-1,
//   text: tile.innerText,
//   classes: [...tile.classList],
// }


// state = {
//   arrayOfTile:[
//     {
//       id: tile.id,
//       text: tile.innerText,
//       classes: [...tile.classList],
//     }
//     {
//       id: tile.id,
//       text: tile.innerText,
//       classes: [...tile.classList],
//     }
//     {
//       id: tile.id,
//       text: tile.innerText,
//       classes: [...tile.classList],
//     }  
//   ]
//   tilesClicked:tilesClicked
//   gameOver:gameOver
// }