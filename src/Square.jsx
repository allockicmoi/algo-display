import React, { Component } from "react";
import "./Square.css";

export default class CenterGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { isWall: this.props.isWall };
  }

  toggleWall() {
    if(this.props.mouseDown && this.props.extraClass !=='start' && this.props.extraClass !=='end'){
    this.props.toggleWall(this.props.row, this.props.col);
    if (this.state.isWall) {
      this.setState({ isWall: false });
    } else {
      this.setState({ isWall: true });
    }}
  }
  toggleWallOnce() {
    if(this.props.extraClass !=='start' && this.props.extraClass !=='end'){
    this.props.toggleWall(this.props.row, this.props.col);
    if (this.state.isWall) {
      this.setState({ isWall: false });
    } else {
      this.setState({ isWall: true });
    }}
  }
  handleMouseEnter(){
    if(this.props.startSelected){
      this.props.moveStart(this.props.row ,this.props.col);
    }
    else if(this.props.endSelected){
      this.props.moveEnd(this.props.row,this.props.col);
    }else{
      this.toggleWall();
    }
  }
  handleMouseDown(){
    if(this.props.isStart){
      this.props.selectStart();
    }
    else if(this.props.isEnd)
    {this.props.selectEnd();
    }else{
      this.toggleWallOnce();
    }
  }
  render() {
    const { row, col, isStart, isEnd } = this.props;
    // console.log(this.props.row);
    const extraClass = isStart
      ? "start"
      : isEnd
      ? "end"
      : this.state.isWall
      ? "wall"
      : "";
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
