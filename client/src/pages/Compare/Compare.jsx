import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Footer from "../../components/Footer/Footer";
import StoreCard from "../../components/StoreCard/StoreCard";
import "./Compare.css";

function Compare() {
  const store = {
    name: " Store name",
    description: "This is an example store description.",
    image: "https://example.com/store-image.jpg",
    storeId: "example-store-123",
  };

  return (
    <div>
      <Navbar />
      <Path />
      <StoreCard store={store} />
      <Footer />
    </div>
  );
}

export default Compare;
