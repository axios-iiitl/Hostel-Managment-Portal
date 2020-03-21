const express = require("express"),
  auth = require("../../middleware/auth"),
  passport = require("passport");

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
    res.redirect("/user/dashboard");
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
