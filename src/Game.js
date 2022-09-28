import { useState } from "react"
import './index.css';
import Board from "./Component/Board";

function calculateWinner(squares, index, boardSize) {
    const col = Math.floor(index % boardSize);
    const row = Math.floor(index / boardSize);

    const squareValue = squares[index];
    if (squareValue == null || index == null) {
        return null;
    }
    var i = 0;
    // Check col
    for (i = 0; i < boardSize; i++) {
        if (squares[col + i * boardSize] !== squareValue) {
            break;
        }
        if (i === boardSize - 1) {
            console.log("Win col")
            let indexSquareWinLine = [];
            for (let j = 0; j < boardSize; j++) {
                indexSquareWinLine.push(col + j * boardSize)
            }
            return indexSquareWinLine
        }
    }

    // Check row
    for (i = 0; i < boardSize; i++) {
        if (squares[row * boardSize + i] !== squareValue) {
            break;
        }
        if (i === boardSize - 1) {
            console.log("Win row")
            let indexSquareWinLine = [];
            for (let j = 0; j < boardSize; j++) {
                indexSquareWinLine.push(row * boardSize + j)
            }
            return indexSquareWinLine
        }
    }

    // Check diag
    if (col === row) {
        for (i = 0; i < boardSize; i++) {
            if (squares[(boardSize + 1) * i] !== squareValue) {
                break;
            }

            if (i === boardSize - 1) {
                console.log("Win diag")
                let indexSquareWinLine = [];
                for (let j = 0; j < boardSize; j++) {
                    indexSquareWinLine.push((boardSize + 1) * j)
                }
                return indexSquareWinLine
            }
        }

    }
    // Check inverse diag
    if (row === 4 - col) {
        for (i = 1; i <= boardSize; i++) {
            if (squares[(boardSize - 1) * i] !== squareValue) {
                break;
            }

            if (i === boardSize) {
                console.log("Win inverse diag")
                let indexSquareWinLine = [];
                for (let j = 1; j <= boardSize; j++) {
                    indexSquareWinLine.push((boardSize - 1) * j)
                }
                return indexSquareWinLine
            }
        }

    }

    return null;
}

function checkDraw(step, boardSize) {
    return step === boardSize * boardSize;
}

function Game() {
    const boardSize = 5;
    // Initial state
    const [history, setHistory] = useState([{
        squares: Array(boardSize * boardSize).fill(null)
    }]);
    const [locationHistory, setLocationHistory] = useState([{
        col: -1,
        row: -1
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [recentCell, setRecentCell] = useState(null);
    const [order, setOrder] = useState(true); // true mean asc

    // Handle click Square
    const handleClick = (i) => {
        const theHistory = history.slice(0, stepNumber + 1);
        const current = theHistory[theHistory.length - 1];
        const squares = current.squares.slice();
        const theLocationHistory = locationHistory.slice(0, stepNumber + 1);

        if (squares[i]) {
            return;
        }
        if (calculateWinner(current.squares, recentCell, boardSize)) {
            return;
        }

        // Check draw
        if (checkDraw(stepNumber, boardSize)) {
            return;
        }

        squares[i] = xIsNext ? "X" : "O";
        setHistory(theHistory.concat([{
            squares: squares
        }]))
        setLocationHistory(theLocationHistory.concat([{
            col: Math.floor(i % boardSize),
            row: Math.floor(i / boardSize)
        }]))
        setStepNumber(theHistory.length)
        setXIsNext(!xIsNext)
        setRecentCell(i);

    }

    const jumpTo = (step) => {
        const col = locationHistory[step] ? locationHistory[step].col : -1;
        const row = locationHistory[step] ? locationHistory[step].row : -1;
        const recentCell = col + row * boardSize;
        setRecentCell(recentCell);
        setStepNumber(step);
        setXIsNext((step % 2) === 0)
    }

    const toggleOrder = () => {
        console.log("Order: ", order);
        setOrder(!order);
    }
    const theHistory = history;
    const current = theHistory[stepNumber];
    const winner = calculateWinner(current.squares, recentCell, boardSize);
    const drawMatch = checkDraw(stepNumber, boardSize);

    const moves = theHistory.map((step, move) => {

        if (!order) {
            move = theHistory.length - 1 - move;
        }

        const col = locationHistory[move] ? locationHistory[move].col : "";
        const row = locationHistory[move] ? locationHistory[move].row : "";

        const desc = move ?
            'Go to move #' + '(' + col + ',' + row + ')' :
            'Go to game start';
        return (
            <li name="listItem" key={move}>
                <button style={stepNumber === move ? { fontWeight: "bold" } : { fontWeight: "normal" }} onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    let winSquares;
    if (winner) {
        status = "Winner: " + winner;
        winSquares = winner;
        console.log(winSquares)
    } else if (drawMatch) {
        status = "Draw";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                    winSquares={winSquares}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => toggleOrder()}>Toggle</button>
                <ol>{moves}</ol>
            </div>
        </div>
    );

}

export default Game;
