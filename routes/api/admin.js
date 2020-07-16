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

router.get("/data/leaves", auth, (req, res) => {
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

router.get("/dashboard/details", auth, function (req, res) {
  res.render("details", {
    currentUser: req.user,
    clientType: req.session.client,
    error: null
  });
});

router.post("/dashboard/info", auth, function (req, res) {
  User.findOne({ email: req.body.email + "@iiitl.ac.in" }, function (err, user) {
    if (err) Error(err);
    if(!user){ 
      res.render("details", {
        currentUser: req.user,
        clientType: req.session.client,
        error: "User not found"
      });
      return;
    }
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

router.get("/dashboard/permit", auth, (req, res) => {
  if (req.query.approve && req.query._id) {
    var isApproved = req.query.approve === "true";

    Leave.findByIdAndUpdate(
      { _id: req.query._id },
      { Approve: isApproved },
      (err, leave) => {
        if (err) res.status(500);
        res.sendStatus(200);
      }
    );
  } else {
    res.status(500);
  }
});
module.exports = router;
