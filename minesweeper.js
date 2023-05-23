var board = [];
var rows = 8;
var columns = 8;

var minesCount = 10;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

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

  