"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();

// Call Controllers:
const comment = require("../controllers/comment");

// comment
// ------------------------------------------
router.route("/").get(comment.list).post(comment.create);

router
  .route("/:commentId")
  .get(comment.read)
  .put(comment.update)
  .delete(comment.delete);
// ------------------------------------------
module.exports = router;
