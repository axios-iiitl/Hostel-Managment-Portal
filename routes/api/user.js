const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../../middleware/authuser");
const User = require("../../models/User");
const Leave = require("../../models/Leave");
const RequestItem = require("../../models/RequestItem");
const RequestContact = require("../../models/RequestContact");

const moment = require("moment");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", auth, (req, res) => {
  Leave.findOne({ Email: req.user.email, Approve: null }).exec(function (
    err,
    leave
  ) {
    if (err) Error(err);
    if (leave) {
      res.render("landing", {
        currentUser: req.user,
        leave: leave,
        clientType: req.session.client,
        flag: 1
      });
    } else {
      res.render("landing", {
        currentUser: req.user,
        leave: leave,
        clientType: req.session.client,
        flag: 0
      });
    }
  });
});

router.get("/dashboard/application", auth, (req, res) => {
  Leave.findOne({ Email: req.user.email, Approve: null }, (err, leave) => {
    if (err) {
      res.redirect("/user/dashboard");
    }
    if (leave) {
      res.redirect("/user/dashboard/edit/leave/" + leave.id);
    } else {
      const errors = [];
      res.render("application", {
        currentUser: req.user,
        clientType: req.session.client,
        flag: 0,
        msg: errors
      });
    }
  });
});

router.get("/dashboard/leavehistory", auth, (req, res) => {
  var perPage = 4;
  var page;
  req.query.pageno === undefined
    ? (page = 0)
    : (page = parseInt(req.query.pageno));

  Leave.find({ Email: req.user.email })
    .limit(perPage)
    .skip(perPage * parseInt(page))
    .sort({
      createdAt: "desc"
    })
    .exec(function (err, leaves) {
      if (err) Error(err);
      if (leaves.length === 0) {
        res.render("leavehistory", {
          leaves: leaves,
          currentUser: req.user,
          clientType: req.session.client
        });
      } else if (err) {
        res.redirect("/user/dashboard");
      } else {
        Leave.countDocuments({ Email: req.user.email }).exec(function (
          err,
          count
        ) {
          if (err) {
            res.redirect("/user/dashboard");
          } else if (count) {
            res.render("leavehistory", {
              leaves: leaves,
              currentUser: req.user,
              clientType: req.session.client,
              page: page,
              number: count / perPage
            });
          }
        });
      }
    });
});

router.get("/dashboard/items/:id", auth, function (req, res) {
  User.findOne({ googleId: req.params.id }, function (err, user) {
    RequestItem.find({Email:user.email},(err,request)=>{

        if (err) {
          console.log(err);
        } else {
          if(request.length){
            res.render("item", {
              user: user,
              currentUser: req.user,
              clientType: req.session.client,
              frequest:1,
              request:request
            });
          }else{
            res.render("item", {
              user: user,
              currentUser: req.user,
              clientType: req.session.client,
              frequest:0,
              request:request
            });
          }
          
        }
      
    });
  });
});

router.post("/dashboard/items/:id", auth, function (req, res) {
  User.findOne({ googleId: req.params.id }, function (err, user) {

    if(err){
      throw Error(err);
    }

    if(user.fitem===1){
      user.fitem=0;
        Object.keys(req.body.items).forEach(
          v => (user.items[v] = req.body.items[v])
        );
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/user/dashboard");
          }
        });
    } else {
        let x={
          Name:user.name,
          Email:user.email,
          items:req.body.items
        }
        RequestItem.create(x,(err,request)=>{
          if(err){
            console.log(err);
          } else {
            res.redirect("/user/dashboard");
          }
      });
    }
  });
});

router.get("/dashboard/contacts/:id", auth, function (req, res) {
  User.findOne({ googleId: req.params.id }, function (err, user) {
    RequestContact.find({Email:user.email},(err,request)=>{

        if (err) {
          console.log(err);
        } else {
          if(request.length){
            res.render("contact", {
              user: user,
              currentUser: req.user,
              clientType: req.session.client,
              frequest:1,
              request:request
            });
          }else{
            res.render("contact", {
              user: user,
              currentUser: req.user,
              clientType: req.session.client,
              frequest:0,
              request:request
            });
          }
          
        }
      
    });
  });
});

