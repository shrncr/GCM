const express = require("express");
const adminRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


adminRoutes.route("/admin").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });