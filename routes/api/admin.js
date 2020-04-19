const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../models/User");
const Leave = require("../../models/Leave");
const auth = require("../../middleware/authadmin");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", auth, function (req, res) {
  res.render("landingadmin", {
    currentUser: req.user,
    status: "applied",
    clientType: req.session.client
  });
});

router.get("/data/leaves", (req, res) => {
  var perPage = 4;
  var page;

  req.query.page === undefined ? (page = 0) : (page = parseInt(req.query.page));

  if (req.query.status === "recent") {
    req.session.status = "recent";
  } else if (req.query.status === "applied") {
    req.session.status = "applied";
  }

  if (req.session.status === "applied") {
    Leave.find({ Approve: null })
      .limit(perPage)
      .skip(perPage * parseInt(page))
      .sort({
        createdAt: "desc"
      })
      .exec(function (err, leaves) {
        if (err) Error(err);
        Leave.countDocuments({ Approve: null }).exec(function (err, count) {
          if (err) Error(err);
          res.send({
            leaves: leaves
          });
        });
      });
  } else if (req.session.status === "recent") {
    Leave.find()
      .limit(perPage)
      .skip(perPage * parseInt(page))
      .sort({
        createdAt: "desc"
      })
      .exec(function (err, leaves) {
        if (err) Error(err);
        Leave.countDocuments().exec(function (err, count) {
          if (err) Error(err);
          res.send({
            leaves: leaves
          });
        });
      });
  }
});

router.get("/dashboard/details", function (req, res) {
  res.render("details", {
    currentUser: req.user,
    clientType: req.session.client
  });
});

router.post("/dashboard/info", auth, function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) Error(err);
    Leave.find({ Email: req.body.email })
      .sort({ createdAt: "desc" })
      .exec(function (err, leaves) {
        if (err) {
          res.redirect("/admin/dashboard");
        }
        res.render("userinfo", {
          currentUser: req.user,
          leaves: leaves,
          clientType: req.session.client,
          user: user
        });
      });
  });
});

router.get("/dashboard/permit/accept/:id", function (req, res) {
  console.log("hello");
  Leave.findOne({ _id: req.params.id }, function (err, leave) {
    if (err) {
      res.redirect("/admin/dashboard");
    } else {
      leave.Approve = true;
      Leave.findOneAndUpdate({ _id: req.params.id }, leave, function (
        err,
        leave
      ) {
        if (err) {
          res.redirect("/admin/dashboard");
        } else {
          res.redirect("/admin/dashboard");
        }
      });
    }
  });
});

router.get("/dashboard/permit/reject/:id", function (req, res) {
  Leave.findOne({ _id: req.params.id }, function (err, leave) {
    if (err) {
      res.redirect("/admin/dashboard");
    } else {
      leave.Approve = false;
      Leave.findOneAndUpdate({ _id: req.params.id }, leave, function (
        err,
        leave
      ) {
        if (err) {
          res.redirect("/admin/dashboard");
        } else {
          res.redirect("/admin/dashboard");
        }
      });
    }
  });
});

module.exports = router;
