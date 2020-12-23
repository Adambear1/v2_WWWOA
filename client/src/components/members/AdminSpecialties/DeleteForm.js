import React, { useState, useEffect } from "react";
import "./styles.css";
import API from "../../../utils/API";

function DeleteForm({ memberID }) {
  const [allMembers, setAllMembers] = useState(null);
  const [member, setMember] = useState(null);
  useEffect(() => {
    API.GetAllMembers().then(({ data }) => {
      setAllMembers(data);
    });
  }, []);

  return (
    <>
      <form>
        <table className="table">
          <tbody>
            {allMembers &&
              allMembers.map((data, index) => (
                <>
                  <tr
                    id={index}
                    key={index}
                    style={{ cursor: "pointer" }}
                    onMouseOver={(e) =>
                      e.target.parentNode.classList.add("hovered-card-delete")
                    }
                    onMouseOut={(e) =>
                      e.target.parentNode.classList.remove(
                        "hovered-card-delete"
                      )
                    }
                    onClick={(e) => {
                      setMember(e.target.id);
                    }}
                  >
                    <td id={index}>{data.firstName}</td>
                    <td id={index}>{data.lastName}</td>
                    <td id={index}>{data.phoneNumber}</td>
                    <td id={index}>{data.email}</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        <table className="table mt-5">
          <tbody>
            {member && (
              <>
                <tr
                  id={allMembers[member]._id}
                  style={{ cursor: "pointer" }}
                  className="mt-5 hovered-card-delete"
                  ref={memberID}
                >
                  <td>{allMembers[member].firstName}</td>
                  <td>{allMembers[member].lastName}</td>
                  <td>{allMembers[member].phoneNumber}</td>
                  <td>{allMembers[member].email}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </form>
    </>
  );
}

export default DeleteForm;
