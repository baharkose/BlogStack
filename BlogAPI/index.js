"use strict";
/* -------------------------------------------------------
        NODE EXPRESS |  BLOG API
------------------------------------------------------- */

/*
    cp .env-sample .env
    npm init -y
    npm i express dotenv mongoose express-async-errors
    npm i morgan swagger-autogen swagger-ui-express redoc-express
    mkdir logs
    nodemon
    https://www.toptal.com/developers/gitignore/
*/

/* ------------------------------------------------------- */

const express = require("express");
const app = express();

// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8001;
const HOST = process.env?.HOST || "127.0.0.1";

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */

// Middlewares:

// Accept JSON:
app.use(express.json());

// HOMEPATH
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to BLOG API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
