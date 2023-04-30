import { useState } from "react";
//import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import Cart from "./pages/Cart/Cart";
import UserNavbar from "./components/UserNavbar/UserNavbar";
import Footer from "./components/Footer/Footer";
import Menu from "./components/UserNavbar/Menu";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetails from "./pages/ProductDetails/ProductDetails"

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
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="/profile/edit" element={<EditProfile />} />

        <Route path="/product" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
