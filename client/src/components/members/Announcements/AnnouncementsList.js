import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import AnnouncementsListCard from "./AnnouncementsListCard";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="announcements-pagination">
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

function AnnouncementsList() {
  const [messages, setMessages] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    API.GetAnnouncements().then(({ data }) => {
      setPosts(data);
    });
  }, []);
  return (
    <div className="announcements-list">
      {currentPosts &&
        currentPosts.map(({ name, title, message, date, _id }, index) => (
          <>
            <>
              <AnnouncementsListCard
                index={index}
                key={_id}
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
