import Square from "./Square";
function Board({squares, onClick, winSquares, boardSize }) {

    const checkInSquares = (index, squares) => {
        for (const value of squares) {
            if (index === value) {
                return true;
            }
        }
        return false;
    }

    const renderSquare = (i, isHighlighted, winSquares) => {
        return (
            <Square
                key={i}
                isHighlighted={isHighlighted}
                value={squares[i]}
                hasWinner={winSquares ? true : false}
                onClick={() => onClick(i)}
            />
        );
    }
    const createBoard = (boardSize) => {
        let result = [];
        for (var i = 0; i < boardSize; i++) {
            let boardRow = [];
            for (var j = 0; j < boardSize; j++) {
                const indexSquare = j + boardSize * i;
                let isHighlighted = false;
                if (winSquares) {
                    isHighlighted = checkInSquares(indexSquare, winSquares);
                }
                boardRow.push(renderSquare(j + boardSize * i, isHighlighted, winSquares));
            }
            result.push(<div className="board-row" key={i*100}>{boardRow}</div>)
        }

        return result;
    }
    return (
        <div>
            {createBoard(boardSize)}
        </div>
    );

}

export default Board;