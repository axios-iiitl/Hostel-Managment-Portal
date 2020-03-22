const mongoose=require("mongoose");
const User=require("../models/User");

const auth=async(req,res,next)=>{
  try{
      if(req.session.token){
          User.findOne({googleId:req.session.token},function(err,user){
           if(user){
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

module.exports = auth;
