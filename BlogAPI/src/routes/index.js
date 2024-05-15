"use strict";

/* -------------------------------------------------------
        NODE EXPRESS |  BLOG API
------------------------------------------------------- */

const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/:

// URL: /

//users
router.use("/users", require("./user"));
//comment
router.use("/comments", require("./comment"));
//category
router.use("/categories", require("./category"));
//blog
router.use("/", require("./blog"));
/* ------------------------------------------------------- */
module.exports = router;
