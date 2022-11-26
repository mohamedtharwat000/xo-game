// get choose letter buttons
const chooseLetter = document.getElementsByClassName('letter-button');

// get the board buttons
const buttons = document.getElementsByClassName('button-option');
const buttonsArr = Array.from(buttons);

// get restart button element
const restartBtn = document.getElementById('restart');

// get new game button element
const newGameBtn = document.getElementById('new-game');

// get popup message element
const popup = document.getElementById('who-win');

// player data
const player = {letter: ''}

// board matrix
const matrixButtons = {
    rows: {
        row1: [buttonsArr[0], buttonsArr[1], buttonsArr[2]], 
        row2: [buttonsArr[3], buttonsArr[4], buttonsArr[5]], 
        row3: [buttonsArr[6], buttonsArr[7], buttonsArr[8]]
    },
    columns: {
        column1: [buttonsArr[0], buttonsArr[3], buttonsArr[6]], 
        column2: [buttonsArr[1], buttonsArr[4], buttonsArr[7]], 
        column3: [buttonsArr[2], buttonsArr[5], buttonsArr[8]]
    },
    diagonals: {
        diagonal1: [buttonsArr[0], buttonsArr[4], buttonsArr[8]], 
        diagonal2: [buttonsArr[2], buttonsArr[4], buttonsArr[6]]
    }
};
const matrixValues = {
    rows: {
        row1: [],
        row2: [],
        row3: []
    },
    columns: {
        column1: [],
        column2: [],
        column3: []
    },
    diagonals: {
        diagonal1: [],
        diagonal2: [],
        diagonal3: []
    }
};

// global variables
let value = 'X';
let clickCount = 0;
let xWin = false;
let oWin = false;
let draw = false;


// start game logic ///////////////////////////////////////////////////////////

// choose player letter function
for(let letter of chooseLetter) {
    letter.addEventListener('click', function() {
        player.letter = letter.innerHTML
        value = player.letter
        letter.parentElement.parentElement.classList.add('hide')
    })
}

// add click event for every cell
for(let button of buttons) {
    button.addEventListener('click', game);
}

// main function with all game logic
function game(event) {
    clickCount++;
    event.target.innerHTML = value;

    fillMatrix(event.target)
    winner();
    showPopup()
    
    value = value === 'X' ? value = 'O' : value = 'X'

    for(let button of buttons) {
        button.removeEventListener('click', game);
    }

    setTimeout(nextMove, 1000);
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
        clickCount = 0;
        xWin = false;
        oWin = false;
        draw = false;

        matrixValues.rows.row1 = [];
        matrixValues.rows.row2 = [];
        matrixValues.rows.row3 = [];
        matrixValues.columns.column1 = [];
        matrixValues.columns.column2 = [];
        matrixValues.columns.column3 = [];
        matrixValues.diagonals.diagonal1 = [];
        matrixValues.diagonals.diagonal2 = [];


        player.letter = '';

        buttonsArr.forEach(function(value, index, arr) {
            if(value === arr[4]) {
                value.dataset.priority = '2';
            } else {
                value.dataset.priority = '1';
            }
        });

        if(!popup.classList.contains('hide')) {
            popup.classList.add('hide');
        }

        if(chooseLetter[0].parentElement.parentElement.classList.contains('hide')) {
            chooseLetter[0].parentElement.parentElement.classList.remove('hide');
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
            matrixValues.rows.row1[0] = value;
            matrixValues.columns.column1[0] = value;
            matrixValues.diagonals.diagonal1[0] = value;
            break;
        case (row === '1' && column === '2'):
            matrixValues.rows.row1[1] = value;
            matrixValues.columns.column2[0] = value;
            break;
        case (row === '1' && column === '3'):
            matrixValues.rows.row1[2] = value;
            matrixValues.columns.column3[0] = value;
            matrixValues.diagonals.diagonal2[0] = value;
            break;
        case (row === '2' && column === '1'):
            matrixValues.rows.row2[0] = value;
            matrixValues.columns.column1[1] = value;
            break;
        case (row === '2' && column === '2'):
            matrixValues.rows.row2[1] = value;
            matrixValues.columns.column2[1] = value;
            matrixValues.diagonals.diagonal1[1] = value;
            matrixValues.diagonals.diagonal2[1] = value;
            break;
        case (row === '2' && column === '3'):
            matrixValues.rows.row2[2] = value;
            matrixValues.columns.column3[1] = value;
            break;
        case (row === '3' && column === '1'):
            matrixValues.rows.row3[0] = value;
            matrixValues.columns.column1[2] = value;
            matrixValues.diagonals.diagonal2[2] = value;
            break;
        case (row === '3' && column === '2'):
            matrixValues.rows.row3[1] = value;
            matrixValues.columns.column2[2] = value;
            break;
        case (row === '3' && column === '3'):
            matrixValues.rows.row3[2] = value;
            matrixValues.columns.column3[2] = value;
            matrixValues.diagonals.diagonal1[2] = value;
            break;
    }
}

