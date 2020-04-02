const express = require("express");
const bodyParser = require("body-parser");
const JsAlert=require("js-alert");
const auth = require("../../middleware/authuser");
const User = require("../../models/User");
const Leave = require("../../models/Leave");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", auth, (req, res) => {
  Leave.findOne({Email:req.user.email,Approve:null}).exec(function(err,leave){
    if(leave){
      res.render("landing",{currentUser: req.user,leave:leave, clientType: req.session.client,flag:1});
    }else{
    res.render("landing", { currentUser: req.user,leave:leave, clientType: req.session.client,flag:0});
    }
  });
});

router.get("/dashboard/leavehistory",auth,(req,res)=>{
  var perPage=4; 
  var page;
      req.query.pageno == undefined ? (page = 0) : (page = parseInt(req.query.pageno));

     Leave.find({Email:req.user.email})
     .limit(perPage)
     .skip(perPage * parseInt(page))
     .sort({
       createdAt:"desc"
     })
     .exec(function(err,leaves){
      Leave.countDocuments({Email:req.user.email}).exec(function(err,count){
           res.render("leavehistory",{
                leaves:leaves,
                currentUser:req.user,
                clientType:req.session.client,
                page:page,
                number:count/perPage
           });
      });
     });
});
 
router.get("/dashboard/items/:id", auth, function(req, res) {
  User.findOne({ googleId: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render("item", { user: user, currentUser: req.user, clientType: req.session.client });
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
      res.render("contact", { user: user, currentUser: req.user, clientType: req.session.client });
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
      res.render("editleave",{currentUser:req.user,leave:leave, clientType: req.session.client});
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
