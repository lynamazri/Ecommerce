import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Path.css";

function Path() {
  const { pathname } = useLocation();
  const pathParts = pathname.split("/").filter(Boolean);
  const lastPath = pathParts[pathParts.length - 1];
  const categoryPath = pathParts.slice(0, -1).join(" / ");

  return (
    <div className="path">
      <Link to="/">Homepage</Link>
      {categoryPath && <span> / {categoryPath} </span>}
      {lastPath && (
        <span>
          / <span className="last-path">{lastPath}</span>
        </span>
      )}
    </div>
  );
}

export default Path;
