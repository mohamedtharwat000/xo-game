// main div that in page which choose playerX or playerO
const selectBox = document.querySelector(".select-box"),
  // button X
  selectBtnX = selectBox.querySelector(".options .playerX"),
  // button O
  selectBtnO = selectBox.querySelector(".options .playerO"),
  // main div that contain the game and the header which show the turn
  playBoard = document.querySelector(".play-board"),
  //   the header that show the turn
  players = document.querySelector(".players"),
  //   the boxes that contain the X or O
  allBox = document.querySelectorAll("section span"),
  // final page that show after the game is over
  resultBox = document.querySelector(".result-box"),
  //   the header that show the winner or loser
  wonText = resultBox.querySelector(".won-text"),
  //   the button that restart the game (select the first button )
  replayBtn = resultBox.querySelector("button");

// make array of  objects to store status and date of each game played
// became an old way
// let stateObject = [
//   {
//     state: "win",
//     date: "08:17:13AM, 25/10/2022",
//   },
//   {
//     state: "lose",
//     date: "08:17:13AM, 25/10/2022",
//   },
// ];

// console.log(csvString);

// variable to store state of the game (win or lose or draw)
let state = "";
// let player = "";

// variable to store my choice if i played with X or O
let myChoice = "";

// turn array of objects to json and save it in local storage
// function saveState() {
//   let stateJson = JSON.stringify(stateObject);
//   localStorage.setItem("state", stateJson);
// }

// function that save the History of the game in local storage
function SaveDataToLocalStorage(data) {
  var games = [];
  // Parse the serialized data back into an aray of objects
  games = JSON.parse(localStorage.getItem("gamesHistory")) || [];
  // Push the new data (whether it be an object or anything else) onto the array
  games.push(data);
  // Alert the array value
  console.log(games); // Should be something like [Object array]
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("gamesHistory", JSON.stringify(games));
}

// make a date like in the state object
function makeDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = strTime + ", " + day + "/" + month + "/" + year;
  return fullDate;
}

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
};
selectBtnX.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
};
selectBtnO.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  players.setAttribute("class", "players active player");
};
let playerXIcon = "fas fa-times",
  playerOIcon = "far fa-circle",
  playerSign = "X",
  runBot = true;

//   that fucntion is called when  box is clicked
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
    myChoice = "O";
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    element.setAttribute("id", playerSign);
    players.classList.add("active");
    myChoice = "X";
  }
  selectWinner();
  element.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none";
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomTimeDelay);
  //   console.log(playBoard);
  //   console.log(playerSign);
  //   player = playerSign;
}
function bot() {
  let array = [];
  if (runBot) {
    playerSign = "O";
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "X";
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        allBox[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}
function getIdVal(classname) {
  return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign) {
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
  return false;
}
function selectWinner() {
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
    }, 700);
    wonText.innerHTML = `Player ${playerSign}<br> won the game!`;

    //   if  player wins then store the status and date of the game in stateObject
    // if (playerSign == "X") {
    //   state = "won";
    //   date = new Date();
    //   player = "playerX";
    //   stateObject.push({ state, date, player });
    //   console.log(stateObject);
    // } else {
    //   state = "won";
    //   date = new Date();
    //   player = "playerO";
    //   stateObject.push({ state, date, player });
    //   console.log(stateObject);
    // }

    //   if  player wins then store the status and date of the game in stateObject
    if (playerSign == myChoice) {
      state = "win";
      date = new Date();
      // call date function
      let fullDate = makeDate();

      let objeWin = {
        state: state,
        date: fullDate,
      };
      //   stateObject.push({ state, date: fullDate });
      //   console.log(stateObject);

      //   saveState();
      SaveDataToLocalStorage(objeWin);
    } else {
      state = "lose";
      date = new Date();
      // call date function
      let obje = {
        state: "lose",
        date: makeDate(),
      };
      let fullDate = makeDate();
      //   stateObject.push({ state, date: fullDate });
      //   console.log(stateObject);
      //   saveState();
      SaveDataToLocalStorage(obje);
    }
    // state = "won";
    // date = new Date();
    // player = playerSign;
    // stateObject.push({ state, date, player });
    // console.log(stateObject);
  } else {
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700);
      wonText.textContent = "Match has been drawn!";
      console.log("Match has been drawn!");

      //   if  match is drawn then store the status and date of the game in stateObject
      state = "draw";
      date = new Date();
      // call date function
      let fullDate = makeDate();

      let objeDraw = {
        state: "draw",
        date: fullDate,
      };
      SaveDataToLocalStorage(objeDraw);
    }
  }
}
replayBtn.onclick = () => {
  window.location.reload();

  //   save stateObject in local storage
  //   saveState();
};

// console.log(stateObject);

// save stateObject in local storage
// localStorage.setItem("stateObject", JSON.stringify(stateObject));

//  get stateObject from local storage
// document.onload = () => {
//   let getStorage = localStorage.getItem("stateObject");
//   if (getStorage) {
//     stateObject = JSON.parse(getStorage);
//   }
//   console.log(stateObject);
// };

//export stateObject
// export default stateObject;
