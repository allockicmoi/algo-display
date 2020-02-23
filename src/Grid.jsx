import React, { Component } from "react";
import Square from "./Square.jsx";
import "./Grid.css";
export default class CenterGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const grid = InitializeGrid();
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;
    return (
      <div className="grid">
        {grid.map((row, rIndex) => {
          return (
            <div className="row" key={rIndex}>
              {row.map((square, cIndex) => {
                return <Square key={cIndex} />;
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
  for (let row = 0; row < 20; row++) {
    const tempRow = [];
    for (let col = 0; col < 20; col++) {
      tempRow.push(row, col);
    }
    grid.push(tempRow);
  }
  return grid;
};
