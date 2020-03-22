const mongoose=require("mongoose");
const Admin=require("../models/Admin");

const auth=async(req,res,next)=>{
    try{
        if(req.session.token){
            Admin.findOne({googleId:req.session.token},function(err,admin){
             if(admin){
                 next();
             }else{
                res.cookie("token", "");
                res.redirect("/");
             }
            })
        }else{
          res.cookie("token", "");
          res.redirect("/");
        }  
      }
     catch(e){
           res.redirect("/");
     }
  }

  module.exports=auth;
