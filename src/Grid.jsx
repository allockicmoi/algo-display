import React, { Component } from "react";
import Square from "./Square.jsx";
import "./Grid.css";
import { BFS } from "./search_algos/BFS.js";
export default class CenterGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const { grid, start, end } = InitializeGrid();
    // console.log(grid);
    this.setState({ grid, start, end });
  }

  animateSearchAlgo(orderedSquares) {
    console.log(orderedSquares);

    for (const index in orderedSquares) {
      setTimeout(() => {
        const square = orderedSquares[index];
        if (
          document.getElementById(`square-${square.row}-${square.col}`)
            .className === "square  "
        ) {
          document.getElementById(
            `square-${square.row}-${square.col}`
          ).className += " visited";
        }
      }, 3 * index);
    }
  }

  render() {
    const { grid } = this.state;
    return (
      <div className="grid">
        <button
          className="run_button"
          onClick={() =>
            this.animateSearchAlgo(
              BFS(this.state.grid, this.state.start, this.state.end)
            )
          }
        >
          RUN
        </button>
        {grid.map((row, rIndex) => {
          return (
            <div className="row" key={rIndex}>
              {row.map((square, cIndex) => {
                // console.log(square.isStart);

                return (
                  <Square
                    key={cIndex}
                    row={rIndex}
                    col={cIndex}
                    isStart={square.isStart}
                    isEnd={square.isEnd}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const InitializeGrid = () => {
  const grid = [];
  let start = null;
  let end = null;
  for (let row = 0; row < 20; row++) {
    const tempRow = [];
    for (let col = 0; col < 40; col++) {
      const isStart = row === 5 && col === 5;
      const isEnd = row === 18 && col === 33;
      const square = {
        row,
        col,
        isStart,
        isEnd,
        visited: false
      };

      if (square.isStart) {
        start = square;
      }

      if (square.isEnd) {
        end = square;
      }
      tempRow.push(square);
    }
    grid.push(tempRow);
  }
  return { grid, start, end };
};
