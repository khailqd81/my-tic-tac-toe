function Square(props) {
    const style = props.isBold ? {fontWeight: "bold"} : {fontWeight: "normal"};
    return (
        <button className="square" style={style} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;