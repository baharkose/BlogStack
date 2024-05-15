"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// https://mongoosejs.com/docs/queries.html

// Catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

// Call Models:
const Category = require("../models/category");

// ------------------------------------------
// Category
// ------------------------------------------
module.exports = {
  list: async (req, res) => {
    // const data = await Category.find()
    const data = await res.getModelList(Category);

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await Category.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    // req.params.categoryId
    // const data = await Category.findById(req.params.categoryId)
    const data = await Category.findOne({ _id: req.params.categoryId });

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }) // return new-data
    const data = await Category.updateOne(
      { _id: req.params.categoryId },
      req.body,
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await Category.findOne({ _id: req.params.categoryId }),
    });
  },

  delete: async (req, res) => {
    const data = await Category.deleteOne({ _id: req.params.categoryId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
