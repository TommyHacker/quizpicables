import React from "react";
import Nav from "../components/Nav";
import { Footer } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Nav />
      <Footer />
      <Outlet />
    </>
  );
};

export default Layout;
