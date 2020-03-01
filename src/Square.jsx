import React, { Component } from "react";
import "./Square.css";

export default class CenterGrid extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidUpdate() {
  //   this.setState({ isWall: this.props.isWall });
  // }
  toggleWall() {
    if (this.props.mouseDown && !this.props.isStart && !this.props.isEnd) {
      this.props.toggleWall(this.props.row, this.props.col);
    }
  }
  toggleWallOnce() {
    if (!this.props.isStart && !this.props.isEnd) {
      this.props.toggleWall(this.props.row, this.props.col);
    }
  }
  handleMouseEnter() {
    if (this.props.startSelected) {
      this.props.moveStart(this.props.row, this.props.col);
    } else if (this.props.endSelected) {
      this.props.moveEnd(this.props.row, this.props.col);
    } else {
      this.toggleWall();
    }
  }
  handleMouseDown() {
    if (this.props.isStart) {
      this.props.selectStart();
    } else if (this.props.isEnd) {
      this.props.selectEnd();
    } else {
      this.toggleWallOnce();
    }
  }
  render() {
    const { row, col, isStart, isEnd, isWall } = this.props;
    // console.log(this.props.row);
    const extraClass = isStart ? "start" : isEnd ? "end" : isWall ? "wall" : "";
    return (
      <div
        id={`square-${row}-${col}`}
        className={`square  ${extraClass}`}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseDownCapture={() => this.handleMouseDown()}
      ></div>
    );
  }
}
