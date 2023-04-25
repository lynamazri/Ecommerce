import React from "react";

function Footer() {
  return (
    <footer>
      <>
      <div className="footerList">
        <h3>Get in touch</h3>
          <ul className="sectionLeftItems">
            <li>About us</li>
            <li>Careers</li>
            <li>Press release</li>
            <li>blog</li>
          </ul>
      </div>
      <div className="footerList">
        <h3>Connections</h3>
          <ul className="sectionLeftItems">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Youtube</li>
            <li>Linkedin</li>
          </ul>
      </div>
      <div className="footerList">
        <h3>Earings</h3>
          <ul className="sectionLeftItems">
            <li>Become an affilate</li>
            <li>Advertise your product</li>
            <li>Sell on Market</li>
          </ul>
      </div>
      <div className="footerList">
        <h3>Account</h3>
          <ul className="sectionLeftItems">
            <li>Your account</li>
            <li>Returns centre</li>
            <li>100 % purchase protection</li>
            <li>Chat with us</li>
            <li>Help</li>
          </ul>
      </div>
      </>
      <small>Copyright © 2023 magaza.com</small>
    </footer>
  )
}

export default Footer;
