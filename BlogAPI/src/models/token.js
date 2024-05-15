"use strict";

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId, // Relational ObjectId
      ref: "User", // ModelName
      required: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Token", tokenSchema);