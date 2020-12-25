import React from "react";
import "./styles.css";

function Jumbotron() {
  return (
    <>
      <div className="jumbotron jumbotron-fluid home-jumbotron"></div>
      <div className="container">
        <h1 className="display-4 jumbotron-header-text animate__animated animate__fadeInDownBig">
          WWWOA
        </h1>
        <p className="lead jumbotron-body-text animate__animated animate__fadeInDownBig">
          Western Washington Wrestling Officials Association
        </p>
      </div>
    </>
  );
}

export default Jumbotron;
