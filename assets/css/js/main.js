//Sections
let homeSec = document.getElementById("homeSec");
let boardSec = document.getElementById("boardSec");
let homeBtn = document.getElementById("homeBtn");
let links = document.querySelectorAll("a");
let playChoose;
let points = document.getElementById("points");
let pointsPlayer1;
let pointsPlayer2;
let times = 0;
let messageGame = document.getElementById("messageGame");

links[0].addEventListener("click", () => {
  gameOption(0, homeSec, boardSec);
});

links[1].addEventListener("click", () => {
  gameOption(1, homeSec, boardSec);
});

homeBtn.addEventListener("click", () => {
  gameOption(2, boardSec, homeSec);
});

function gameOption(id, section, nextSection) {
  section.style.display = "none";
  nextSection.style.display = "flex";
  playChoose = id;
  pointsReset();
  finish();
  times = 0;

  if (id == 0) {
    let player1 = document.getElementById("player1");
    player1.innerHTML = "Vos";
    let player2 = document.getElementById("player2");
    player2.innerHTML = "Computadora";
  } else if (id == 1) {
    player1.innerHTML = "";
    player2.innerHTML = "";
    messageGame.innerHTML = "Jugador 1, elegí una opción";
  } 

}

function pointsReset() {
  points.innerHTML = "0-0";
  pointsPlayer1 = 0;
  pointsPlayer2 = 0;
}

//Board
let x = document.getElementById("x");
let o = document.getElementById("o");
let buttons= document.querySelectorAll("button");
let restart = document.getElementById("restart");
let indices = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
let indicesDisabled = new Set([]);
let playerSide1;
let playerSide2;
let first;
let click = -1;

function disableBoard() {
  indices.forEach((elem) => (buttons[elem].disabled = "true"));
}

function enableBoard() {
  indices.forEach((elem) => buttons[elem].removeAttribute("disabled"));
}

disableBoard();

//Listen option
x.addEventListener("click", () => {
  start("X");
  x.classList.add("chosen");
});
o.addEventListener("click", () => {
  start("O");
  o.classList.add("chosen");
});

//Choose turn
function firstTurn() {
  let arrSide = ["X", "O"];
  let num = Math.floor(Math.random() * 2);
  first = arrSide[num];
  messageTurn();

  if (first == playerSide2 && playChoose == 0) {
    gameMachine();
  } else {
    enableBoard();
  }
}

function messageTurn() {
  click++;
  if (first == playerSide1) {
    messageGame.innerHTML =
      click % 2 == 0 ? `Es el turno de ${playerSide1}` : `Es el turno de ${playerSide2}`;
  } else {
    messageGame.innerHTML =
      click % 2 == 0 ? `Es el turno de ${playerSide2}` : `Es el turno de ${playerSide1}`;
  }
}

//Start game
function start(option) {
  playerSide1 = option;
  playerSide2 = option == "X" ? "O" : "X";
  x.disabled = true;
  o.disabled = true;
  x.style.color = "black";
  o.style.color = "black";
  if (playChoose == 1) {
    player1.innerHTML = (times % 2 == 0) ? `Jugador 1 (${playerSide1})`: `Jugador 1 (${playerSide2})`;
    player2.innerHTML = (times % 2 == 0) ? `Jugador 2 (${playerSide2})`: `Jugador 2 (${playerSide1})`;
  }
  firstTurn();
}

//Player game
function addContent(id) {
  if (playChoose == 0) {
    buttons[id].innerHTML = playerSide1;
    buttons[id].disabled = true;
    disableBoard();
    indicesDisabled.add(id);
    indices.delete(id);
    messageTurn();
    if (click < 5 && playChoose == 0) {
      gameMachine();
    } else if (click >= 5 && playChoose == 0) {
      if (check(playerSide1) == false) {
        gameMachine();
      }
    }
  } else {
    let player =
      (click % 2 == 0 && first == playerSide1) ||
      (click % 2 != 0 && first == playerSide2)
        ? playerSide1
        : playerSide2;
    addContentTwoPlayer(id, player);
  }
}

