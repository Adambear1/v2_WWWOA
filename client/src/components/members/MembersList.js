import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
function MembersList() {
  const { getUsers } = useAuth();
  useEffect(() => {
    console.log(getUsers());
    // let data = Promise.resolve(getUsers());
    // console.log(data);
  });
  // const [posts, setPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(5);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {/* <div>
        {currentPosts &&
          currentPosts.map(({ name, email, photo, _id }) => {
            <tr key={_id}>
              <th scope="row">
                {photo ? (
                  <img alt="" src={photo} className="img-fluid" />
                ) : (
                  <img alt="Photo Here" src="" className="img-fluid" />
                )}
              </th>
              <td>{name}</td>
              <td>{email}</td>
            </tr>;
          })}
      </div> */}
      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      /> */}
    </>
  );
}

export default MembersList;
