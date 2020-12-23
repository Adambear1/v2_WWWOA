import React, { useState } from "react";
import API from "../../utils/API";
import ResetPasswordModalContent from "./ResetPasswordModalContent";
import "./styles.css";
function ResetPasswordModal({ open, setOpen, resetInfo, setResetInfo }) {
  const [confirmLink, setConfirmLink] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    API.SendResetLink(resetInfo.email).then(() => {
      setConfirmLink(true);
    });
  };

  return (
    <>
      {open && (
        <div class="reset-password-modal">
          <div class="reset-password-modal-content">
            <span class="reset-password-close" onClick={() => setOpen(!open)}>
              &times;
            </span>
            {confirmLink ? (
              <>Hello</>
            ) : (
              <form onSubmit={onSubmit}>
                <ResetPasswordModalContent
                  resetInfo={resetInfo}
                  setResetInfo={setResetInfo}
                />
              </form>
            )}
            <button className="btn btn-success justify-center" type="submit">
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPasswordModal;
