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
    this.toggleWall = this.toggleWall.bind(this);
  }
  componentDidMount() {
    const { grid, start, end } = InitializeGrid();
    // console.log(grid);
    this.setState({ grid, start, end });
  }
  toggleWall(row, col) {
    //console.log(this.state);
    const tempGrid = this.state.grid.slice();

    tempGrid[row][col].isWall =
      tempGrid[row][col].isWall === true ? false : true;
    this.setState({ grid: tempGrid });
  }

  animateSearchAlgo(BFS) {
    const orderedSquares = BFS.vstd;
    const shortestPath = BFS.shortestPath;
    console.log(orderedSquares);
    console.log(shortestPath);
    for (const index in orderedSquares) {
      setTimeout(() => {
        for (const pathIndex in shortestPath) {
          setTimeout(() => {
            const square = shortestPath[pathIndex];
            document.getElementById(
              `square-${square.row}-${square.col}`
            ).className = "square shortest";
          }, 3 * orderedSquares.length + 25 * pathIndex);
        }
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
                    isWall={false}
                    toggleWall={this.toggleWall}
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
        visited: false,
        isWall: false
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
