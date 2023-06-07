import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

import Navbar from "../../components/Navbar/Navbar";
import Path from "../../components/Path/Path";
import Swiperr from "../../components/Swiper/Swiper";
import Footer from "../../components/Footer/Footer";
import "./Shop.css";
import { useGetStoreBannerQuery } from "../../redux/Slices/apiSlice";
import { fetchStoresData } from "../../redux/Slices/storesSlice";

function Shop() {
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const stores = useSelector((state) => state.stores.stores);
  const shop = stores.find((store) => store.storeId === storeId);
  const {
    data: storeBanner,
    isLoading,
    isError,
  } = useGetStoreBannerQuery(parseInt(storeId));
  useEffect(() => {
    dispatch(fetchStoresData());
  }, [dispatch]);

  if (!shop) {
    return <div>Loading...</div>; // or any loading state indicator
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching store banner.</div>;
  }
  console.log(storeBanner);
  return (
    <div>
      <Navbar />
      <Path />
      <div className="shop-page">
        <div className="upper">
          <div className="banner">
            {storeBanner && <img src={storeBanner?.url} alt={shop.name} />}
          </div>
          <div className="info">
            <h2>{shop.name}</h2>
            <p>{shop.description}</p>
            <div className="information">
              <ul className="detail">
                <li>Main Category:</li>
                <li>Working Hours:</li>
                <li>Phone Number:</li>
                <li>Email:</li>
              </ul>
              <ul className="detail-value">
                <li>{shop.CatId}</li>
                <li>{shop.workingHours}</li>
                <li>{shop.phone}</li>
                <li>{shop.email}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lower">
          <section className="product-container">
            <div className="header">
              <h3>Our Products</h3>
            </div>
            <Swiperr sectionType="products" storeId={storeId} />
          </section>
          <section className="product-container">
            <div className="header">
              <h3>Similar Shops</h3>
              <Link to={`/Shops`}>
                More Shops <MdKeyboardArrowRight />
              </Link>
            </div>
            <Swiperr
              sectionType="stores"
              category={shop?.subCatId}
              currentShopId={storeId}
            />
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
