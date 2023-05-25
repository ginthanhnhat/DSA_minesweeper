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


window.onload = function () {
    startGame();
}
function startGame() {
    document.getElementById("bomb1").addEventListener("click", setBomb1);
    document.getElementById("bomb2").addEventListener("click", setBomb2);
    document.getElementById("bomb3").addEventListener("click", setBomb3);
    document.getElementById("flag1").addEventListener("click", setflag1);
    document.getElementById("flag2").addEventListener("click", setflag2);
    document.getElementById("flag3").addEventListener("click", setflag3);
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").innerText = flag;
    document.getElementById("flag-button").addEventListener("click", setFlag);
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
 
    } else if (tile.innerText == flag) {
      tile.innerText = "";
 
    }
  } else if (minesLocation.includes(tile.id)) {
    alert("GAME OVER");
    gameOver = true;
    revealMines();


    return;
  } else {
    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);


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

function checkTile(r, c){
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
    alert("u win");
    gameOver = true;
    location.reload();
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
  } else if (tile.innerText == flag) {
    tile.innerText = "";
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