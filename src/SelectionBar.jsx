import React, { Component } from "react";
import "./Grid.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./SelectionBar.css";
export default class SelectionBar extends Component {
  constructor(props) {
    super(props);
    this.state = { algo: "BFS" };
  }

  render() {
    const algos = ["BFS", "DFS", "A*"];
    const mazeAlgos = ["test", "somealgo"];
    return (
      <div className="bar">
        <div className="searchBar">
          <Dropdown
            className="dd"
            id="algoSelect"
            options={algos}
            onChange={this.props.updateAlgo}
            value={this.props.algoName}
          ></Dropdown>

          <button className="run_button" onClick={this.props.algo}>
            SEARCH
          </button>
          <button
            className="clear_button"
            onClick={() => this.props.clear(true)}
          >
            CLEAR
          </button>
        </div>
        <div className="mazeBar">
          <Dropdown
            className="dd"
            id="mazeSelect"
            options={mazeAlgos}
            value="Recursive Backtracker"
          ></Dropdown>
          <button className="maze_button" onClick={this.props.mazeAlgo}>
            GENERATE MAZE
          </button>
        </div>
      </div>
    );
  }
}
