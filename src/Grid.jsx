import React, { Component } from "react";
import Square from "./Square.jsx";
import "./Grid.css";
import { BFS } from "./search_algos/BFS.js";
import { DFS } from "./search_algos/DFS.js";
import Selectionbar from "./SelectionBar.jsx";
export default class CenterGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      algo: () => BFS(this.state.grid, this.state.start, this.state.end),
      algoName: "BFS",
      isFresh: true
    };
    this.toggleWall = this.toggleWall.bind(this);
    this.updateAlgo = this.updateAlgo.bind(this);
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
    this.setState({ grid: tempGrid, algo: this.state.algo });
  }

  updateAlgo(algo) {
    // // console.log("TESTTTTTt");
    // console.log(algo);
    // console.log(algo === "BFS");
    if (algo.value === "BFS") {
      console.log("in BFS");
      this.setState({
        algoName: algo,
        algo: () => BFS(this.state.grid, this.state.start, this.state.end)
      });
    }
    if (algo.value === "DFS") {
      console.log("in DFS");
      this.setState({
        algoName: algo,
        algo: () => DFS(this.state.grid, this.state.start, this.state.end)
      });
    }
  }

  animateSearchAlgo(algo) {
    this.setState({ isFresh: false });
    const orderedSquares = algo.vstd;
    const shortestPath = algo.shortestPath;
    //console.log(orderedSquares);
    //console.log(shortestPath);
    for (const index in orderedSquares) {
      setTimeout(() => {
        for (const pathIndex in shortestPath) {
          setTimeout(() => {
            const square = shortestPath[pathIndex];
            if (
              document.getElementById(`square-${square.row}-${square.col}`)
                .className != "square  start" &&
              document.getElementById(`square-${square.row}-${square.col}`)
                .className != "square  end"
            ) {
              document.getElementById(
                `square-${square.row}-${square.col}`
              ).className = "square shortest";
            }
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

  refreshAndAnimate() {
    if (this.state.isFresh === false) {
      const { grid, start, end } = RefreshGrid(this.state.grid.slice());
      // console.log(grid);
      this.setState({ grid, start, end, isFresh: true });
      for (let row in this.state.grid) {
        for (let ind in this.state.grid[row]) {
          //console.log(ind);
          const square = this.state.grid[row][ind];
          //console.log(square);
          if (
            document.getElementById(`square-${square.row}-${square.col}`)
              .className != "square  wall" &&
            document.getElementById(`square-${square.row}-${square.col}`)
              .className != "square  start" &&
            document.getElementById(`square-${square.row}-${square.col}`)
              .className != "square  end"
          )
            document.getElementById(
              `square-${square.row}-${square.col}`
            ).className = "square  ";
        }
      }
      console.log(grid);
    }
    //console.log(this.state.grid[0]);
    this.animateSearchAlgo(this.state.algo());
  }
  render() {
    const { grid } = this.state;
    return (
      <div className="grid">
        <Selectionbar
          algo={() => this.refreshAndAnimate()}
          algoName={this.state.algoName}
          updateAlgo={this.updateAlgo}
        />
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
  console.log(grid);
  return { grid, start, end };
};
const RefreshGrid = gridOrig => {
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
        isWall: gridOrig[row][col].isWall
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
  console.log(grid);
  return { grid, start, end };
};
