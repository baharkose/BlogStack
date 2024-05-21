"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | BLOG API
------------------------------------------------------- */
// app.use(authentication)

const Token = require("../models/token");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Eğer req. in headersın içerisinde auth... varsa al.
  const auth = req.headers?.authorization || null; // Token ...tokenKey...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      // SimpleToken:

      // eşleşen bir kayıt varsa kullanıcı bilgisini req.user içerisine yerleştir.

      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      // usera ait diğer bilgileri populate ile getir.
      req.user = tokenData ? tokenData.userId : undefined;
      console.log(req.user)
    } else if (tokenKey[0] == "Bearer") {
      // JWT:

      // tokeni belitrilen accessKey ile doğrula.ve req.user içerisine yerleştir
      jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (error, data) => {
        // //? Hata gösterimi yok:
        req.user = data;
      });
    }
  }

  next();
};
