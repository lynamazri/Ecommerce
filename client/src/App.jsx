import { useState } from "react";
//import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Route, Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Products from "./pages/Products/Products";
import Shops from "./pages/Shops/Shops";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
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
import ManageCredit from "./components/Profile/ManageCredit";
import OrderHistory from "./components/Profile/OrderHistory";
import OpenShop from "./components/Profile/OpenShop";
import Security from "./components/Profile/Security";
import Language from "./components/Profile/Language";
import DashboardContent from "./components/Dashboard/DashboardContent";
import DashboardProducts from "./components/Dashboard/DashboardProducts";
import Orders from "./components/Dashboard/Orders";
import Settings from "./components/Dashboard/Settings";

import AdminDashCont from "./components/AdminDashboard/AdminDashCont";
import AdminUsers from "./components/AdminDashboard/AdminUsers";
import AdminShops from "./components/AdminDashboard/AdminShops";
import AdminProducts from "./components/AdminDashboard/AdminProducts";
import AdminsManage from "./components/AdminDashboard/AdminsManage";
import AdminSettings from "./components/AdminDashboard/AdminSettings";

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
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/my-profile" element={<MyProfile />} />
          <Route path="/profile/address-book" element={<AddressBook />} />
          <Route path="/profile/manage-credit" element={<ManageCredit />} />
          <Route path="/profile/orderhistory" element={<OrderHistory />} />
          <Route path="/profile/security" element={<Security />} />
          <Route path="/profile/language" element={<Language />} />
          <Route path="/profile/open-shop" element={<OpenShop />} />
        </Route>
        <Route path="/Shop/:storeId" element={<Shop />} />
        <Route path="/product/:category/:id" element={<ProductDetails />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/Shops" element={<Shops />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard" element={<DashboardContent />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="/admin/dashboard" element={<AdminDashCont />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/shops" element={<AdminShops />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/admins" element={<AdminsManage />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/not-found" element={<NotFound />} />
        /*priv*/
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
