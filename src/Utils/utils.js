// Calculate winner of the tic-tac-toe game
export const calculateWinner = (squares, recentIndex, boardSize, consecutiveSquare) => {
    const col = Math.floor(recentIndex % boardSize);
    const row = Math.floor(recentIndex / boardSize);

    // Get value of the recent cell
    const squareValue = squares[recentIndex];
    if (squareValue == null || recentIndex == null) {
        return null;
    }

    let indexSquareWinLine = [];
    //indexSquareWinLine.push(recentIndex);
    var i = 1;
    var count = 1;

    /* Check col */

    // Check top cell
    var cellIndex = recentIndex - (i * boardSize);
    while (cellIndex >= 0 && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex])
        }
        cellIndex = recentIndex - (i * boardSize)
    }

    // Check bottom cell
    i = 1;
    cellIndex = recentIndex + (i * boardSize);
    while (cellIndex < boardSize * boardSize && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex])
        }
        cellIndex = recentIndex + (i * boardSize)
    }

    /* Check row */
    i = 1;
    count = 1;
    cellIndex = recentIndex - i;
    indexSquareWinLine = [];
    // Check left cell
    while (cellIndex >= row * boardSize && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex]);
        }
        cellIndex = recentIndex - i;
    }

    // Check right cell
    i = 1;
    cellIndex = recentIndex + i;
    while (cellIndex < (row * boardSize + boardSize) && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex]);
        }
        cellIndex = recentIndex + i;
    }

    /* Check main diag "\" */

    // Check top left cell
    i = 1;
    count = 1;
    cellIndex = recentIndex - i * boardSize - i;
    indexSquareWinLine = [];
    while (cellIndex >= 0 && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex]);
        }
        cellIndex = recentIndex - i * boardSize - i;
    }

    // Check bottom right cell
    i = 1;
    cellIndex = recentIndex + i * boardSize + i;
    while (cellIndex < boardSize * boardSize && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex]);
        }
        cellIndex = recentIndex + i * boardSize + i;
    }

    /* Check sub diag "/" */

    // Check top right cell
    i = 1;
    count = 1;
    cellIndex = recentIndex - i * boardSize + i;
    indexSquareWinLine = [];
    while (cellIndex >= boardSize - 1 && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex]);
        }
        cellIndex = recentIndex - i * boardSize + i;
    }

    // Check bottom left cell
    i = 1;
    cellIndex = recentIndex + i * boardSize - i;
    while (cellIndex < boardSize * boardSize - boardSize / 2 && squares[cellIndex] === squareValue) {
        count++;
        i++;
        indexSquareWinLine.push(cellIndex);
        if (count === consecutiveSquare) {
            return indexSquareWinLine.concat([recentIndex]);
        }
        cellIndex = recentIndex + i * boardSize - i;
    }
    return null;
}
