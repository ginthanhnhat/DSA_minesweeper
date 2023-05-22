var minesCount = 10;
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
    
}    