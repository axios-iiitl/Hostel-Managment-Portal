const express=require("express");
const bodyParser=require("body-parser");
const User=require("../../models/User");
const Admin=require("../../models/Admin");
const Leave=require("../../models/Leave");
const auth = require("../../middleware/authadmin");


const router=express.Router();


router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard",auth,function(req,res){
    Leave.find({},function(err,leaves){
        res.render("landingadmin",{currentUser:req.user,leaves:leaves});
    });
});

router.post("/dashboard/info",auth,function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        res.render("userinfo",{user:user,currentUser:req.user});
    });
});

router.post("/dashboard/info/leave",auth,function(req,res){
 Leave.find({Email:req.body.email},function(err,leaves){
     if(err){
         res.redirect("/user/dashboard");
     }else{
     res.render("leaveinfo",{currentUser:req.user,leaves:leaves});
     }
 });
});


router.get("/dashboard/permit/accept/:id",function(req,res){
    Leave.findOne({_id:req.params.id},function(err,leave){
          if(err){
              res.redirect("/admin/dashboard");
          }else{
              leave.Approve=true;
              Leave.deleteOne({_id:req.param.id},function(err,del){
                  if(err){
                      res.redirect("/admin/dashboard");
                  }else{
                      Leave.create(leave,function(err,leave){
                          if(err){
                              res.redirect("/admin/dashboard");
                          }else{
                              res.redirect("/admin/dashboard");
                          }
                      });
                  }
              });
          }
    });
});

router.get("/dashboard/permit/reject/:id",function(req,res){
    Leave.findOne({_id:req.params.id},function(err,leave){
          if(err){
              res.redirect("/admin/dashboard");
          }else{
              leave.Approve=false;
              Leave.deleteOne({_id:req.param.id},function(err,del){
                  if(err){
                      res.redirect("/admin/dashboard");
                  }else{
                      Leave.create(leave,function(err,leave){
                          if(err){
                              res.redirect("/admin/dashboard");
                          }else{
                              res.redirect("/admin/dashboard");
                          }
                      });
                  }
              });
          }
    });
});

module.exports = router;
