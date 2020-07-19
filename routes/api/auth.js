const express = require("express");
const passport = require("passport");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Super_User = require("../../models/Super_User");
const Mess = require("../../models/Mess");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    req.session.token = req.user.accessToken[req.user.accessToken.length - 1];
    res.cookie("token", req.session.token);
    Super_User.findOne({ email: req.user.email }, async (err, superuser) => {
      if (err) Error(err);
      if (!superuser) {
        Admin.findOne({ email: req.user.email }, function(err, admin) {
          if (err) Error(err);
          if (!admin) {
            Mess.findOne({ email: req.user.email }, async (err, mess) => {
              if (err) Error(err);
              if (!mess) {
                User.findOne({ email: req.user.email }, function(err, user) {
                  if (err) Error(err);
                  var x = user.accessToken.indexOf(req.session.token);
                  if (x !== -1) {
                    req.session.client = "user";
                    res.redirect("/user/dashboard");
                  } else {
                    res.redirect("/");
                  }
                });
              } else {
                mess.accessToken.push(req.session.token);
                await mess.save();
                User.deleteOne({ email: req.user.email }, (err, user) => {
                  if (err) res.redirect("/");
                });
                req.session.client = "mess";
                res.redirect("/mess/dashboard");
              }
            });
          } else {
            User.deleteOne({ email: req.user.email }, function(err, user) {
              if (err) {
                res.redirect("/");
              } else if (user) {
                Admin.findOne({ email: req.user.email }, async function(
                  err,
                  admin
                ) {
                  if (err) Error(err);
                  admin.accessToken.push(req.session.token);
                  await admin.save();
                  console.log("hello2");
                  var x = admin.accessToken.indexOf(req.session.token);
                  if (x !== -1) {
                    req.session.status = "applied";
                    req.session.client = "admin";
                    res.redirect("/admin/dashboard");
                  } else {
                    res.redirect("/");
                  }
                });
              }
            });
          }
        });
      } else {
        superuser.accessToken.push(req.session.token);
        await superuser.save();
        User.deleteOne({ email: req.user.email }, (err, user) => {
          if (err) res.redirect("/");
        });
        req.session.client = "superuser";
        res.redirect("/superuser/dashboard");
      }
    });
  }
);

router.get("/logout", async (req, res) => {
  if (req.session.client === "user") {
    await User.updateOne(
      { email: req.user.email },
      { $pull: { accessToken: { $in: [req.session.token] } } }
    );
  } else if (req.session.client === "admin") {
    await Admin.updateOne(
      { email: req.user.email },
      { $pull: { accessToken: { $in: [req.session.token] } } }
    );
  } else if (req.session.client === "mess") {
    await Mess.updateOne(
      { email: req.user.email },
      { $pull: { accessToken: { $in: [req.session.token] } } }
    );
  } else if (req.session.client === "superuser") {
    await Super_User.updateOne(
      { email: req.user.email },
      { $pull: { accessToken: { $in: [req.session.token] } } }
    );
  }
  req.logout();
  req.session = null;
  req.token = null;
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