//Computer game
function gameMachine() {
  setTimeout(() => {
    let cc = computerChoose();
    console.log("asdfgh" + cc)

    if(cc == undefined) {
      let cant = indices.size;
      let num = Math.floor(Math.random() * cant);
      let arr = [...indices];
      cc = arr[num];
      console.log(cc)
    } 
    
    buttons[cc].innerHTML = playerSide2;
    indicesDisabled.add(cc);
    buttons[cc].disabled = true;
    indices.delete(cc);

    //console.log(indicesDisabled);
    
    // let cant = indices.size;
    // let num = Math.floor(Math.random() * cant);
    // let arr = [...indices];
    // indicesDisabled[arr[num]].innerHTML = playerSide2;
    // indicesDisabled[arr[num]].disabled = true;
    // indices.delete(arr[num]);
    messageTurn();
    if (click >= 5) {
      check(playerSide2);
    }
    enableBoard();
  }, 1500);
}

function addContentTwoPlayer(id, player) {
  buttons[id].innerHTML = player;
  buttons[id].disabled = true;
  messageTurn();
  if (click >= 5) {
    check(player);
  }
}

//Check game
function check(game) {
  if (
    horizontalGame() ||
    verticalGame() ||
    rightDiagonalGame() ||
    leftDiagonalGame()
  ) {
    disableBoard();
    result(game);
  } else if (click == 9) {
    result("It's a tie");
  } else {
    return false;
  }
}

function horizontalGame() {
  for (let i = 0; i <= 6; i += 3) {
    if (
      buttons[i].innerHTML != "" &&
      buttons[i + 1].innerHTML != "" &&
      buttons[i].innerHTML == buttons[i + 1].innerHTML &&
      buttons[i].innerHTML == buttons[i + 2].innerHTML
    ) {
      buttons[i].classList.add("horizontalLine");
      buttons[i + 1].classList.add("horizontalLine");
      buttons[i + 2].classList.add("horizontalLine");
      return true;
    }
  }
}

function verticalGame() {
  for (let i = 0; i <= 2; i++) {
    if (
      buttons[i].innerHTML != "" &&
      buttons[i + 3].innerHTML != "" &&
      buttons[i].innerHTML == buttons[i + 3].innerHTML &&
      buttons[i].innerHTML == buttons[i + 6].innerHTML
    ) {
      buttons[i].classList.add("verticalLine");
      buttons[i + 3].classList.add("verticalLine");
      buttons[i + 6].classList.add("verticalLine");
      return true;
    }
  }
}

function rightDiagonalGame() {
  if (
    buttons[4].innerHTML != "" &&
    buttons[0].innerHTML == buttons[4].innerHTML &&
    buttons[0].innerHTML == buttons[8].innerHTML
  ) {
    buttons[0].classList.add("rightDiagonalLine");
    buttons[4].classList.add("rightDiagonalLine");
    buttons[8].classList.add("rightDiagonalLine");
    return true;
  }
}

function leftDiagonalGame() {
  if (
    buttons[4].innerHTML != "" &&
    buttons[2].innerHTML == buttons[4].innerHTML &&
    buttons[2].innerHTML == buttons[6].innerHTML
  ) {
    buttons[2].classList.add("leftDiagonalLine");
    buttons[4].classList.add("leftDiagonalLine");
    buttons[6].classList.add("leftDiagonalLine");
    return true;
  }
}

//Show game result
function result(isGame) {
  messageGame.innerHTML =
    isGame == playerSide1
      ?  /* `¡${playerSide1}, ganaste!`*/ `¡Ganaste!`
      : isGame == playerSide2
      ? `¡${playerSide2}, ganaste!`
      : isGame;

  if  (isGame != "Es un empate"){
    if (isGame == playerSide1 && playChoose == 0) {
      ++pointsPlayer1;
    } else if (isGame == playerSide2 && playChoose == 0){
      ++pointsPlayer2;
    } else if (isGame == playerSide1 && times % 2 == 0 || isGame == playerSide2
      && times % 2 != 0) {
      ++pointsPlayer1;
    } else {
      ++pointsPlayer2;
    }

  }
 
  points.innerHTML = `${pointsPlayer1}-${pointsPlayer2}`;
  restart.removeAttribute("disabled");
  restart.classList.add("activeRestart");
}

//Restart
restart.addEventListener("click", finish);

function finish() {
  //Reset game values
  x.removeAttribute("disabled");
  o.removeAttribute("disabled");
  restart.disabled = true;
  restart.classList.remove("activeRestart");
  indices = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  indicesDisabled = new Set([]);
  playerGame = new Set([]);
  click = -1;
  indices.forEach((elem) => {
    buttons[elem].innerHTML = "";
    buttons[elem].removeAttribute("class");
  });

  ++times;
  messageGame.innerHTML =
    playChoose == 0
      ? "Elegí una opción"
      : times % 2 == 0
      ? "Jugador 1, elegí una opción"
      : "Jugador 2, elegí una opción";

  let ChosenOption = document.querySelector(".chosen");
  if (ChosenOption) {
    ChosenOption.classList.remove("chosen");
  }
}


