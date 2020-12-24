import React, { useState, useEffect } from "react";
import "./styles.css";
import API from "../../../utils/API";
import EditSpecificMember from "./EditSpecificMember";
function EditForm({
  firstName,
  lastName,
  email,
  phoneNumber,
  admin,
  memberID,
  state,
  setState,
  member,
  setMember,
}) {
  const [allMembers, setAllMembers] = useState(null);
  useEffect(() => {
    API.GetAllMembers().then(({ data }) => {
      setAllMembers(data);
    });
  }, [member]);
  const getMember = (e) => {
    API.GetOneMember(e.target.id).then(({ data }) => {
      setMember(data);
    });
  };
  return (
    <>
      <form>
        <table className="table">
          <tbody>
            {allMembers &&
              allMembers.map(
                ({ _id, firstName, lastName, phoneNumber, email }) => (
                  <>
                    <tr
                      id={_id}
                      key={_id}
                      style={{ cursor: "pointer" }}
                      onMouseOver={(e) =>
                        e.target.parentNode.classList.add("hovered-card-edit")
                      }
                      onMouseOut={(e) =>
                        e.target.parentNode.classList.remove(
                          "hovered-card-edit"
                        )
                      }
                      onClick={(e) => getMember(e)}
                    >
                      <td id={_id}>{firstName}</td>
                      <td id={_id}>{lastName}</td>
                      <td id={_id}>{phoneNumber}</td>
                      <td id={_id}>{email}</td>
                    </tr>
                  </>
                )
              )}
          </tbody>
        </table>
        {member && (
          <>
            <EditSpecificMember
              firstName={firstName}
              lastName={lastName}
              email={email}
              phoneNumber={phoneNumber}
              admin={admin}
              member={member}
              setMember={setMember}
              memberID={memberID}
            />
          </>
        )}
      </form>
    </>
  );
}

export default EditForm;
