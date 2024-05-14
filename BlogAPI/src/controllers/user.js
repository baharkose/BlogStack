"use strict";

/* -------------------------------------------------------
        NODE EXPRESS |  BLOG API
------------------------------------------------------- */

const User = require("../models/user");
// const {getModelList} = require("../middlewares/findSearchSortPage")

module.exports = {
  list: async (req, res) => {
    // const data = await User.find();
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      data,
      error: false,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });
    const data3 = await User.findOneById(id);
    const data2 = await getModelList(User, { _id: req.params.id });
    res.status(200).send({
      data,
      data2,
      data3,
      error: false,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      data,
      new: await User.findOne({ _id: req.params.id }),
      error: false,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !deletedCount,
    });
  },
};
