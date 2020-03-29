const express = require("express");
const bodyParser = require("body-parser");
const JsAlert=require("js-alert");
const auth = require("../../middleware/authuser");
const User = require("../../models/User");
const Leave = require("../../models/Leave");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", auth, (req, res) => {
  Leave.find({Email:req.user.email}).sort('-createdAt').exec(function(err,leaves){
    if(err){
      res.redirect("/");
    }else{
    res.render("landing", { currentUser: req.user,leaves:leaves});
    }
  });
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

//Leave Routes

router.post("/dashboard/leave",auth,function(req,res){
   Leave.create(req.body.leave,function(err,leave){
     if(err){
       res.redirect("/user/dashboard");
     }else{
       res.redirect("/user/dashboard");
     }
   });
});

router.get("/dashboard/edit/leave/:id",auth,function(req,res){
    Leave.findOne({_id:req.params.id},function(err,leave){
      if(err){
        res.redirect("/user/dashboard");
      }
      console.log(leave);
      res.render("editleave",{currentUser:req.user,leave:leave});
    });
});


router.post("/dashboard/edit/leave/:id",auth,function(req,res){
  
  Leave.findOneAndUpdate({_id:req.params.id, useFindAndModify: true},req.body.leave,function(err,leave){
    if(err){
      res.redirect("/user/dashboard");
    }else{
            res.redirect("/user/dashboard");
    } 
  });

});

router.get("/dashboard/delete/leave/:id",auth,function(req,res){
  Leave.deleteOne({_id:req.params.id},function(err,leave){
    if(err){
      res.redirect("/user/dashboard");
    }else{
      res.redirect("/user/dashboard");
    }
  });
});

module.exports = router;
