"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// https://mongoosejs.com/docs/queries.html

// Catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

// Call Models:
const Blog = require("../models/blog");

// ------------------------------------------
// Blog
// ------------------------------------------
module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Blog, {}, ["blogCategoryId", "userId"]);

    res.status(200).send({
      error: false,
      count: data.length,
      details: await res.getModelListDetails(Blog),
      result: data,
    });
  },

  listCategoryPosts: async (req, res) => {
    const data = await Blog.find({
      blogCategoryId: req.params.categoryId,
    }).populate("blogCategoryId");

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const data = await Blog.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await Blog.findOne({ _id: req.params.blogId }).populate([
      "blogCategoryId",
      "userId",
    ]); // get Primary Data

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const customFilter = (req.user?.isAdmin ? {} : { _id: req.user._id }) && {
    //   _id: req.params.blogId,
    // };
    const data = await Blog.updateOne({ _id: req.params.blogId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await Blog.findOne({ _id: req.params.blogId }),
    });
  },

  delete: async (req, res) => {
    const data = await Blog.deleteOne({ _id: req.params.blogId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
  getLike: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Like Info"
        */
    const blog = await Blog.findOne({ _id: req.params.blogId });

    console.log(blog);
    res.status(200).send({
      error: false,
      didUserLike: false,
      countOfLikes: blog.likes.length,
      likes: blog.likes,
    });
  },
  postLike: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Add/Remove Like"
        */

    const blog = await Blog.findOne({ _id: req.params.blogId });
    const didUserLike = blog.likes.includes(req.user.id);

    if (!didUserLike) {
      blog.likes.push(req.user.id);
      await blog.save();

      res.status(200).send({
        error: false,
        didUserLike: true,
        countOfLikes: blog.likes.length,
        likes: blog.likes,
      });
    } else {
      const likeUserId = blog.likes.find((item) => item == req.user.id);
      blog.likes.remove(likeUserId);
      await blog.save();

      res.status(200).send({
        error: false,
        didUserLike: false,
        countOfLikes: blog.likes.length,
        likes: blog.likes,
      });
    }
  },
};
