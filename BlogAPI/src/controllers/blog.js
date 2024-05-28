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

  create: async (req, res) => {
    const data = await Blog.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    const blogId = req.params.blogId;
    const ip = req.ip; // Kullanıcının IP adresini alıyoruz

    const blog = await Blog.findOne({ _id: blogId }).populate([
      "blogCategoryId",
      "userId",
    ]); // Blogu ve ilgili verileri alıyoruz

    if (!blog) {
      return res.status(404).send({
        error: true,
        message: "Blog not found",
      });
    }

    // IP adresi daha önce eklenmemişse, görüntülenme sayısını artır
    if (!blog.viewers.includes(ip)) {
      blog.views += 1;
      blog.viewers.push(ip);
      await blog.save();
    }

    res.status(200).send({
      error: false,
      result: blog,
      views: blog.views,
    });
  },

  update: async (req, res) => {
    const data = await Blog.updateOne({ _id: req.params.blogId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
      newData: await Blog.findOne({ _id: req.params.blogId }),
    });
  },

  delete: async (req, res) => {
    const data = await Blog.deleteOne({ _id: req.params.blogId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  getLike: async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.blogId });

    res.status(200).send({
      error: false,
      didUserLike: false,
      countOfLikes: blog.likes.length,
      likes: blog.likes,
    });
  },

  postLike: async (req, res) => {
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
      blog.likes = blog.likes.filter((id) => id.toString() !== req.user.id.toString());
      await blog.save();

      res.status(200).send({
        error: false,
        didUserLike: false,
        countOfLikes: blog.likes.length,
        likes: blog.likes,
      });
    }
  }



  // postLike: async (req, res) => {
  //   /*
  //       #swagger.tags = ["Blogs"]
  //       #swagger.summary = "Add/Remove Like"
  //   */

  //   const blog = await Blog.findOne({ _id: req.params.blogId });
  //   const userId = req.user.id; // Kullanıcı kimliğini alıyoruz
  //   const didUserLike = blog.likes.includes(userId);

  //   if (!didUserLike) {
  //     // Kullanıcı daha önce beğenmemiş, beğeni ekle
  //     blog.likes = [...blog.likes, userId]; // Kullanıcı kimliğini diziye ekle
  //     await blog.save();

  //     res.status(200).send({
  //       error: false,
  //       didUserLike: true,
  //       countOfLikes: blog.likes.length,
  //       likes: blog.likes,
  //     });
  //   } else {
  //     // Kullanıcı daha önce beğenmiş, beğeni kaldır
  //     blog.likes = blog.likes.filter((id) => id !== userId); // Kullanıcı kimliğini diziden çıkar
  //     await blog.save();

  //     res.status(200).send({
  //       error: false,
  //       didUserLike: false,
  //       countOfLikes: blog.likes.length,
  //       likes: blog.likes,
  //     });
  //   }
  // },

  // postLike: async (req, res) => {
  /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Add/Remove Like"
    */

  // UPDATE VERSİYONU

  //   const blogId = req.params.blogId;
  //   const userId = req.user.id;

  //   const blog = await Blog.findOne({ _id: blogId });

  //   if (!blog) {
  //     return res.status(404).send({
  //       error: true,
  //       message: "Blog not found",
  //     });
  //   }

  //   const didUserLike = blog.likes.includes(userId);

  //   if (!didUserLike) {
  //     // Kullanıcı daha önce beğenmemiş, beğeni ekle
  //     await Blog.updateOne({ _id: blogId }, { $push: { likes: userId } });

  //     res.status(200).send({
  //       error: false,
  //       didUserLike: true,
  //       countOfLikes: blog.likes.length + 1, // beğeni eklediğimiz için 1 arttırıyoruz
  //       likes: [...blog.likes, userId],
  //     });
  //   } else {
  //     // Kullanıcı daha önce beğenmiş, beğeni kaldır
  //     await Blog.updateOne({ _id: blogId }, { $pull: { likes: userId } });

  //     res.status(200).send({
  //       error: false,
  //       didUserLike: false,
  //       countOfLikes: blog.likes.length - 1, // beğeni kaldırdığımız için 1 azaltıyoruz
  //       likes: blog.likes.filter((id) => id !== userId),
  //     });
  //   }
  // },
};
