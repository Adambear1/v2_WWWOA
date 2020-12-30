import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import MemberCard from "./MemberCard";

//
import "./styles.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const { currentUser } = useAuth();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className={
        currentUser.admin === true || currentUser.admin === "true"
          ? "member-pagination"
          : "member-pagination member-pagination-not-admin"
      }
    >
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <button type="btn" className="btn" style={{ padding: 0 }}>
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          </button>
        ))}
      </ul>
    </nav>
  );
};
function MembersList() {
  const { getUsers } = useAuth();
  useEffect(() => {
    try {
      getUsers().then(({ data }) => {
        setPosts(data);
      });
    } catch (error) {
      throw error;
    }
  }, []);
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(
    currentUser.admin === true || currentUser.admin === "true" ? 7 : 6
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div
        className={
          currentUser.admin === true || currentUser.admin === "true"
            ? "members-list my-5 mx-3"
            : "members-list members-list-not-admin my-5 mx-3"
        }
      >
        {currentPosts &&
          currentPosts.map(
            ({ firstName, lastName, email, picture, phoneNumber, _id }) => (
              <MemberCard
                firstName={firstName}
                lastName={lastName}
                email={email}
                picture={picture}
                phoneNumber={phoneNumber}
                _id={_id}
              />
            )
          )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
}

export default MembersList;
