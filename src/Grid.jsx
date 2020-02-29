import React, { Component } from "react";
import Square from "./Square.jsx";
import "./Grid.css";
import { BFS } from "./search_algos/BFS.js";
import { DFS } from "./search_algos/DFS.js";
import { Astar } from "./search_algos/Astar.js";
import Selectionbar from "./SelectionBar.jsx";
export default class CenterGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      algo: () => BFS(this.state.grid, this.state.start, this.state.end),
      algoName: "BFS",
      isFresh: true,
      mouseDown:false,
      startSelected:false,
      endSelected:false
    };
    this.toggleWall = this.toggleWall.bind(this);
    this.updateAlgo = this.updateAlgo.bind(this);
    this.clear = this.clear.bind(this);
    this.selectStart = this.selectStart.bind(this);
    this.moveStart =this.moveStart.bind(this);
    this.selectEnd = this.selectEnd.bind(this);
    this.moveEnd = this.moveEnd.bind(this);
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
    if (algo.value === "A*") {
      console.log("in A*");
      this.setState({
        algoName: algo,
        algo: () => Astar(this.state.grid, this.state.start, this.state.end)
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

  clear(resetWalls) {
    const { grid, start, end } = RefreshGrid(
      this.state.grid.slice(),
      resetWalls,
      this.state.start,this.state.end
    );
    // console.log(grid);
    this.setState({ grid, start, end, isFresh: true });
    for (let row in this.state.grid) {
      for (let ind in this.state.grid[row]) {
        //console.log(ind);
        const square = this.state.grid[row][ind];
        //console.log(square);
        if (resetWalls) {
          if (
            document.getElementById(`square-${square.row}-${square.col}`)
              .className != "square  start" &&
            document.getElementById(`square-${square.row}-${square.col}`)
              .className != "square  end"
          )
            document.getElementById(
              `square-${square.row}-${square.col}`
            ).className = "square  ";
        } else if (
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
  moveStart(row,col){
    const newStart = {row,col};
    const {grid,start,end} = RefreshGrid(this.state.grid.slice(),false,newStart,this.state.end);
    this.setState({grid,start,end},console.log(this.state.start));
  }
  selectStart(){
    this.setState({startSelected:true},()=>console.log("start selected"));
  }
  moveEnd(row,col){
    const newEnd = {row,col};
    const {grid,start,end} = RefreshGrid(this.state.grid.slice(),false,this.state.start,newEnd);
    this.setState({grid,start,end},console.log(this.state.end));
  }
  selectEnd(){
    this.setState({endSelected:true},()=>console.log("end selected"));
  }
  mouseDown(){
    this.setState({mouseDown:true}, ()=>console.log(this.state.mouseDown));
   
  }
  mouseUp(){
    this.setState({mouseDown:false},()=>console.log(this.state.mouseDown));
    this.setState({startSelected:false},()=>console.log(this.state.startSelected));
    this.setState({endSelected:false},()=>console.log(this.state.endSelected));

  }
  refreshAndAnimate() {
    if (this.state.isFresh === false) {
      this.clear();
    }
    //console.log(this.state.grid[0]);
    this.animateSearchAlgo(this.state.algo());
  }
  render() {
    const { grid } = this.state;
    return (
      <div className="grid" onMouseDown={()=>this.mouseDown()} onMouseUp={()=>this.mouseUp()} >
        <Selectionbar
          algo={() => this.refreshAndAnimate()}
          algoName={this.state.algoName}
          updateAlgo={this.updateAlgo}
          clear={this.clear}
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
                    mouseDown={this.state.mouseDown}
                    selectStart={this.selectStart}
                    startSelected={this.state.startSelected}
                    moveStart={this.moveStart}
                    selectEnd={this.selectEnd}
                    endSelected ={this.state.endSelected}
                    moveEnd={this.moveEnd}
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
const RefreshGrid = (gridOrig, resetWalls,start,end) => {
  const grid = [];
  
  for (let row = 0; row < 20; row++) {
    const tempRow = [];
    for (let col = 0; col < 40; col++) {
      const isStart = row === start.row && col === start.col;
      const isEnd = row === end.row && col === end.col;
      const square = {
        row,
        col,
        isStart,
        isEnd,
        visited: false,
        isWall: resetWalls ? false : gridOrig[row][col].isWall
      };
      console.log(square.isWall);

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
