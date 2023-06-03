import { useState } from "react";
//import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Products from "./pages/Products/Products";
import Stores from "./pages/Stores/Stores";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Help from "./pages/Help/Help";
import HelpArticle from "./pages/Help/HelpArticle";
import Compare from "./pages/Compare/Compare";
import Wishlist from "./pages/Wishlist/Wishlist";
import RequireAuth from "./pages/Login/RequireAuth";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MyProfile from "./components/Profile/MyProfile";
import AddressBook from "./components/Profile/AddressBook";
import PaymentMethod from "./components/Profile/PaymentMethod";
import OrderHistory from "./components/Profile/OrderHistory";
import OpenShop from "./components/Profile/OpenShop";
import Security from "./components/Profile/Security";
import Language from "./components/Profile/Language";
import Welcome from "./pages/Home/Welcome";
import PersistLogin from "./pages/Login/PersistLogin";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path : "/profile/edit",
    element: <EditProfile />,
  },
  {
    path: "/cart/:id",
    element: <Cart />,
  },
]); 
<RouterProvider router={router} />*/

function App() {
  return (
    <div className="App">
      <Routes>
        /* public routes */
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route
          path="/help/buying"
          element={<HelpArticle category={"buying"} />}
        />
        <Route
          path="/help/selling"
          element={<HelpArticle category={"selling"} />}
        />
        <Route
          path="/help/account"
          element={<HelpArticle category={"account"} />}
        />
        <Route
          path="/help/returns-and-refunds"
          element={<HelpArticle category={"return"} />}
        />
        <Route
          path="/help/other"
          element={<HelpArticle category={"other"} />}
        />
        <Route
          path="/help/shipping-and-delivery"
          element={<HelpArticle category={"ship"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:category/:id" element={<ProductDetails />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/Shops" element={<Stores />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/my-profile" element={<MyProfile />} />
          <Route path="/profile/address-book" element={<AddressBook />} />
          <Route path="/profile/payment-method" element={<PaymentMethod />} />
          <Route path="/profile/orderhistory" element={<OrderHistory />} />
          <Route path="/profile/security" element={<Security />} />
          <Route path="/profile/language" element={<Language />} />
          <Route path="/profile/open-shop" element={<OpenShop />} />
        </Route>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/welcome" element={<Welcome />} />
        /*priv*/
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
