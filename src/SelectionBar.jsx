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
    return (
      <div className="selectionBar">
        <Dropdown
          className="dd"
          id="algoSelect"
          options={algos}
          onChange={this.props.updateAlgo}
          value={this.props.algoName}
        ></Dropdown>

        <button className="run_button" onClick={() => this.props.algo()}>
          RUN
        </button>
        <button className="clear_button" onClick={() => this.props.clear(true)}>
          CLEAR
        </button>
      </div>
    );
  }
}
