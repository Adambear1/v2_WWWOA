import React, { useState, useEffect } from "react";
import API from "../../../utils/API";

function Jumbotron({ name }) {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    API.RandomQuote().then(({ data }) => {
      console.log(data);
      let index = Math.floor(Math.random() * Math.floor(data.length));
      setQuote(data[index]);
    });
  }, []);
  return (
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Welcome, {name}</h1>
        <p class="lead">{quote && quote.text}</p>
        <p class="lead">{quote && "- " + quote.author}</p>
      </div>
    </div>
  );
}

export default Jumbotron;
