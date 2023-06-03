import React from "react";
import "./NotFound.css";
import Navbar from "../../components/Navbar/Navbar";

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="not-found">
        <h2>404</h2>
        <p>Page not found.</p>
      </div>
    </>
  );
}

export default NotFound;
