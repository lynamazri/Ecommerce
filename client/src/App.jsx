import { useState } from "react";
//import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import EditProfile from "./pages/EditProfile/EditProfile";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Help from "./pages/Help/Help";
import HelpArticle from "./pages/Help/HelpArticle";
import Compare from "./pages/Compare/Compare";
import Wishlist from "./pages/Wishlist/Wishlist";

import UserNavbar from "./components/UserNavbar/UserNavbar";
import Footer from "./components/Footer/Footer";
import Menu from "./components/UserNavbar/Menu";
import PersistLogin from "./pages/Login/PersistLogin";

const Layout = () => {
  return (
    <>
      <UserNavbar />
      <Menu />
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
        <Route element={<PersistLogin />}>
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
        </Route>

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/wishlist" element={<Wishlist />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </div>
  );
}

export default App;
