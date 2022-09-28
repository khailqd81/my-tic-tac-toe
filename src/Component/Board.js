import Square from "./Square";
function Board(props) {

    const checkInSquares = (index, squares) => {
        for (const value of squares) {
            if (index === value) {
                return true;
            }
        }
         
        return false;
    }

    const renderSquare = (i, isBold) => {
        return (
            <Square
                key={i}
                isBold={isBold}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    }
    const createBoard = () => {
        let result = [];
        for (var i = 0; i < 5; i++) {
            let boardRow = [];
            for (var j = 0; j < 5; j++) {
                const indexSquare = j + 5 * i;
                let isBold = false;
                if (props.winSquares) {
                    isBold = checkInSquares(indexSquare, props.winSquares);
                }
                boardRow.push(renderSquare(j + 5 * i, isBold));
            }
            result.push(<div className="board-row" key={i*100}>{boardRow}</div>)
        }

        return result;
    }
    return (
        <div>
            {createBoard()}
        </div>
    );

}

export default Board;