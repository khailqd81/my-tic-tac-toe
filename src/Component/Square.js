function Square({ isHighlighted, value, hasWinner, onClick }) {
    // Turn off hover
    let styleClass = hasWinner ? "square" : "square hover-square"
    if (isHighlighted) {
        styleClass += " win-square";
    }

    return (
        <button 
            className={styleClass} 
            style={value === "X" ? {color: "red"} : {color: "blue"}} 
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default Square;