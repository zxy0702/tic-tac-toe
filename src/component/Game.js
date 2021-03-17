import React from "react";
import Board from "./Board";
import "../css/game.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      coordinate: [],
      xIsNext: true,
      stepNumber: 0,
      asceOrder: true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const coordinate = this.state.coordinate.slice(0, this.state.stepNumber);
    // const current = history[this.state.asceOrder ? history.length - 1 : 0];
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    let newHistory = history.concat();
    // if (this.state.asceOrder) {
    //   newHistory.push({
    //     squares: squares,
    //   });
    // } else {
    //   newHistory.unshift({
    //     squares: squares,
    //   });
    // }
    newHistory.push({
      squares: squares,
    });
    this.setState({
      history: newHistory,
      coordinate: coordinate.concat([
        {
          x: parseInt(i / 3),
          y: i % 3,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  handleOrderBtnClick() {
    this.setState({
      asceOrder: !this.state.asceOrder,
    });
  }
  calculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], value: lines[i] };
      }
    }
    return null;
  }
  render() {
    const history = this.state.history;
    // const current = history[this.state.asceOrder ? this.state.stepNumber : 0];
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner.winner;
    } else if (history.length - 1 === 9) {
      status = "平局";
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }
    let moves = history.map((step, move) => {
      const coordinate = this.state.coordinate[move - 1];
      const desc = move
        ? `Go to move #${move} (${coordinate.x},${coordinate.y})`
        : "Go to game start";
      return (
        <li
          key={move}
          className={[this.state.stepNumber === move ? "is-select" : ""]}
        >
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    if (!this.state.asceOrder) moves = moves.sort((a, b) => b.key - a.key);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerValue={winner && winner.value}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleOrderBtnClick()}>
            {this.state.asceOrder ? "升序" : "降序"}显示
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
