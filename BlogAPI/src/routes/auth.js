"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Blog Api
------------------------------------------------------- */
const router = require("express").Router();
const auth = require("../controllers/auth");
// URL: auth
router.post("/login", auth.login); // SimpleToken & JWT
router.post("/refresh", auth.refresh); // JWT Refresh
router.get("/logout", auth.logout); // SimpleToken Logout

module.exports = router;
