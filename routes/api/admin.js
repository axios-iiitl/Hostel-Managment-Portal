const express=require("express");
const bodyParser=require("body-parser");
const User=require("../../models/User");
const Admin=require("../../models/Admin");
const auth = require("../../middleware/authadmin");


const router=express.Router();


router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard",auth,function(req,res){
    res.render("landingadmin",{currentUser:req.user});
});

router.post("/dashboard/info",auth,function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        res.render("userinfo",{user:user,currentUser:req.user});
    });
});
module.exports = router;
