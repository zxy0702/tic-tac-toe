import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinnerValue={
          this.props.winnerValue && this.props.winnerValue.indexOf(i) !== -1
        }
      />
    );
  }
  renderColumn(i) {
    return [0, 1, 2].map((column) => {
      return this.renderSquare(3 * i + column);
    });
  }
  render() {
    const rows = [0, 1, 2].map((row) => {
      return (
        <div className="board-row" key={row}>
          {this.renderColumn(row)}
        </div>
      );
    });
    return (
      <div>
        {rows}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}
