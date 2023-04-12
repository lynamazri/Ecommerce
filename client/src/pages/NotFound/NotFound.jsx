import React from "react";
import "./NotFound.css";
import UserNavbar from "../../components/UserNavbar/UserNavbar";

function NotFound() {
  return (
    <>
      <UserNavbar />
      <div className="not-found">
        <h2>404</h2>
        <p>Page not found.</p>
      </div>
    </>
  );
}

export default NotFound;
