// const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const auth = async (req, res, next) => {
  try {
    if (req.session.token) {
      Admin.findOne({ email: req.user.email }, function (err, admin) {
        if (admin) {
          var x = admin.accessToken.indexOf(req.session.token);
          if (x !== -1) {
            next();
          } else {
            res.cookie("token", "");
            res.redirect("/auth/logout");
          }
        } else if (err) {
          res.cookie("token", "");
          res.redirect("/");
        }
      });
    } else {
      res.cookie("token", "");
      res.redirect("/");
    }
  } catch (e) {
    res.redirect("/");
  }
};

module.exports = auth;
