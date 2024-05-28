"use strict";

/* -------------------------------------------------------
        NODE EXPRESS |  BLOG API
------------------------------------------------------- */

const User = require("../models/user");
// const {getModelList} = require("../middlewares/findSearchSortPage")

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "List all users"
      #swagger.responses[200] = {
        description: "Successful operation",
        schema: {
          error: false,
          data: []
        }
      }
    */
    // const data = await User.find();
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Create a new user"
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
          username: "string",
          email: "string",
          password: "string",
          firstName: "string",
          lastName: "string",
          isActive: true,
          isStaff: false,
          isAdmin: false
        }
      }
      #swagger.responses[201] = {
        description: "User created successfully",
        schema: {
          data: {},
          error: false
        }
      }
    */
    const data = await User.create(req.body);
    res.status(201).send({
      data,
      error: false,
    });
  },
  read: async (req, res) => {
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Get user details"
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: "Successful operation",
        schema: {
          data: {},
          error: false
        }
      }
      #swagger.responses[404] = {
        description: "User not found",
        schema: {
          error: true,
          message: "User not found"
        }
      }
    */
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
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Update a user"
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
      }
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
          username: "string",
          email: "string",
          password: "string",
          firstName: "string",
          lastName: "string",
          isActive: true,
          isStaff: false,
          isAdmin: false
        }
      }
      #swagger.responses[202] = {
        description: "User updated successfully",
        schema: {
          data: {},
          new: {},
          error: false
        }
      }
    */
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
    /*
      #swagger.tags = ["Users"]
      #swagger.summary = "Delete a user"
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
      }
      #swagger.responses[204] = {
        description: "User deleted successfully"
      }
      #swagger.responses[404] = {
        description: "User not found",
        schema: {
          error: true,
          message: "User not found"
        }
      }
    */
    const data = await User.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !deletedCount,
    });
  },
};
