const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", auth, (req, res) => {
  res.render("landing", { currentUser: req.user });
});

router.get("/dashboard/items/:id", auth, function(req, res) {
  User.findOne({ googleId: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("item", { user: user, currentUser: req.user });
    }
  });
});

router.post("/dashboard/items/:id", auth, function(req, res) {
  User.findOne({ googleId: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      Object.keys(req.body.items).forEach(
        v => (user.items[v] = req.body.items[v])
      );
      user.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/user/dashboard");
        }
      });
    }
  });
});

router.get("/dashboard/contacts/:id", auth, function(req, res) {
  User.findOne({ googleId: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("contact", { user: user, currentUser: req.user });
    }
  });
});

router.post("/dashboard/contacts/:id", auth, function(req, res) {
  User.findOne({ googleId: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      Object.keys(req.body.contacts).forEach(
        v => (user.contacts[v] = req.body.contacts[v])
      );
      user.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/user/dashboard");
        }
      });
    }
  });
});

module.exports = router;
