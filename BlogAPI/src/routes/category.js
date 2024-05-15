"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();

// Call Controllers:
const category = require("../controllers/category");

// comment
// ------------------------------------------
router.route("/").get(category.list).post(category.create);

router
  .route("/:categoryId")
  .get(category.read)
  .put(category.update)
  .delete(category.delete);
// ------------------------------------------
module.exports = router;
