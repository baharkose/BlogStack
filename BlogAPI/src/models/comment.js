"use strict";
const mongoose = require("mongoose");
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId, // Relational ObjectId
      ref: "User", // ModelName
      required: true,
    },
    blogId: {
      type: mongoose.Schema.ObjectId, // Relational ObjectId
      ref: "Blog", // ModelName
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Comment", commentSchema);
