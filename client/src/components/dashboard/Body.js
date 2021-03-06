import React from "react";
import Join from "./Join";
import About from "./About";
import Testimonial from "./Testimonial";
import History from "./History";
import Contact from "./Contact";

function Body() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="my-3">
            <About />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="my-3">
            <Testimonial />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="my-3">
            <History />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="my-3">
            <Join />
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <div className="my-3">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
