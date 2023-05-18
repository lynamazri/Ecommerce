import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Path.css";

function Path() {
  const { pathname } = useLocation();
  const decodedPathname = decodeURIComponent(pathname);
  const pathParts = decodedPathname.split("/").filter(Boolean);
  const lastPath = pathParts[pathParts.length - 1];
  const categoryPath = pathParts.slice(0, -1).join(" / ");

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="path">
      <Link to="/">Homepage</Link>
      {categoryPath && <span> / {capitalize(categoryPath)} </span>}
      {lastPath && (
        <span>
          / <span className="last-path">{capitalize(lastPath)}</span>
        </span>
      )}
    </div>
  );
}

export default Path;
