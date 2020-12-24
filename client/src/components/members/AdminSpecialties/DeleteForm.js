import React, { useState, useEffect } from "react";
import "./styles.css";
import API from "../../../utils/API";

function DeleteForm({ memberID, member, setMember }) {
  const [allMembers, setAllMembers] = useState(null);
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
                    data-status={
                      allMembers[index].active === false ? "false" : "true"
                    }
                    className={
                      allMembers[index].active === false
                        ? "current-inactive-delete"
                        : "current-active-delete"
                    }
                    onMouseOver={(e) =>
                      e.target.parentNode.classList.add("hovered-card-delete")
                    }
                    onMouseOut={(e) =>
                      e.target.parentNode.classList.remove(
                        "hovered-card-delete"
                      )
                    }
                    onClick={(e) => {
                      console.log(e.target.dataset.status);
                      setMember({
                        _id: e.target.id,
                        active: e.target.dataset.status,
                      });
                    }}
                  >
                    <td
                      id={index}
                      data-status={
                        allMembers[index].active === false ? "false" : "true"
                      }
                    >
                      {data.firstName}
                    </td>
                    <td
                      id={index}
                      data-status={
                        allMembers[index].active === false ? "false" : "true"
                      }
                    >
                      {data.lastName}
                    </td>
                    <td
                      id={index}
                      data-status={
                        allMembers[index].active === false ? "false" : "true"
                      }
                    >
                      {data.phoneNumber}
                    </td>
                    <td
                      id={index}
                      data-status={
                        allMembers[index].active === false ? "false" : "true"
                      }
                    >
                      {data.email}
                    </td>
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
                  key={allMembers[member._id]._id}
                  id={allMembers[member._id]._id}
                  style={{ cursor: "pointer" }}
                  className={
                    allMembers[member._id].active === false
                      ? "mt-5 current-inactive-delete"
                      : "mt-5 current-active-delete"
                  }
                  ref={memberID}
                >
                  <td>{allMembers[member._id].firstName}</td>
                  <td>{allMembers[member._id].lastName}</td>
                  <td>{allMembers[member._id].phoneNumber}</td>
                  <td>{allMembers[member._id].email}</td>
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
