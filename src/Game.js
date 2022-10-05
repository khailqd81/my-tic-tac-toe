import React, { useState } from "react"
import './index.css';

import Board from "./Component/Board";
import { calculateWinner } from "./Utils/utils";

function Game() {
    // Initial state
    const [boardSize, setBoardSize] = useState(10);
    const [history, setHistory] = useState([{
        squares: Array(boardSize * boardSize).fill(null),
        location: {
            col: -1,
            row: -1,
        }
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [recentCell, setRecentCell] = useState(null);
    const [order, setOrder] = useState(true); // true mean asc

    // Consecutive square to win tic-tac-toe-game
    const consecutiveSquare = 5;

    const checkDraw = (step, boardSize) => {
        return step === boardSize * boardSize;
    }

    // Handle click Square
    const handleClick = (i) => {
        const theHistory = history.slice(0, stepNumber + 1);
        const current = theHistory[theHistory.length - 1];
        const squares = current.squares.slice();

        if (squares[i]
            || calculateWinner(current.squares, recentCell, boardSize, consecutiveSquare)
            || checkDraw(stepNumber, boardSize)) {
            return;
        }

        squares[i] = xIsNext ? "X" : "O";

        setHistory(theHistory.concat([{
            squares: squares,
            location: {
                col: Math.floor(i % boardSize),
                row: Math.floor(i / boardSize)
            }
        }]))
        setStepNumber(theHistory.length)
        setXIsNext(!xIsNext)
        setRecentCell(i);
    }

    const handleSelectBoardSize = (e) => {
        let newBoardSize = e.target.value;
        if (!Number.isNaN(parseInt(newBoardSize))) {
            setBoardSize(newBoardSize);
        }
        setHistory([{
            squares: Array(boardSize * boardSize).fill(null),
            location: {
                col: -1,
                row: -1,
            }
        }]);
        setStepNumber(0);
        setXIsNext(true);
        setRecentCell(null);
        setOrder(true); // true mean asc
    }

    const jumpTo = (step) => {
        const col = history[step].location ? history[step].location.col : -1;
        const row = history[step].location ? history[step].location.row : -1;
        const recentCell = col + row * boardSize;
        setRecentCell(recentCell);
        setStepNumber(step);
        setXIsNext((step % 2) === 0)
    }

    const toggleOrder = () => {
        setOrder(!order);
    }

    const theHistory = history;
    const current = theHistory[stepNumber];
    const winSquares = calculateWinner(current.squares, recentCell, boardSize, consecutiveSquare);
    const drawMatch = checkDraw(stepNumber, boardSize);

    const moves = theHistory.map((step, move) => {

        const col = step.location ? step.location.col : "";
        const row = step.location ? step.location.row : "";
        const desc = move ?
            `Go to move #(${col},${row})` :
            'Go to game start';

        return (
            <li name="listItem" key={move}>
                <button
                    style={stepNumber === move ? { fontWeight: "bold" } : { fontWeight: "normal" }}
                    onClick={() => jumpTo(move)}
                >
                    {desc}
                </button>
            </li>
        );
    });

    if (!order) {
        moves.reverse();
    }

    let status;
    if (winSquares) {
        status =
            <React.Fragment>
                Winner:
                {current.squares[recentCell] === "X"
                    ? <span style={{ color: "red" }}> X</span>
                    : <span style={{ color: "blue" }}> O</span>}
            </React.Fragment>;
        console.log(winSquares)
    } else if (drawMatch) {
        status = "Draw";
    } else {
        status =
            <React.Fragment>
                Next player:
                {xIsNext
                    ? <span style={{ color: "red" }}> X</span>
                    : <span style={{ color: "blue" }}> O</span>}
            </React.Fragment>;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                    winSquares={winSquares}
                    boardSize={boardSize}
                />
            </div>
            <div className="game-info">
                <div className="game-info-item">
                    {status}
                </div>
                <div className="game-info-item">
                    <span>Board Size: </span>
                    <select value={boardSize} onChange={(e) => handleSelectBoardSize(e)}>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                        <option value={13}>13</option>
                        <option value={14}>14</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <div className="game-info-item">
                    <button onClick={() => toggleOrder()}>Toggle</button>
                </div>
                <ol>{moves}</ol>
            </div>
        </div>
    );

}

export default Game;
