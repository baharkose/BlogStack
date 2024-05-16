"use strict";

/* -------------------------------------------------------
    NODEJS EXPRESS | BlOG API
------------------------------------------------------- */

// Middleware: permissions

module.exports = {
  isLogin: (req, res, next) => {
    // set passive
    // return next() -> çalıştırma pass geç

    // req user içerisinde bilgi varsa ve bu kullanıcı banlanmadıysa o zaman isLogindir. Geçiş izni ver. Devam et.yoksa 403 hata kodu yolla.
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("No permisson: You must login");
    }
  },
  isAdmin: (req, res, next) => {
    // return next()
    // only admin
    if (req.user && req.user?.isAdmin && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode(403).send("No permission: You must be admin");
    }
  },
};
