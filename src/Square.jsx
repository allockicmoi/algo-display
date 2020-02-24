import React, { Component } from "react";
import "./Square.css";

export default class CenterGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { row, col, isStart, isEnd } = this.props;
    // console.log(this.props.row);
    const extraClass = isStart ? "start" : isEnd ? "end" : "";
    return (
      <div
        id={`square-${row}-${col}`}
        className={`square  ${extraClass}`}
      ></div>
    );
  }
}
