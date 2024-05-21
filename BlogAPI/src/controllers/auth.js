"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Blog API
------------------------------------------------------- */

// AUTH CONTROLLER
// kullanıcıların sisteme giriş yapma, token ile kimlik tazeleme, ve çıkış yapma, tokenlarla kullanıcı sisteme giriş yaptı mı ve bu kullanıcı kim

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
      #swagger.tags = ["Authentication"]
      #swagger.summary ="Login"
      #swagger.description = "Login with username (or email) and password for get Token and JWT"
      #swagger.parameters["body"] = {
        in:"body",
        required:true,
        schema:{
          "username":"test",
          "password":"Aa*123456"
        }
      }
    */

    const { username, email, password } = req.body;
    // kullanıcıdan gelen email, passowrd ve username bilgilerini al.

    if ((username || email) && password) {
      const user = await User.findOne({
        // username ya da emailden biri var ise, $or komutu için dizi içerisine alıyoruz. User dbsinde username ya da email adında bir kullanıcı var mı
        $or: [{ username }, { email }],
      });

      // kullanıcı varsa ve şifres, (gelen şifre kriptolanmış o nedenle kullanıcın gönderdiği şifreyi de kriptoluyoruz.)
      if (user && user.password == passwordEncrypt(password)) {
        // kullanıcı banlanmış mı?
        if (user.isActive) {
          // TOKEN

          // userid ile eşleşen token bilgilerini getir.
          let tokenData = await Token.findOne({ userId: user._id });
          // eğer token bilgisi yoksa yeni bir token oluştur.
          if (!tokenData)
            tokenData = await Token.create({
              userId: user._id,
              // şifreli bir token oluştur
              token: passwordEncrypt(user._id + Date.now()),
            });
          

          // JWT
          // accessToken kısa süreli, refresh token uzun süreli
          const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
            expiresIn: "30m",
          });
          const refreshToken = jwt.sign(
            // user id ve password varsa refreshle
            { _id: user._id, password: user.password },
            process.env.REFRESH_KEY,
            { expiresIn: "3d" }
          );
          res.send({
            error: false,
            token: tokenData.token,
            bearer: { accessToken, refreshToken, user },
          });
        } else {
          // kullanıcı banlanmış
          res.errorStatusCode = 401;
          throw new Error("This account is not active");
        }
      } else {
        // kullanıcı yoksa önce doğru şekilde giriş yapınız
        res.errorStatusCode = 401;
        throw new Error("Please enter username/email & password");
      }
    }
  },
  refresh: async (req, res) => {
    /*
        #swagger.tags = ['Authentication']
        #swagger.summary = 'JWT: Refresh'
        #swagger.description = 'Refresh access-token by refresh-token.'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                bearer: {
                    refresh: '___refreshToken___'
                }
            }
        }
    */

    const refreshToken = req.body?.bearer?.refreshToken;

    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        async function (err, userData) {
          if (err) {
            res.errorStatusCode = 401;
            throw err;
          } else {
            const { _id, password } = userData;

            if (_id && password) {
              const user = await User.findOne({ _id });

              if (user && user.password == password) {
                if (user.isActive) {
                  // JWT:
                  const accessToken = jwt.sign(
                    user.toJSON(),
                    process.env.ACCESS_KEY,
                    { expiresIn: "30m" }
                  );

                  res.send({
                    error: false,
                    bearer: { accessToken },
                  });
                } else {
                  res.errorStatusCode = 401;
                  throw new Error("This account is not active.");
                }
              } else {
                res.errorStatusCode = 401;
                throw new Error("Wrong id or password.");
              }
            } else {
              res.errorStatusCode = 401;
              throw new Error("Please enter id and password.");
            }
          }
        }
      );
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter token.refresh");
    }
  },
  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */
    const auth = req.headers?.authorization || null;
    const tokenKey = aut ? auth.split("") : null;
    let message = null,
      result = {};

    if (tokenKey) {
      if (tokenKey[0] == "Token") {
        result = await Token.deleteOne({ token: tokenKey[1] });
        message = "Token is deleted, Logout was OK.";
      } else {
        // JWT
        message = "No need any process for logout. You must delete JWT tokens";
      }
    }
    res.send({
      error: false,
      message,
      result,
    });
  },
};
