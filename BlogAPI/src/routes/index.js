"use strict";

/* -------------------------------------------------------
        NODE EXPRESS |  BLOG API
------------------------------------------------------- */

const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/:

// URL: /
//auth
router.use("/auth", require("./auth"));
//users
router.use("/users", require("./user"));
//comment
router.use("/comments", require("./comment"));
//category
router.use("/categories", require("./category"));
//blog
router.use("/", require("./blog"));
//token
router.use("/tokens", require("./token"));

/* ------------------------------------------------------- */
module.exports = router;
