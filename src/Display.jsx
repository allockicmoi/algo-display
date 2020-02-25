import React, { Component } from "react";
import Grid from "./Grid.jsx";
import "./Display.css";

export default class Display extends Component {
  render() {
    return (
      <div className="container">
        <div className="topbar">
          <h1 className="ad">ALGO DISPLAY</h1>
        </div>
        <Grid />
      </div>
    );
  }
}
