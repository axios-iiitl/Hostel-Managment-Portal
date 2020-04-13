const express = require("express");
const auth = require("../../middleware/authuser");
const passport = require("passport");
Admin = require("../../models/Admin");
User = require("../../models/User");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    req.session.token = req.user.googleId;
    res.cookie("token", req.session.token);
    Admin.findOne({ email: req.user.email }, function (err, admin) {
      if (admin) {
        req.session.status = "applied";
        req.session.client = "admin";
        res.redirect("/admin/dashboard");
        User.deleteOne({ email: req.user.email }, function (err, user) {});
      } else {
        req.session.client = "user";
        res.redirect("/user/dashboard");
      }
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  req.token = null;
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
