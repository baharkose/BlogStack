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
      // model ismi yazılır
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
    likedBy: {
      // Kullanıcıların kimliklerini tutan dizi
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { collection: "blogs", timestamps: true }
);

// Virtual Property for likes count
blogSchema.virtual("likesCount").get(function () {
  return this.likedBy.length;
});

// Ensure index for performance boost on 'likedBy'
blogSchema.index({ likedBy: 1 });

module.exports = mongoose.model("Blog", blogSchema);
