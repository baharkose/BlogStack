"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();
// Call Permissions:
const permissions = require("../middlewares/permissions");

// Call Controllers:
const category = require("../controllers/category");

// comment
// ------------------------------------------
router.route("/").get(category.list).post(permissions.isAdmin, category.create);

router
  .route("/:categoryId")
  .get(category.read)
  .put(permissions.isAdmin, category.update)
  .delete(permissions.isAdmin, category.delete);
// ------------------------------------------
module.exports = router;