function computerChoose(){
let put;
//let lastIndex;
let playerGame = new Set([]);
indicesDisabled.forEach(elem => {
  if(indicesDisabled.size >= 1 && buttons[elem].innerHTML == playerSide1){
    playerGame.add(elem)
    //console.log(playerGame.size)
  }
})

//let arr = [...playerGame];
//let lastIndex = playerGame.size == 1 ? arr[0] : arr[playerGame.size - 1];
console.log("SAadfgthy" + put)

put = 
(playerGame.has(4) && playerGame.has(8)) ||
(playerGame.has(1) && playerGame.has(2)) || 
(playerGame.has(3) && playerGame.has(6)) &&
buttons[0].innerHTML == "" ? 0:
(playerGame.has(0) && playerGame.has(2)) ||
(playerGame.has(4) && playerGame.has(7)) &&
buttons[1].innerHTML == "" ? 1:
(playerGame.has(0) && playerGame.has(1)) ||
(playerGame.has(4) && playerGame.has(6)) || 
(playerGame.has(5) && playerGame.has(8)) &&
buttons[2].innerHTML == "" ? 2:
(playerGame.has(4) && playerGame.has(5)) ||
(playerGame.has(0) && playerGame.has(6)) &&
buttons[3].innerHTML == "" ? 3:
(playerGame.has(3) && playerGame.has(5)) ||
(playerGame.has(0) && playerGame.has(8)) || 
(playerGame.has(2) && playerGame.has(6)) ||
(playerGame.has(1) && playerGame.has(7)) &&
buttons[4].innerHTML == "" ? 4:
(playerGame.has(3) && playerGame.has(4)) ||
(playerGame.has(2) && playerGame.has(8)) &&
buttons[5].innerHTML == "" ? 5:
(playerGame.has(7) && playerGame.has(8)) ||
(playerGame.has(0) && playerGame.has(3)) || 
(playerGame.has(2) && playerGame.has(4))  &&
buttons[6].innerHTML == "" ? 6:
(playerGame.has(6) && playerGame.has(8)) ||
(playerGame.has(1) && playerGame.has(4)) &&
buttons[7].innerHTML == "" ? 7:
(playerGame.has(6) && playerGame.has(7)) ||
(playerGame.has(0) && playerGame.has(4)) || 
(playerGame.has(2) && playerGame.has(5)) &&
buttons[8].innerHTML == "" ? 8:
undefined;
//newBoard.includes(4) && newBoard.includes(8) ? 0 :
//newBoard.includes(1) && newBoard.includes(2) ? 0 :
//newBoard.includes(3) && newBoard.includes(6) ? 0 :
//newBoard.includes(0) && newBoard.includes(2) ? 1 :
//newBoard.includes(4) && newBoard.includes(7) ? 1 :
//newBoard.includes(0) && newBoard.includes(1) ? 2 :
//newBoard.includes(4) && newBoard.includes(6) ? 2 :
//newBoard.includes(5) && newBoard.includes(8) ? 2 :
//newBoard.includes(4) && newBoard.includes(5) ? 3 :
//newBoard.includes(0) && newBoard.includes(6) ? 3 :
//newBoard.includes(3) && newBoard.includes(5) ? 4 :
//newBoard.includes(0) && newBoard.includes(8) ? 4 :
//newBoard.includes(2) && newBoard.includes(6) ? 4 :
//newBoard.includes(1) && newBoard.includes(7) ? 4 :
//newBoard.includes(3) && newBoard.includes(4) ? 5 :
//newBoard.includes(2) && newBoard.includes(8) ? 5 :
//newBoard.includes(7) && newBoard.includes(8) ? 6 :
//newBoard.includes(0) && newBoard.includes(3) ? 6 :
//newBoard.includes(2) && newBoard.includes(4) ? 6 :
//newBoard.includes(6) && newBoard.includes(8) ? 7 :
//newBoard.includes(1) && newBoard.includes(4) ? 7 :
//newBoard.includes(6) && newBoard.includes(7) ? 8 :
//newBoard.includes(0) && newBoard.includes(4) ? 8 :
//newBoard.includes(2) && newBoard.includes(5) ? 8 :


if(indices.size == 1){
  return undefined;

   
  }






  console.log(indicesDisabled)
  console.log(put)
  console.log(playerGame)

  if(put != undefined) return put;
  

}





