const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../../middleware/authsuperuser");
const Admin = require("../../models/Admin");
const { reset } = require("nodemon");
const router = express.Router();
const Mess = require("../../models/Mess");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard",auth,async (req,res)=>{
   Admin.find({},(err,admins)=>{
      if(err) Error(err);
      else{
         Mess.find({},(err,messes)=>{
            if(err) Error(err);
            else{
               res.render("super_user",{currentUser:req.user,clientType:req.session.client,admins:admins,messes:messes});
            }
         });
      }
   });
});

router.post("/admin/add",auth,async(req,res)=>{
   Admin.create(req.body.mains,(err,admin)=>{
      if(err){
         res.redirect("/superuser/dashboard");
      }else{
         res.redirect("/superuser/dashboard");
      }
   });
});

router.post("/mess/add",auth,async(req,res)=>{
   Mess.create(req.body.mains,(err,mess)=>{
      if(err){
         res.redirect("/superuser/dashboard");
      }else{
         res.redirect("/superuser/dashboard");
      }
   });
});


router.get("/remove/admin/:email",auth,async (req,res)=>{
   Admin.deleteOne({email:req.params.email},(err,admin)=>{
      if(err){
         res.redirect("/superuser/dashboard");
      }else{
         res.redirect("/superuser/dashboard");
      }
   });
});

router.get("/remove/mess/:email",auth,async (req,res)=>{
   Mess.deleteOne({email:req.params.email},(err,mess)=>{
      if(err){
         res.redirect("/superuser/dashboard");
      }else{
         res.redirect("/superuser/dashboard");
      }
   });
});

module.exports = router;