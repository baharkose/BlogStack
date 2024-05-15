"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();

// Call Controllers:
const blog = require("../controllers/blog");

// Blog
// ------------------------------------------
router.route("/blogs").get(blog.list).post(blog.create);

router
  .route("/blogs/:postId")
  .get(blog.read)
  .put(blog.update)
  .delete(blog.delete);

router.get("/category/:categoryId/posts", blog.listCategoryPosts);

module.exports = router;
