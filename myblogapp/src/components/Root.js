import React from "react";
import Navbars from "../components/Navbars";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div>
        <Navbars />
      </div>
      <Outlet />
    </>
  );
};

export default Root;
