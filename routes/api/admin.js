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

  Leave.find()
    .limit(perPage)
    .skip(perPage * parseInt(page))
    .sort({
      updatedAt: "desc"
    })
    .exec(function(err, leaves) {
      console.log(leaves);
      Leave.countDocuments().exec(function(err, count) {
        console.log("````````````````````````````````");
        console.log(count, perPage, page);
        console.log("````````````````````````````````");
        res.render("landingadmin", {
          currentUser: req.user,
          leaves: leaves,
          page: page,
          number: count / perPage
        });
      });
    });
  // .sort("-createdAt")
  // .skip(skip)
  // .limit(limit)
  /* .exec(function(err, leaves) {
      console.log(leaves);
      if (err) {
        res.redirect("/");
      } else {
        res.render("landingadmin", {
          currentUser: req.user,
          leaves: leaves,
          number: limit
        });
      }
    }); */
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
  Leave.findOne({ _id: req.params.id }, function(err, leave) {
    if (err) {
      res.redirect("/admin/dashboard");
    } else {
      leave.Approve = true;
      Leave.findOneAndUpdate(
        { _id: req.params.id, useFindAndModify: true },
        leave,
        function(err, leave) {
          if (err) {
            res.redirect("/admin/dashboard");
          } else {
            res.redirect("/admin/dashboard");
          }
        }
      );
    }
  });
});

router.get("/dashboard/permit/reject/:id", function(req, res) {
  Leave.findOne({ _id: req.params.id }, function(err, leave) {
    if (err) {
      res.redirect("/admin/dashboard");
    } else {
      leave.Approve = false;
      Leave.findOneAndUpdate(
        { _id: req.params.id, useFindAndModify: true },
        leave,
        function(err, leave) {
          if (err) {
            res.redirect("/admin/dashboard");
          } else {
            res.redirect("/admin/dashboard");
          }
        }
      );
    }
  });
});

module.exports = router;
