import React from "react";

function EditSpecificMember({
  setMember,
  member,
  firstName,
  lastName,
  email,
  phoneNumber,
  admin,
  setAdmin,
  memberID,
}) {
  return (
    <>
      <div className="container" id={member._id} ref={memberID}>
        <div className="row mt-3">
          <div className="col-6">
            <label for="exampleFormControlInput1">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              ref={firstName}
              value={member.firstName}
              onChange={(e) => {
                setMember({
                  ...member,
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
              value={member.lastName}
              onChange={(e) => {
                setMember({
                  ...member,
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
              value={member.email}
              onChange={(e) => {
                setMember({
                  ...member,
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
              value={member.phoneNumber}
              onChange={(e) => {
                setMember({
                  ...member,
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
                value={member.admin || admin}
                onChange={(e) => {
                  console.log(e.target.checked);
                  setAdmin(e.target.checked);
                  setMember({
                    ...member,
                    [e.target.name]: e.target.checked,
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
