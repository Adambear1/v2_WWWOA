import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import { useAuth } from "../../../context/AuthContext";
import AnnouncementsListCard from "./AnnouncementsListCard";
import "./styles.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const { currentUser } = useAuth();
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className={
        currentUser.admin === true || currentUser.admin === "true"
          ? "announcements-pagination"
          : "announcements-pagination-not-member"
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

function AnnouncementsList({
  readyDelete,
  setReadyDelete,
  confirmDelete,
  setConfirmDelete,
  deleted,
  setDeleted,
  open,
}) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(
    currentUser.admin === true || currentUser.admin === "true" ? 6 : 5
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    API.GetAnnouncements().then(({ data }) => {
      setPosts([]);
      setPosts(data);
    });
  }, [open, deleted]);

  return (
    <div
      className={
        currentUser.admin === true || currentUser.admin === "true"
          ? "announcements-list"
          : "announcements-list-not-member"
      }
    >
      {currentPosts &&
        currentPosts.map(({ name, title, message, date, _id }, index) => (
          <>
            <>
              <AnnouncementsListCard
                index={index}
                key={_id}
                readyDelete={readyDelete}
                setReadyDelete={setReadyDelete}
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                name={name}
                title={title}
                message={message}
                date={date}
                _id={_id}
              />
            </>
          </>
        ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default AnnouncementsList;
