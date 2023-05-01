import React from "react";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";

function HelpArticle() {
  const { items, status } = useSelector((state) => state.help); //9adra nbedelha tweli b RTK query

  return (
    <>
      {status === "success" ? (
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
      )}
    </>
  );
}

export default HelpArticle;
