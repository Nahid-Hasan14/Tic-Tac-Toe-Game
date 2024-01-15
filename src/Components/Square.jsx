import { useState } from "react";
import "./Square.css";

function Square({ value, onSquareClick }) {
  return (
    <>
      <div className="Container">
        <div className="first btn">
          <button onClick={onSquareClick}>{value}</button>
        </div>
      </div>
    </>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Wonner: ${winner}`;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquare = squares.slice();

    if (xIsNext) {
      newSquare[i] = " X";
    } else {
      newSquare[i] = " O";
    }
    onPlay(newSquare);
  }
  return (
    <>
      <div className="">
        <div className="">
          <div className="winner">
            <h1>{status}</h1>
          </div>
          <div className="first btn">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="secound btn">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="third btn">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurentMove] = useState(0);

  const currentSquare = history[currentMove];

  function handlePlay(newSquare) {
    setXIsNext(!xIsNext);

    const nextHistory = [...history.slice(0, currentMove + 1), newSquare];
    setHistory(nextHistory);
    setCurentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurentMove(move);

    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let describtion;
    if (move > 0) {
      describtion = `Go to move # ${move}`;
    } else {
      describtion = "Go to start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{describtion}</button>
      </li>
    );
  });
  return (
    <div className="container">
      <div className="main">
        <div className="res">
          <div className="left-part">
            <Board
              xIsNext={xIsNext}
              squares={currentSquare}
              onPlay={handlePlay}
            />
          </div>
          <div className="right-part">
            <li>{moves}</li>
          </div>
        </div>
      </div>
    </div>
  );
}
