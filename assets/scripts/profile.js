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

// Reset button
let resetBtn = document.querySelector(".resetProfile");
//pic of the player
let profilePic = document.getElementById("profilePic");
// input of file (image )
let uploadProfilePic = document.querySelector(".uploadProfilePic");

// div to insure that the user is sure to reset the profile
let divReset = document.querySelector(".resetData");
// button to confirm the reset
let confirmReset = document.querySelector(".resetProfileYes");
// button to cancel the reset
let cancelReset = document.querySelector(".resetProfileNo");
let saveEditProfile = document.getElementsByClassName("savePlayerName")[0];
let cancelEditProfile = document.getElementsByClassName("cancelPlayerName")[0];

let imgg = "";
// the edit button show the (input) which change the name of the player
//and (input image )  to change the image of the player
btnEditProfile.addEventListener("click", () => {
  divEditdata.classList.toggle("hidden");
  divReset.classList.add("hidden");
});

// cancel the edit and hide the input

//that function to change the image of the player
uploadProfilePic.addEventListener("change", function () {
  //   show image in profile pic
  if (uploadProfilePic.files && uploadProfilePic.files[0]) {
    var img = profilePic;
    img.onload = () => {
      URL.revokeObjectURL(img.src); // no longer needed, free memory
    };
    img.src = URL.createObjectURL(uploadProfilePic.files[0]); // set src to blob url
  }
});

// do same thing when click on save button
saveEditProfile.addEventListener("click", (e) => {
  playerName.textContent = changePlayerName.value;
  localStorage.setItem("playerName", changePlayerName.value);
  divEditdata.classList.toggle("hidden");
  if (uploadProfilePic.files && uploadProfilePic.files[0]) {
    var img = profilePic;
    img.onload = () => {
      URL.revokeObjectURL(img.src); // no longer needed, free memory
    };
    img.src = URL.createObjectURL(uploadProfilePic.files[0]); // set src to blob url
  }
  profilePic.addEventListener("load", function () {
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
      //   console.log("Profile picture saved.");
    } catch (e) {
      console.log("Storage failed: " + e);
    }
  });
});
cancelEditProfile.addEventListener("click", (e) => {
  divEditdata.classList.toggle("hidden");
  changePlayerName.value = "";
  //go back to profile pic
  imgg = localStorage.getItem("profilePic");
  //   if imgg is null then show default image
  if (imgg === null) {
    profilePic.src = "../assets/Images/profile/avatar.jpg";
  } else {
    profilePic.src = imgg;
  }
  // Take action when the image has loaded (save it in local storage)
  profilePic.addEventListener(
    "load",
    function () {
      var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

      // Make sure canvas is as big as the picture
      imgCanvas.width = profilePic.width;
      imgCanvas.height = profilePic.height;

      // Draw image into canvas element
      imgContext.drawImage(
        profilePic,
        0,
        0,
        profilePic.width,
        profilePic.height
      );

      // Get canvas contents as a data URL
      var imgAsDataURL = imgCanvas.toDataURL("image/png");

      // Save image into localStorage
      try {
        localStorage.setItem("profilePic", imgAsDataURL);
        //   console.log("Profile picture saved.");
      } catch (e) {
        console.log("Storage failed: " + e);
      }
    },
    false
  );
});

//load recent games history from local storage if exist
const getRecentGamesData = () => {
  // get gamesHistory from local storage
  let data = JSON.parse(localStorage.getItem("gamesHistory")) || [];
  return data;
};

//that to put recent games history in array and show later in profile.html
let arrStdata = [];
for (let i = 0; i < getRecentGamesData().length; i++) {
  arri = [getRecentGamesData()[i].state, getRecentGamesData()[i].date];
  arrStdata.push(arri);
}
console.log(arrStdata);

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
  //   historyList.appendChild(div);
}
// console.log(arrStdata);
// console.log(historyList);

// add historyList to local storage
localStorage.setItem("historyList", JSON.stringify(arrStdata));

// get historyList from local storage

let historyListData = JSON.parse(localStorage.getItem("historyList"));

// console.log(arrData);
// console.log(arrStdata);
const getProfileStatus = () => {
  const data = {
    wins: 0,
    losses: 0,
    draw: 0,
  };

  // get gamesHistory from local storage
  let datas = JSON.parse(localStorage.getItem("gamesHistory")) || [];
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].state === "win") {
      data.wins++;
    } else if (datas[i].state === "lose") {
      data.losses++;
    } else {
      data.draw++;
    }
  }
  return data;
};

let wins = getProfileStatus().wins;
let losses = getProfileStatus().losses;
let draw = getProfileStatus().draw;

// add wins , losses , draw to local storage

localStorage.setItem("wins", wins);
localStorage.setItem("losses", losses);
localStorage.setItem("draw", draw);

countTotal.innerHTML = wins + losses + draw;
countWins.innerHTML = wins;
countLosses.innerHTML = losses;
countDraw.innerHTML = draw;

// calculate rate
let rateValue = (getProfileStatus().wins / countTotal.innerHTML) * 100;

// add rateValue to rate innerHTML if rateValue is not NaN
if (!isNaN(rateValue)) {
  rate.innerHTML = rateValue.toFixed(2);
} else {
  rate.innerHTML = "0";
}

// reset button clear all data from page and local storage
resetBtn.addEventListener("click", () => {
  //   localStorage.clear();
  //   location.reload();
  //show popup to confirm reset
  divReset.classList.toggle("hidden");

  //   remove div of edit file
  divEditdata.classList.add("hidden");

  // confirm reset
  confirmReset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
  // cancel reset
  cancelReset.addEventListener("click", () => {
    divReset.classList.add("hidden");
  });
});

// get data from local storage  and show it in profile.html
// make that with document because it's faster than window
document.addEventListener("DOMContentLoaded", function () {
  // log profilePic
  console.log(profilePic);

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
  //   rate.innerHTML = rateValue.toFixed(2);

  if (!isNaN(rateValue)) {
    rate.innerHTML = rateValue.toFixed(2);
  } else {
    rate.innerHTML = "0";
  }

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
