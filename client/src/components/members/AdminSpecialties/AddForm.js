import React from "react";

function AddForm({ firstName, lastName, email, phoneNumber, admin }) {
  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <label for="exampleFormControlInput1">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              ref={firstName}
            />
          </div>
          <div className="col-6">
            <label for="exampleFormControlInput1">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              ref={lastName}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <label for="exampleFormControlInput1">Email</label>
            <input type="email" class="form-control" id="email" ref={email} />
          </div>
          <div className="col-12 mt-2">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input
              type="text"
              class="form-control"
              id="phoneNumber"
              ref={phoneNumber}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="admin"
                ref={admin}
              />
              <label class="custom-control-label" for="admin">
                Admin?
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddForm;
