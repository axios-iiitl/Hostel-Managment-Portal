const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../models/User");
const Admin = require("../../models/Admin");
const Leave = require("../../models/Leave");
const auth = require("../../middleware/authadmin");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", auth, function(req, res) {
  var perPage = 4,
    page;

  req.query.page == undefined ? (page = 0) : (page = parseInt(req.query.page));

  if (req.query.status == "recent") {
    req.session.status = "recent";
  } else if (req.query.status == "applied") {
    req.session.status = "applied";
  }

  if (req.session.status == "applied") {
    Leave.find({ Approve: null })
      .limit(perPage)
      .skip(perPage * parseInt(page))
      .sort({
        createdAt: "desc"
      })
      .exec(function(err, leaves) {
        Leave.countDocuments({ Approve: null }).exec(function(err, count) {
          res.render("landingadmin", {
            currentUser: req.user,
            leaves: leaves,
            page: page,
            number: count / perPage,
            status: "applied",
            clientType: req.session.client
          });
        });
      });
  } else if (req.session.status == "recent") {
    Leave.find()
      .limit(perPage)
      .skip(perPage * parseInt(page))
      .sort({
        createdAt: "desc"
      })
      .exec(function(err, leaves) {
        Leave.countDocuments().exec(function(err, count) {
          res.render("landingadmin", {
            currentUser: req.user,
            leaves: leaves,
            page: page,
            number: count / perPage,
            status: "recent"
          });
        });
      });
  }
});

router.post("/dashboard/info", auth, function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    res.render("userinfo", { user: user, currentUser: req.user });
  });
});

router.post("/dashboard/info/leave", auth, function(req, res) {
  Leave.find({ Email: req.body.email }, function(err, leaves) {
    if (err) {
      res.redirect("/user/dashboard");
    } else {
      res.render("leaveinfo", { currentUser: req.user, leaves: leaves });
    }
  });
});

router.get("/dashboard/permit/accept/:id", function(req, res) {
  console.log("hello");
  Leave.findOne({ _id: req.params.id }, function(err, leave) {
    if (err) {
      res.redirect("/admin/dashboard");
    } else {
      leave.Approve = true;
      Leave.findOneAndUpdate({ _id: req.params.id }, leave, function(
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

router.get("/dashboard/permit/reject/:id", function(req, res) {
  Leave.findOne({ _id: req.params.id }, function(err, leave) {
    if (err) {
      res.redirect("/admin/dashboard");
    } else {
      leave.Approve = false;
      Leave.findOneAndUpdate({ _id: req.params.id }, leave, function(
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
