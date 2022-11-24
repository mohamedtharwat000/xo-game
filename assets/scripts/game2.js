// get the board buttons
const buttons = document.getElementsByClassName('button-option');

// get popup message element
const popup = document.getElementsByClassName('popup')[0];

// get restart button element
const restartBtn = document.getElementById('restart');

// get new game button element
const newGameBtn = document.getElementById('new-game');


// global variables
let value = 'X';
let valueChange = 1;
let clickCount = 0;
let xWin = false;
let oWin = false;
let draw = false;

// create a rows and columns objects to hold values
const rows = {row1: [], row2: [], row3: []};
const columns = {column1: [], column2: [], column3: []};

// add click event for every cell
for(let button of buttons) {
    button.addEventListener('click', game);
}

// code to handle restart the game and reset all to initial values
restart.addEventListener('click', restartFn);
newGameBtn.addEventListener('click', restartFn);

// main function with all game logic
function game() {
    clickCount += 1;

    _this = this
    _this.innerHTML = value;
    
    rowsColumns()
    whoWin();
    showPopup()

    valueChange *= -1;
    valueChange === 1 ? value = 'X' : value = 'O';

    if(xWin === true || oWin === true || draw === true) {
        for(let button of buttons) {
            button.removeEventListener('click', game);
        }
    }

    _this.removeEventListener('click', game);
}

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

        popup.classList.toggle('hide')
    }
}

// show popup message function
function showPopup() {
    if(draw === true) {
        popup.classList.toggle('hide')
        document.getElementById('message').innerHTML = 'draw';
    } else if(xWin === true) {
        popup.classList.toggle('hide')
        document.getElementById('message').innerHTML = 'X wins';
    } else if(oWin === true) {
        popup.classList.toggle('hide')
        document.getElementById('message').innerHTML = 'O wins';
    }


}

// this function to know who win X or O or it is a draw
function whoWin() {
    if(clickCount === 9) {
        draw = true;
    } else if(
        (rows.row1[0] === 'X' && rows.row1[1] === 'X' && rows.row1[2] === 'X') ||
        (rows.row2[0] === 'X' && rows.row2[1] === 'X' && rows.row2[2] === 'X') ||
        (rows.row3[0] === 'X' && rows.row3[1] === 'X' && rows.row3[2] === 'X') ||
        (columns.column1[0] === 'X' && columns.column1[1] === 'X' && columns.column1[2] === 'X') ||
        (columns.column2[0] === 'X' && columns.column2[1] === 'X' && columns.column2[2] === 'X') ||
        (columns.column3[0] === 'X' && columns.column3[1] === 'X' && columns.column3[2] === 'X') ||
        (rows.row1[0] === 'X' && rows.row2[1] === 'X' && rows.row3[2] === 'X') ||
        (rows.row1[2] === 'X' && rows.row2[1] === 'X' && rows.row3[0] === 'X')
    ) {
        xWin = true;
    } else if(
        (rows.row1[0] === 'O' && rows.row1[1] === 'O' && rows.row1[2] === 'O') ||
        (rows.row2[0] === 'O' && rows.row2[1] === 'O' && rows.row2[2] === 'O') ||
        (rows.row3[0] === 'O' && rows.row3[1] === 'O' && rows.row3[2] === 'O') ||
        (columns.column1[0] === 'O' && columns.column1[1] === 'O' && columns.column1[2] === 'O') ||
        (columns.column2[0] === 'O' && columns.column2[1] === 'O' && columns.column2[2] === 'O') ||
        (columns.column3[0] === 'O' && columns.column3[1] === 'O' && columns.column3[2] === 'O') ||
        (rows.row1[0] === 'O' && rows.row2[1] === 'O' && rows.row3[2] === 'O') ||
        (rows.row1[2] === 'O' && rows.row2[1] === 'O' && rows.row3[0] === 'O')
    ) {
        oWin = true;
    }
}

// this function add values to rows and columns object
function rowsColumns() {

    const row = _this.dataset.row;
    const column = _this.dataset.column;

    switch(true) {
        case (row === '1' && column === '1'):
            rows.row1[0] = value;
            columns.column1[0] = value;
            break;
        case (row === '1' && column === '2'):
            rows.row1[1] = value;
            columns.column2[0] = value;
            break;
        case (row === '1' && column === '3'):
            rows.row1[2] = value;
            columns.column3[0] = value;
            break;
        case (row === '2' && column === '1'):
            rows.row2[0] = value;
            columns.column1[1] = value;
            break;
        case (row === '2' && column === '2'):
            rows.row2[1] = value;
            columns.column2[1] = value;
            break;
        case (row === '2' && column === '3'):
            rows.row2[2] = value;
            columns.column3[1] = value;
            break;
        case (row === '3' && column === '1'):
            rows.row3[0] = value;
            columns.column1[2] = value;
            break;
        case (row === '3' && column === '2'):
            rows.row3[1] = value;
            columns.column2[2] = value;
            break;
        case (row === '3' && column === '3'):
            rows.row3[2] = value;
            columns.column3[2] = value;
            break;
    }
}