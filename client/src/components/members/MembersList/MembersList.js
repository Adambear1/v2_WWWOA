import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import MemberCard from "./MemberCard";
//
import "./styles.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <button style={{ padding: 0 }}>
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

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="members-card-container">
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
      </div>{" "}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
}

export default MembersList;
