import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "../components/Root";
import Dashboard from "../pages/Dashboard";
import About, { blogLoader } from "../pages/About";
import BlogDetail from "../pages/BlogDetail";
import MyBlog from "../pages/MyBlog";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} loader={blogLoader} />
      <Route path="blog-detail" element={<BlogDetail />} />
      <Route path="my-blog" element={<MyBlog />} />
      <Route path="new-blog" element={<NewBlog />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);
