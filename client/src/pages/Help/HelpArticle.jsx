import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";

function HelpArticle({ category }) {
  // const { items, status } = useSelector((state) => state.help);

  const [articles, setArticles] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:3001/help/${category}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticles(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(articles);
  return (
    <>
      {/* {status === "success" ? (
        items &&
        items?.map((article) => (
          <div key={article.id} className="article-card">
            <h2 className="article-title">{article.title}</h2>
            <p className="article-body">{article.body}</p>
          </div>
        ))
      ) : status === "loading" ? (
        <div className="loader-container">
          <RingLoader color="#1f2c4c" />
        </div>
      ) : (
        <p>Error</p>
      )} */}

      {articles &&
        articles?.map((article) => (
          <div key={article.id} className="article-card">
            <h2 className="article-title">{article.title}</h2>
            <p className="article-body">{article.body}</p>
          </div>
        ))}
    </>
  );
}

export default HelpArticle;
