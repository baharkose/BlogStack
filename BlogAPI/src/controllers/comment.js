"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// https://mongoosejs.com/docs/queries.html

// Catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

// Call Models:
const Comment = require("../models/comment");

// ------------------------------------------
// BlogCategory
// ------------------------------------------

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Comment, {}, "userId");
    res.status(200).send({
      error: false,
      count: data.length,
      details: await res.getModelListDetails(Comment),
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    // const data = await Comment.create({
    //     fieldName: 'value',
    //     fieldName: 'value',
    //     fieldName: 'value',
    // })
    const data = await Comment.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    // req.params.postId
    // const data = await Comment.findById(req.params.postId)
    const data = await Comment.findOne({ _id: req.params.commentId }).populate(
      "blogId"
    ); // get Primary Data

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true }) // return new-data
    const data = await Comment.updateOne(
      { _id: req.params.commentId },
      req.body,
      {
        runValidators: true,
      }
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await Comment.findOne({ _id: req.params.commentId }),
    });
  },

  delete: async (req, res) => {
    const data = await Comment.deleteOne({ _id: req.params.commentId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
