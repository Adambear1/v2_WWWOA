import React from "react";

function ResetPasswordModalContent({ resetInfo, setResetInfo }) {
  console.log(resetInfo);
  return (
    <>
      <div class="form-group mt-5">
        <label for="email">Please Confirm Email</label>
        <input
          type="email"
          value={resetInfo.email}
          class="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => {
            setResetInfo({ [e.target.name]: e.target.value });
          }}
        />
      </div>
    </>
  );
}

export default ResetPasswordModalContent;
