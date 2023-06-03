import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Footer from "../../components/Footer/Footer";
import "./Compare.css";

function Compare() {
  return (
    <div>
      <Navbar />
      <Path />
      <Footer />
    </div>
  );
}

export default Compare;
