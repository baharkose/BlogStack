"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();

// Call permissions
const permissions = require("../middlewares/permissions");

// Call Controllers:
const blog = require("../controllers/blog");

// Blog
// ------------------------------------------
router.route("/blogs").get(blog.list).post(permissions.isLogin, blog.create);

router
  .route("/blogs/:blogId")
  .get(permissions.isLogin, blog.read)
  .put(permissions.isLogin,blog.update)
  .delete(permissions.isLogin,blog.delete);

router.get("/category/:categoryId/posts", blog.listCategoryPosts);

module.exports = router;
