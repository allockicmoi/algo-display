import React, { Component } from "react";
import Grid from "./Grid.jsx";
import "./Display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";

export default class Display extends Component {
  render() {
    return (
      <div className="container">
        <div className="topbar">
          <div className="icon">
            <FontAwesomeIcon icon={faCubes} />
          </div>
          <h1 className="ad">ALGO DISPLAY</h1>
        </div>
        <Grid />
      </div>
    );
  }
}
