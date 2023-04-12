import { useState } from "react";
//import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import UserNavbar from "./components/UserNavbar/UserNavbar";
import Footer from "./components/Footer";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound/NotFound";

const Layout = () => {
  return (
    <>
      <UserNavbar />
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
    path: "/profile/edit",
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
        <Route path="/cart/:id" element={<Cart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
