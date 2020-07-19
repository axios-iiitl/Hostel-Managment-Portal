const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const auth = require("../../middleware/authmess");
const Mess = require("../../models/Mess");
const Leave = require("../../models/Leave");
const moment=require("moment");
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard",auth,async (req,res)=>{
     
    Leave.find({},function(err,leaves){
        if(err) Error(err);
        else{
            let arr=[];
            leaves.forEach((s,i)=>{
               if( moment(Date.now()).format("ddd MMM D, YYYY") <=  moment(s.Return).format("ddd MMM D, YYYY") && moment(Date.now()).format("ddd MMM D, YYYY")>=  moment(s.Leave).format("ddd MMM D, YYYY") && s.Approve===true)
                arr.push(s);
            });
            console.log(arr);
            res.render("mess_manager",{currentUser:req.user,clientType:req.session.client});
        }
    });
    // if(moment(Date.now()).format("ddd MMM D, YYYY")>=  moment("2020-06-16T18:30:00.000+00:00").format("ddd MMM D, YYYY") )
    //  console.log("ass");
    // else
    //  console.log("fuck");
});

module.exports = router;