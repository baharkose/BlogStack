"use strict";
const mongoose = require("mongoose");

// BlogPost Schema
const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    blogCategoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    viewers: [
      {
        type: String,
      },
    ],
  },
  { collection: "blogs", timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
