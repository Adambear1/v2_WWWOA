import React from "react";

function ErrorModal({ error }) {
  console.log(JSON.stringify(error));
  return (
    <div class="alert alert-danger" role="alert">
      {error}
    </div>
  );
}

export default ErrorModal;
