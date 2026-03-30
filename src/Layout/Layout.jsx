import React from "react";

import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen  ">
      <Navbar></Navbar>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer></Footer>
      
    </div>
  );
};

export default Layout;
