import React, { Component } from "react";
import Grid from "./Grid.jsx";
import "./Display.css";

export default class Display extends Component {
  render() {
    return (
      <div className="container">
        <h1>ALGO DISPLAY</h1>

        <Grid />
      </div>
    );
  }
}
