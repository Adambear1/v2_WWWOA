import React from "react";

function EditSpecificMember({
  specificMember,
  setSpecificMember,
  firstName,
  lastName,
  email,
  phoneNumber,
  admin,
  memberID,
}) {
  return (
    <>
      <div className="container" id={specificMember._id} ref={memberID}>
        <div className="row mt-3">
          <div className="col-6">
            <label for="exampleFormControlInput1">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              ref={firstName}
              value={specificMember.firstName}
              onChange={(e) => {
                setSpecificMember({
                  ...specificMember,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-6">
            <label for="exampleFormControlInput1">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              ref={lastName}
              value={specificMember.lastName}
              onChange={(e) => {
                setSpecificMember({
                  ...specificMember,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <label for="exampleFormControlInput1">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              ref={email}
              value={specificMember.email}
              onChange={(e) => {
                setSpecificMember({
                  ...specificMember,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-12 mt-2">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input
              type="text"
              class="form-control"
              id="phoneNumber"
              name="phoneNumber"
              ref={phoneNumber}
              value={specificMember.phoneNumber}
              onChange={(e) => {
                setSpecificMember({
                  ...specificMember,
                  [e.target.name]: e.target.value,
                });
              }}
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
                name="admin"
                ref={admin}
                value={specificMember.admin}
                onChange={(e) => {
                  setSpecificMember({
                    ...specificMember,
                    [e.target.name]: e.target.value,
                  });
                }}
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

export default EditSpecificMember;
