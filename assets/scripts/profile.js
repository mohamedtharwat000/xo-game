// import all needed from profile.html file and save them in variables
let historyList = document.querySelector(".history-list ");
let countWins = document.querySelector(".count-wins span");
let countLosses = document.querySelector(".count-losses span");
let countDraw = document.querySelector(".count-draws span");
let countTotal = document.querySelector(".count-total   span");
let rate = document.querySelector(".count-rate  span");

let playerName = document.querySelector(".playerName");
let changePlayerName = document.getElementById("changePlayerName");
let divEditdata = document.querySelector(".editData");
let btnEditProfile = document.querySelector(".editProfile");
// console.log(countDraw);
// console.log(historyList);

// Reset button
let resetBtn = document.querySelector(".resetProfile");

btnEditProfile.addEventListener("click", () => {
  divEditdata.classList.toggle("hidden");
});

let profilePic = document.getElementById("profilePic");
console.log(profilePic);
let uploadProfilePic = document.querySelector(".uploadProfilePic");

// change player name when input value in changePlayerName input to playerName
changePlayerName.addEventListener("change", (e) => {
  playerName.textContent = e.target.value;

  //   add player name to local storage
  localStorage.setItem("playerName", e.target.value);
});
changePlayerName.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    playerName.textContent = e.target.value;

    //   add player name to local storage
    localStorage.setItem("playerName", e.target.value);
  }
});

uploadProfilePic.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    var img = profilePic;
    img.onload = () => {
      URL.revokeObjectURL(img.src); // no longer needed, free memory
    };

    img.src = URL.createObjectURL(this.files[0]); // set src to blob url

    // imgData = getBase64Image(img);
    // localStorage.setItem("imgData", imgData);
    // localStorage.setItem("profilePic", img.src);
  }
  //save image to local storage
});

// Take action when the image has loaded
profilePic.addEventListener(
  "load",
  function () {
    var imgCanvas = document.createElement("canvas"),
      imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = profilePic.width;
    imgCanvas.height = profilePic.height;

    // Draw image into canvas element
    imgContext.drawImage(profilePic, 0, 0, profilePic.width, profilePic.height);

    // Get canvas contents as a data URL
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
      localStorage.setItem("profilePic", imgAsDataURL);
      console.log("Profile picture saved.");
    } catch (e) {
      console.log("Storage failed: " + e);
    }
  },
  false
);

const getRecentGamesData = () => {
  const data = [
    {
      status: "win",
      date: "08:17:13AM, 25/10/2022",
    },
    {
      status: "lose",
      date: "12:17:13AM, 22/10/2022",
    },
    {
      status: "lose",
      date: "03:17:13PM, 21/10/2022",
    },
    {
      status: "win",
      date: "01:17:13AM, 21/10/2022",
    },
    {
      status: "draw",
      date: "11:17:13AM, 20/10/2022",
    },
  ];

  return data;
};

// destructuring RecentGamesData

// save objects in data in array

// let arrData = [];
let arrStdata = [];

for (let i = 0; i < getRecentGamesData().length; i++) {
  arri = [getRecentGamesData()[i].status, getRecentGamesData()[i].date];
  arrStdata.push(arri);
  //   arrData.push(getRecentGamesData()[i]);
}

// add all arrStdata to historyList inside a div

for (let i = 0; i < arrStdata.length; i++) {
  let div = document.createElement("div");
  if (arrStdata[i][0] === "win") {
    div.classList.add("win");
  } else if (arrStdata[i][0] === "lose") {
    div.classList.add("lose");
  } else {
    div.classList.add("draw");
  }
  div.innerHTML = `
    <div class="history-item__status">
    <div class="history-item__status--${arrStdata[i][0]}"></div>
    </div>
    <div class="history-item__date">${arrStdata[i][1]}</div>
    `;
  historyList.appendChild(div);
}

// add historyList to local storage

localStorage.setItem("historyList", JSON.stringify(arrStdata));

// get historyList from local storage

let historyListData = JSON.parse(localStorage.getItem("historyList"));

// console.log(arrData);
console.log(arrStdata);
const getProfileStatus = () => {
  const data = {
    wins: 20,
    losses: 50,
    draw: 30,
  };

  return data;
};

let wins = getProfileStatus().wins;
let losses = getProfileStatus().losses;
let draw = getProfileStatus().draw;

// add wins , losses , draw to local storage

localStorage.setItem("wins", wins);
localStorage.setItem("losses", losses);
localStorage.setItem("draw", draw);

// pass value of wins losses and draw to countWins countLosses and countDraw
// countTotal.innerHTML =
//   getProfileStatus().wins + getProfileStatus().losses + getProfileStatus().draw;
// countWins.innerHTML = getProfileStatus().wins;
// countLosses.innerHTML = getProfileStatus().losses;
// countDraw.innerHTML = getProfileStatus().draw;

countTotal.innerHTML = wins + losses + draw;
countWins.innerHTML = wins;
countLosses.innerHTML = losses;
countDraw.innerHTML = draw;

// calculate rate
let rateValue = (getProfileStatus().wins / countTotal.innerHTML) * 100;
rate.innerHTML = rateValue.toFixed(2);

// get data from local storage when page is loaded

// window.addEventListener("load", function () {
// get profilePic from local storage
//   let profilePicData = localStorage.getItem("profilePic");
//   if (profilePicData) {
//     profilePic.src = profilePicData;
//   }
// });

// reset button clear all data from page and local storage
resetBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// make that with document because it's faster than window
document.addEventListener("DOMContentLoaded", function () {
  // get profilePic from local storage
  let profilePicData = localStorage.getItem("profilePic");
  if (profilePicData) {
    profilePic.src = profilePicData;
  }

  // get playerName from local storage
  let playerNameData = localStorage.getItem("playerName");
  if (playerNameData) {
    playerName.textContent = playerNameData;
  }

  //   get wins , losses , draw from local storage
  let winsData = localStorage.getItem("wins");
  let lossesData = localStorage.getItem("losses");
  let drawData = localStorage.getItem("draw");
  if (winsData && lossesData && drawData) {
    // show total as numbers not string
    countTotal.innerHTML = +winsData + +lossesData + +drawData;
    countWins.innerHTML = winsData;
    countLosses.innerHTML = lossesData;
    countDraw.innerHTML = drawData;
  }
  // calculate rate
  let rateValue = (winsData / countTotal.innerHTML) * 100;
  rate.innerHTML = rateValue.toFixed(2);

  // get historyList from local storage
  let historyListData = JSON.parse(localStorage.getItem("historyList"));
  if (historyListData) {
    for (let i = 0; i < historyListData.length; i++) {
      let div = document.createElement("div");
      if (historyListData[i][0] === "win") {
        div.classList.add("win");
      } else if (historyListData[i][0] === "lose") {
        div.classList.add("lose");
      } else {
        div.classList.add("draw");
      }
      div.innerHTML = `
            <div class="history-item__status">
            <div class="history-item__status--${historyListData[i][0]}"></div>
            </div>
            <div class="history-item__date">${historyListData[i][1]}</div>
            `;
      historyList.appendChild(div);
    }
  }
});
