// get choose letter buttons
const chooseLetter = document.getElementsByClassName('letter-button');

// get the board buttons
const buttons = document.getElementsByClassName('button-option');

// get restart button element
const restartBtn = document.getElementById('restart');

// get new game button element
const newGameBtn = document.getElementById('new-game');

// get popup message element
const popup = document.getElementById('who-win');

// player data
const player = {letter: '', win: false}

// board matrix
const rows = {row1: [], row2: [], row3: []};
const columns = {column1: [], column2: [], column3: []};
const diagonals = {diagonal1: [], diagonal2: []};
const matrix = {rows, columns, diagonals};

// global variables
let value = player.letter === 'X' ? 'X' : player.letter === 'O' ? 'O' : 'X';
let valueChange = 1;
let clickCount = 0;
let xWin = false;
let oWin = false;
let draw = false;


// start game logic ///////////////////////////////////////////////////////////

// choose player letter function
for(let letter of chooseLetter) {
    letter.addEventListener('click', function() {
        player.letter = letter.innerHTML
        letter.parentElement.parentElement.classList.toggle('hide')
    })
}

// add click event for every cell
for(let button of buttons) {
    button.addEventListener('click', game);
}

// main function with all game logic
function game(event) {
    event.target.innerHTML = value;
    clickCount++;

    fillMatrix(event.target)
    winner();
    userData()
    showPopup()
    
    valueChange *= -1;
    valueChange === 1 ? value = 'X' : value = 'O';
    event.target.removeEventListener('click', game);
}

// code to handle restart the game and reset all to initial values
restartBtn.addEventListener('click', restartFn);
newGameBtn.addEventListener('click', restartFn);


// restart function
function restartFn() {
    
    for(button of buttons) {
        button.innerHTML = '';
        button.addEventListener('click', game);

        value = 'X';
        valueChange = 1;
        clickCount = 0;
        xWin = false;
        oWin = false;
        draw = false;

        rows.row1 = [];
        rows.row2 = [];
        rows.row3 = [];
        columns.column1 = [];
        columns.column2 = [];
        columns.column3 = [];
        diagonals.diagonal1 = [];
        diagonals.diagonal2 = [];

        player.letter = '';
        player.win = false;

        if(!popup.classList.contains('hide')) {
            popup.classList.toggle('hide');
        }

        if(chooseLetter[0].parentElement.parentElement.classList.contains('hide')) {
            chooseLetter[0].parentElement.parentElement.classList.toggle('hide');
        }
    }
}

// helper function used in main function

// this function add values to rows and columns object
function fillMatrix(target) {

    const row = target.dataset.row;
    const column = target.dataset.column;

    switch(true) {
        case (row === '1' && column === '1'):
            rows.row1[0] = value;
            columns.column1[0] = value;
            diagonals.diagonal1[0] = value;
            break;
        case (row === '1' && column === '2'):
            rows.row1[1] = value;
            columns.column2[0] = value;
            break;
        case (row === '1' && column === '3'):
            rows.row1[2] = value;
            columns.column3[0] = value;
            diagonals.diagonal2[0] = value;
            break;
        case (row === '2' && column === '1'):
            rows.row2[0] = value;
            columns.column1[1] = value;
            break;
        case (row === '2' && column === '2'):
            rows.row2[1] = value;
            columns.column2[1] = value;
            diagonals.diagonal1[1] = value;
            diagonals.diagonal2[1] = value;
            break;
        case (row === '2' && column === '3'):
            rows.row2[2] = value;
            columns.column3[1] = value;
            break;
        case (row === '3' && column === '1'):
            rows.row3[0] = value;
            columns.column1[2] = value;
            diagonals.diagonal2[2] = value;
            break;
        case (row === '3' && column === '2'):
            rows.row3[1] = value;
            columns.column2[2] = value;
            break;
        case (row === '3' && column === '3'):
            rows.row3[2] = value;
            columns.column3[2] = value;
            diagonals.diagonal1[2] = value;
            break;
    }
}

// this function to know who win X or O or it is a draw
function winner() {

    for(let a in matrix) {
        for(let b in matrix[a]) {
            let xCounter = 0;
            let oCounter = 0;
            for(let value of matrix[a][b]) {
                if(value === 'X') {
                    xCounter++;
                    if(xCounter === 3) {
                        xWin = true;
                        xCounter = 0;
                    }
                } else if(value === 'O') {
                    oCounter++;
                    if(oCounter === 3) {
                        oWin = true;
                        oCounter = 0;
                    }
                }
            }
        }
    }

    if(clickCount === 9) {
        draw = true;
    }
}

// update player object data
function userData() {

    if(draw === true) {
        player.win = 'draw';
    } else if(xWin === true && player.letter === 'X') {
        player.win = true;
    } else if(oWin === true && player.letter === 'O') {
        player.win = true;
    }
}

// show popup message function
function showPopup() {

    if(draw === true || xWin === true || oWin === true) {

        popup.classList.toggle('hide')

        if(draw === true) {
            document.getElementById('win-message').innerHTML = 'draw';
        } else if(xWin === true) {
            document.getElementById('win-message').innerHTML = 'X wins';
        } else if(oWin === true) {
            document.getElementById('win-message').innerHTML = 'O wins';
        }
    } 
}