// this function to know who win X or O or it is a draw
function winner() {

    for(let a in matrixValues) {
        for(let b in matrixValues[a]) {
            let xCounter = 0;
            let oCounter = 0;
            for(let value of matrixValues[a][b]) {
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

// show popup message function
function showPopup() {

    if(draw === true || xWin === true || oWin === true) {
        popup.classList.remove('hide')

        if(draw === true) {
            document.getElementById('win-message').innerHTML = 'draw';
        } else if(xWin === true) {
            document.getElementById('win-message').innerHTML = 'X wins';
        } else if(oWin === true) {
            document.getElementById('win-message').innerHTML = 'O wins';
        }
    } 
}

// next move function
function nextMove() {
    clickCount++;

    for(let a in matrixButtons) {
        for(let b in matrixButtons[a]) {
            for(let c in matrixButtons[a][b]) {
                switch(c) {

                    case '0':
                        // start medium mode function
                        if(matrixValues[a][b][c] === 'X' || matrixValues[a][b][c] === 'O') {
                            matrixButtons[a][b][1].dataset.priority = 
                            (4 + Number(matrixButtons[a][b][1].dataset.priority)).toString();
                            matrixButtons[a][b][2].dataset.priority = 
                            (2 + Number(matrixButtons[a][b][2].dataset.priority)).toString();
                        // end medium mode function
                            
                            // start hard mode function
                            if(matrixValues[a][b][c] === matrixValues[a][b][1]) {
                                matrixButtons[a][b][2].dataset.priority = 
                                (2 * Number(matrixButtons[a][b][2].dataset.priority)).toString();
                            } else if(matrixValues[a][b][c] === matrixValues[a][b][2]) {
                                matrixButtons[a][b][1].dataset.priority = 
                                (2 * Number(matrixButtons[a][b][1].dataset.priority)).toString();
                            }
                            // end hard mode function
                        }
                        break;

                    case '1':
                        // start medium mode function
                        if(matrixValues[a][b][c] === 'X' || matrixValues[a][b][c] === 'O') {
                            matrixButtons[a][b][0].dataset.priority = 
                            (2 + Number(matrixButtons[a][b][0].dataset.priority)).toString();
                            matrixButtons[a][b][2].dataset.priority = 
                            (2 + Number(matrixButtons[a][b][2].dataset.priority)).toString();
                        // end medium mode function

                            // start hard mode function
                            if(matrixValues[a][b][c] === matrixValues[a][b][0]) {
                                matrixButtons[a][b][2].dataset.priority = 
                                (2 * Number(matrixButtons[a][b][2].dataset.priority)).toString();
                            } else if(matrixValues[a][b][c] === matrixValues[a][b][2]) {
                                matrixButtons[a][b][0].dataset.priority = 
                                (2 * Number(matrixButtons[a][b][0].dataset.priority)).toString();
                            }
                            // end hard mode function
                        }
                        break;

                    case '2':
                        // start medium mode function
                        if(matrixValues[a][b][c] === 'X' || matrixValues[a][b][c] === 'O') {
                            matrixButtons[a][b][0].dataset.priority = 
                            (2 + Number(matrixButtons[a][b][0].dataset.priority)).toString();
                            matrixButtons[a][b][1].dataset.priority = 
                            (4 + Number(matrixButtons[a][b][1].dataset.priority)).toString();
                        // end medium mode function

                            // start hard mode function
                            if(matrixValues[a][b][c] === matrixValues[a][b][0]) {
                                matrixButtons[a][b][1].dataset.priority = 
                                (2 * Number(matrixButtons[a][b][1].dataset.priority)).toString();
                            } else if(matrixValues[a][b][c] === matrixValues[a][b][1]) {
                                matrixButtons[a][b][0].dataset.priority = 
                                (2 * Number(matrixButtons[a][b][0].dataset.priority)).toString();
                            }
                            // end hard mode function
                        }
                        break;
                }
            }
        }
    }

    buttonsArr.sort(function(a, b) {
        return Number(b.dataset.priority) - Number(a.dataset.priority)
    });
    
    const emptyButtonsArr = buttonsArr.filter(function(value, index, arr) {
        return value.innerHTML === '';
    })
    
    if(emptyButtonsArr[0] === undefined) {
        winner();
        showPopup()
        return;
    }

    emptyButtonsArr[0].innerHTML = value;

    winner();
    showPopup()

    for(let button of buttons) {
        if(button.innerHTML === '') {
            button.addEventListener('click', game);
        }
    }

    value = value === 'X' ? value = 'O' : value = 'X'

}