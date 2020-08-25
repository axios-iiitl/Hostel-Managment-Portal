const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../../middleware/authsuperuser");
const Admin = require("../../models/Admin");
const { reset } = require("nodemon");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard",auth,async (req,res)=>{
   Admin.find({},(err,admins)=>{
      res.render("super_user",{currentUser:req.user,clientType:req.session.client,admins:admins});
   });
});

router.post("/dashboard",auth,async(req,res)=>{
   Admin.create(req.body.mains,(err,admin)=>{
      if(err){
         res.redirect("/superuser/dashboard");
      }else{
         res.redirect("/superuser/dashboard");
      }
   });
});

router.get("/remove/:email",auth,async (req,res)=>{
   Admin.deleteOne({email:req.params.email},(err,admin)=>{
      if(err){
         res.redirect("/superuser/dashboard");
      }else{
         res.redirect("/superuser/dashboard");
      }
   });
});

module.exports = router;