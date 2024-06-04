import { Footer, Navbar } from "flowbite-react";
import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import BlogDetail from "../pages/BlogDetail";
import MyBlog from "../pages/MyBlog";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Navbars from "../components/Navbars";
export const Root = () => {
  return (
    <>
      <div>
        <Navbars />
      </div>
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} />
      <Route element={<BlogDetail />} />
      <Route element={<MyBlog />} />
      <Route element={<NewBlog />} />
      <Route element={<Profile />} />
    </Route>
  )
);

const AppRouter = () => {
  return (
    <div>
      <Navbars />
    </div>
  );
};

export default AppRouter;
