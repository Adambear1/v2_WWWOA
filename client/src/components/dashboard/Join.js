import React from "react";

function Join() {
  return (
    <div
      className="card join-card animate__animated animate__fadeInRight"
      id="join"
    >
      <h2>Join</h2>
      <div className="card-body">
        <form className="px-5">
          <div className="form-group">
            <label for="exampleFormControlInput1">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Full Name"
            />
          </div>

          <div className="form-group">
            <label for="exampleFormControlInput1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <div className="form-group">
              <label for="exampleFormControlInput1">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="(555)-555-5555"
              />
            </div>
            <label for="exampleFormControlSelect1">
              Years Refereeing Experience
            </label>
            <select
              name="experience"
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Why Refereeing</label>
            <textarea
              name="whyRefereeing"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;
