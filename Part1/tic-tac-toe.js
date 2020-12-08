const board = [];
let turnCount = 0;
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let boardSize = document.getElementById('')
let winner = false;
let play = (boxNum) => {
    const boxClicked = document.getElementById(`${boxNum}`);
    let currPlayer = document.getElementById('player');
    let currPLayerText = currPlayer.textContent;
    board[boxNum] = currPLayerText;
    turnCount++;
    console.log(board)
    console.log(turnCount)
    //Add "X" or "O" text to box that was clicked
    boxClicked.textContent = currPLayerText;
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
    if (!winner) {
        //Win check will iterate through winCombo. If a win combo has been completed the win boolean will always return true; If not it will check the not it will return the win check of the next array in winCombo.
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
    }
    if (winner) {
        window.alert(`${currPLayerText} is the winner!`);
    }
    // Once a box is clicked the current player's name will be updated to the other player
    currPlayer.textContent = currPLayerText === "X" ? "O" : "X";


}