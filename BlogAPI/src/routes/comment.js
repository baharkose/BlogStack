"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();
// Call Permissions:
const permissions = require("../middlewares/permissions");

// Call Controllers:
const comment = require("../controllers/comment");

// comment
// ------------------------------------------
router.route("/").get(comment.list).post(permissions.isLogin, comment.create);

router
  .route("/:commentId")
  .get(comment.read)
  .put(permissions.isLogin, comment.update)
  .delete(permissions.isLogin, comment.delete);
// ------------------------------------------
module.exports = router;
