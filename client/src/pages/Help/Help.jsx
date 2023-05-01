import React, { useEffect } from "react";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { AiOutlineShoppingCart, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { BsPerson, BsTruck } from "react-icons/bs";
import { TbPackageImport } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./Help.css";
import HelpArticle from "./HelpArticle";

function Help() {
  /* const [query, setQuery] = useState("");
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3001/help?q=${query}`);
    setData(res.data);
  };
  fetchData();
}, [query]); */

  return (
    <>
      <UserNavbar />
      <h1>What can we help you with today?</h1>
      <main className="help-container">
        <div className="help-card">
          <Link to="/help/buying">
            <div className="help-icon">
              <AiOutlineShoppingCart />
            </div>
            <h3>Buying</h3>
          </Link>
        </div>
        <div className="help-card">
          <Link to="/help/selling">
            <div className="help-icon">
              <BiPurchaseTag />
            </div>

            <h3>Selling</h3>
          </Link>
        </div>
        <div className="help-card">
          <Link to="/help/account">
            <div className="help-icon">
              <BsPerson />
            </div>

            <h3>Account</h3>
          </Link>
        </div>
        <div className="help-card">
          <Link to="/help/returns-and-refunds">
            <div className="help-icon">
              <TbPackageImport />
            </div>

            <h3>Returns & Refunds</h3>
          </Link>
        </div>

        <div className="help-card">
          <Link to="/help/shipping-and-delivery">
            <div className="help-icon">
              <BsTruck />
            </div>

            <h3>Shipping & Delivery</h3>
          </Link>
        </div>
        <div className="help-card">
          <Link to="/help/other">
            <div className="help-icon">
              <AiOutlineQuestionCircle />
            </div>

            <h3>Other</h3>
          </Link>
        </div>
      </main>
      <HelpArticle />
    </>
  );
}

export default Help;