// router.get("/dashboard/contacts/:id", auth, function (req, res) {
//   User.findOne({ googleId: req.params.id }, function (err, user) {
//     RequestContact.find({Email:user.email},(err,request)=>{
//       if(err){
//         throw Error(err);
//       }else{
//         console.log(request.length);
//         if(request.length){
//           res.render("contact", {
//             user: user,
//             currentUser: req.user,
//             clientType: req.session.client,
//             frequest:1,
//             request:request
//           }); 
//         }else{
//           res.render("contact", {
//             user: user,
//             currentUser: req.user,
//             clientType: req.session.client,
//             frequest:0,
//             request:request
//           });
//         }
//       }
//     })
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("contact", {
//         user: user,
//         currentUser: req.user,
//         clientType: req.session.client
//       });
//     }
//   });
// });

router.post("/dashboard/contacts/:id", auth, function (req, res) {
  User.findOne({ googleId: req.params.id }, function (err, user) {

    if(err){
      throw Error(err);
    }

    if(user.fcontact===1){
        user.fcontact=0;
        Object.keys(req.body.contacts).forEach(
          v => (user.contacts[v] = req.body.contacts[v])
        );
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/user/dashboard");
          }
        });
    } else {
      let x={
        Name:user.name,
        Email:user.email,
        contacts:req.body.contacts
      }
      RequestContact.create(x,(err,request)=>{
         if(err){
          console.log(err);
         } else {
          res.redirect("/user/dashboard");
         }
      });
    }
   
    // if (err) {
    //   console.log(err);
    // } else {
    //   Object.keys(req.body.contacts).forEach(
    //     v => (user.contacts[v] = req.body.contacts[v])
    //   );
    //   user.save(function (err) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       res.redirect("/user/dashboard");
    //     }
    //   });
    // }
  });
});


router.get("/dashboard/fees/:id",auth,async (req,res)=>{
  User.findOne({ googleId: req.params.id }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("fees", {
        user: user,
        currentUser: req.user,
        clientType: req.session.client
      });
    }
  });
})


// Leave Routes

router.post("/dashboard/leave", function (req, res) {
  const errors = [];
  if (
    req.body.leave.Name !== req.user.name ||
    req.body.leave.Email !== req.user.email
  ) {
    errors.push("Name or Email has changed and user is requested not to do so");
    res.render("application", {
      currentUser: req.user,
      msg: errors,
      clientType: req.session.client,
      flag: 0
    });
  } else {
    var leaveDuration = Math.ceil(
      (new Date(req.body.leave.Return) - new Date(req.body.leave.Leave)) /
        (1000 * 60 * 60 * 24)
    );
    req.body.leave.leaveDuration = leaveDuration;
    if (leaveDuration <= 0) {
      errors.push("Please enter the date correctly");
      res.render("application", {
        currentUser: req.user,
        msg: errors,
        clientType: req.session.client,
        flag: 0
      });
    } else {
      Leave.create(req.body.leave, function (err, leave) {
        if (err) {
          console.log(err);
          res.redirect("/user/dashboard");
        } else {
          res.redirect("/user/dashboard");
        }
      });
    }
  }
});

router.get("/dashboard/edit/leave/:id", auth, function (req, res) {
  Leave.findOne({ _id: req.params.id }, function (err, leave) {
    if (err) {
      res.redirect("/user/dashboard");
    }
    const errors = [];
    var dates = {
      leave: moment(leave.Leave).format("ll"),
      return: moment(leave.Return).format("ll")
    };
    res.render("editleave", {
      currentUser: req.user,
      leave: leave,
      clientType: req.session.client,
      msg: errors,
      dates
    });
  });
});

router.post("/dashboard/edit/leave/:id", auth, function (req, res) {
  const errors = [];
  if (
    req.body.leave.Name !== req.user.name ||
    req.body.leave.Email !== req.user.email
  ) {
    errors.push("Name or Email has changed and user is requested not to do so");
    Leave.findOne({ _id: req.params.id }, function (err, leave) {
      if (err) Error(err);
      var dates = {
        leave: moment(leave.Leave).format("ll"),
        return: moment(leave.Return).format("ll")
      };
      res.render("editleave", {
        currentUser: req.user,
        msg: errors,
        clientType: req.session.client,
        leave: leave,
        dates
      });
    });
  } else {
    var leaveDuration = Math.ceil(
      (new Date(req.body.leave.Return) - new Date(req.body.leave.Leave)) /
        (1000 * 60 * 60 * 24)
    );
    req.body.leave.leaveDuration = leaveDuration;
    if (leaveDuration <= 0) {
      errors.push("Please enter the date correctly");
      Leave.findOne({ _id: req.params.id }, function (err, leave) {
        if (err) Error(err);
        var dates = {
          leave: moment(leave.Leave).format("ll"),
          return: moment(leave.Return).format("ll")
        };
        res.render("editleave", {
          currentUser: req.user,
          msg: errors,
          clientType: req.session.client,
          leave: leave,
          dates
        });
      });
    } else {
      Leave.findOneAndUpdate({ _id: req.params.id }, req.body.leave, function (
        err,
        leave
      ) {
        if (err) {
          res.redirect("/user/dashboard");
        } else {
          res.redirect("/user/dashboard");
        }
      });
    }
  }
});

router.get("/dashboard/delete/leave/:id", auth, function (req, res) {
  Leave.deleteOne({ _id: req.params.id }, function (err, leave) {
    if (err) {
      res.redirect("/user/dashboard");
    } else {
      res.redirect("/user/dashboard");
    }
  });
});

router.get("/dashboard/profile/:id", auth, function (req, res) {
  User.findOne({ googleId: req.params.id }, function (err, user) {
    if (err) {
      res.redirect("/user/dashboard");
    }
    res.render("yourprofile", { currentUser: req.user, clientType: req.session.client, user: user });
  });
});

module.exports = router;
