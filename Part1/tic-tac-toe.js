let board = [];
let boardSize = 9;
let turnCount = 0;
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let winner = false;
let endAfterWin = false;
let play = (boxNum) => {
    //Set element that is at box index that was clicked to a variable 
    const boxClicked = document.getElementById(`${boxNum}`);
    //Get text if there is any in the box to be used in check for player occupied
    const boxText = boxClicked.textContent;
    let currPlayer = document.getElementById('player');
    let currPLayerText = currPlayer.textContent;
    //Check if there is already a player occupying box, if not, add current player to the board.
    if (!boxText && !endAfterWin) {
        //Add "X" or "O" text to box that was clicked
        boxClicked.textContent = currPLayerText;
        //Add current player text to board array at clicked box index to check win conditions
        board[boxNum] = currPLayerText;
        turnCount++;
        if (!winner) {
            //Win check will iterate through winCombo. If a win combo has been completed the win boolean will always return true; If not it will return the win check of the next array in winCombo.
            winner = winCombos.reduce((win, arr) => {
                if (win) {
                    return win;
                }
                return win = arr.reduce((comboWin, num, index) => {
                    // If comboWIn is false and the current index is not the first element the win check has failed an will return false for the rest of the array
                    if (!comboWin && index > 0) {
                        return false;
                    }
                    return comboWin = board[num] === currPLayerText ? true : false;
                }, false);
            }, false);
        }
        if (!winner && turnCount === 9) {
            window.alert("Cat's Game");
            resetBoard();
        }
        if (winner) {
            //Get value for checkbox to lock game after someone wins.
            endAfterWin = document.getElementById('end').checked;
            window.alert(`${currPLayerText} is the winner!`);
            resetBoard();
        }
        // Once a box is clicked the current player's name will be updated to the other player
        currPlayer.textContent = currPLayerText === "X" ? "O" : "X";
    }

    //Check if the click was a winner!
    // if ((board[0] === currPLayerText && board[1] === currPLayerText && board[2] === currPLayerText) ||
    //     (board[3] === currPLayerText && board[4] === currPLayerText && board[5] === currPLayerText) ||
    //     (board[6] === currPLayerText && board[7] === currPLayerText && board[8] === currPLayerText) ||
    //     (board[0] === currPLayerText && board[3] === currPLayerText && board[6] === currPLayerText) ||
    //     (board[1] === currPLayerText && board[4] === currPLayerText && board[7] === currPLayerText) ||
    //     (board[2] === currPLayerText && board[5] === currPLayerText && board[8] === currPLayerText) ||
    //     (board[0] === currPLayerText && board[4] === currPLayerText && board[8] === currPLayerText) ||
    //     (board[2] === currPLayerText && board[4] === currPLayerText && board[6] === currPLayerText)) {
    //     winner = true;
    // }

}

const resetBoard = () => {
    winner = false;
    board = [];
    turnCount = 0;
    for (let i = 0; i < boardSize; i++) {
        document.getElementById(`${i}`).innerText = '';
    }
}