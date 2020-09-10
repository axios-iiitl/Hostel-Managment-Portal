const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../models/User");
const Leave = require("../../models/Leave");
const RequestItem = require("../../models/RequestItem");
const RequestContact = require("../../models/RequestContact");
const RequestHostelFees = require("../../models/RequestHostelFees");
const RequestMessFees = require("../../models/RequestMessFees");

const auth = require("../../middleware/authadmin");
const { request } = require("express");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", auth, function (req, res) {
  RequestItem.find({},(err,items)=>{
    RequestContact.find({},(err,contacts)=>{
      if(err){
        throw Error(err);
      }else{
        res.render("landingadmin", {
          currentUser: req.user,
          status: "applied",
          clientType: req.session.client,
          totalitemsrequest:items.length,
          totalcontactsrequest:contacts.length
        });
      }
    });
  });
});

router.get("/data/leaves", auth, (req, res) => {
  var perPage = 4;
  var page;

  req.query.page === undefined ? (page = 0) : (page = parseInt(req.query.page));

  if (req.query.status === "recent") {
    req.session.status = "recent";
  } else if (req.query.status === "applied") {
    req.session.status = "applied";
  }

  if (req.session.status === "applied") {
    Leave.find({ Approve: null })
      .limit(perPage)
      .skip(perPage * parseInt(page))
      .sort({
        createdAt: "desc"
      })
      .exec(function (err, leaves) {
        if (err) Error(err);
        Leave.countDocuments({ Approve: null }).exec(function (err, count) {
          if (err) Error(err);
          res.send({
            leaves: leaves
          });
        });
      });
  } else if (req.session.status === "recent") {
    Leave.find()
      .limit(perPage)
      .skip(perPage * parseInt(page))
      .sort({
        createdAt: "desc"
      })
      .exec(function (err, leaves) {
        if (err) Error(err);
        Leave.countDocuments().exec(function (err, count) {
          if (err) Error(err);
          res.send({
            leaves: leaves
          });
        });
      });
  }
});

router.get("/dashboard/details", auth, function (req, res) {
  RequestItem.find({},async (err,requestitems)=>{
    RequestContact.find({},async(err,requestcontacts)=>{
      res.render("details", {
        currentUser: req.user,
        clientType: req.session.client,
        error: null,
        totalcontactsrequest:requestcontacts.length,
        totalitemsrequest:requestitems.length,
      });
    });
  });
});

router.post("/dashboard/info", auth, function (req, res) {
  RequestItem.find({},(err,items)=>{
    RequestContact.find({},(err,contacts)=>{
        User.findOne({ email: req.body.email + "@iiitl.ac.in" }, function (err, user) {
          if (err) Error(err);
          if(!user){ 
            res.render("details", {
              currentUser: req.user,
              clientType: req.session.client,
              error: "User not found",
              totalcontactsrequest:contacts.length,
              totalitemsrequest:items.length,
            });
            return;
          }
          Leave.find({ Email: req.body.email })
            .sort({ createdAt: "desc" })
            .exec(function (err, leaves) {
              if (err) {
                res.redirect("/admin/dashboard");
              }
              res.render("userinfo", {
                currentUser: req.user,
                leaves: leaves,
                clientType: req.session.client,
                user: user,
                totalcontactsrequest:contacts.length,
                totalitemsrequest:items.length,
              });
            });
        });
      });
   });
});

router.get("/dashboard/permit", auth, (req, res) => {
  if (req.query.approve && req.query._id) {
    var isApproved = req.query.approve === "true";

    Leave.findByIdAndUpdate(
      { _id: req.query._id },
      { Approve: isApproved },
      (err, leave) => {
        if (err) res.status(500);
        res.sendStatus(200);
      }
    );
  } else {
    res.status(500);
  }
});


router.get("/dashboard/item/edit/request",auth,async (req,res)=>{
  RequestItem.find({},async (err,requestitems)=>{
    RequestContact.find({},async(err,requestcontacts)=>{
      User.find({},async(err,users)=>{
        res.render("adminitem",{currentUser:req.user,
                               clientType:req.session.client,
                               requests:requestitems,
                               totalcontactsrequest:requestcontacts.length,
                               totalitemsrequest:requestitems.length,
                               users:users});
       });
    });
  }); 
});

router.get("/dashboard/item/edit/request/:id/:opt",auth,async(req,res)=>{
    if(req.params.opt==="accept"){
      RequestItem.findOneAndDelete({Email:req.params.id},async(err,request)=>{
        User.findOne({email:req.params.id},async(err,user)=>{
           user.items.tableNumber=request.items.tableNumber;
           user.items.chairNumber=request.items.chairNumber;
           user.items.shelfNumber=request.items.shelfNumber;
           user.items.lampNumber=request.items.lampNumber;
           user.items.tableNumber=request.items.tableNumber;
           user.items.bedNumber=request.items.bedNumber;
           await user.save();
        })
      });
      res.redirect("/admin/dashboard/item/edit/request");
    } else {
      RequestItem.findOneAndDelete({Email:req.params.id},async(err,request)=>{
        if(err){
          throw Error(err);
        }else{
          res.redirect("/admin/dashboard/item/edit/request");
        }
      })
    }
});

router.get("/dashboard/contact/edit/request",auth,async (req,res)=>{
  RequestItem.find({},async (err,requestitems)=>{
    RequestContact.find({},async(err,requestcontacts)=>{
      User.find({},async(err,users)=>{
        res.render("admincontact",{currentUser:req.user,
                               clientType:req.session.client,
                               requests:requestcontacts,
                               totalcontactsrequest:requestcontacts.length,
                               totalitemsrequest:requestitems.length,
                               users:users});
       });
    });
  }); 
});

router.get("/dashboard/contact/edit/request/:id/:opt",auth,async(req,res)=>{
  if(req.params.opt==="accept"){
    RequestContact.findOneAndDelete({Email:req.params.id},async(err,request)=>{
      User.findOne({email:req.params.id},async(err,user)=>{
         user.contacts.phoneNumber=request.contacts.phoneNumber;
         user.contacts.guardianName=request.contacts.guardianName;
         user.contacts.guardianNumber=request.contacts.guardianNumber;
         user.contacts.address=request.contacts.address;
         user.contacts.emergencyNumber=request.contacts.emergencyNumber;
         await user.save();
      })
    });
    res.redirect("/admin/dashboard/item/edit/request");
  } else {
    RequestContact.findOneAndDelete({Email:req.params.id},async(err,request)=>{
      if(err){
        throw Error(err);
      }else{
        res.redirect("/admin/dashboard/contact/edit/request");
      }
    });
  }
});

router.get("/dashboard/fees/edit/request",(req,res)=>{
  RequestItem.find({},async (err,requestitems)=>{
    RequestContact.find({},async(err,requestcontacts)=>{
      RequestHostelFees.find({},async(err,requesthostelfees)=>{
        RequestMessFees.find({},async(err,requestmessfees)=>{

      User.find({},async(err,users)=>{
          
        let hostelfeesfirstrequest=[];
        let hostelfeeseditrequest =[];
        let messfeesfirstrequest=[];
        let messfeeseditrequest=[];

        // Hostel Fees First Request
        await users.forEach(async(user)=>{
            await user.hostelfees.forEach((hostel)=>{
              if(hostel.accepted == "Application under Review"){
                    let x={
                      name:user.name,
                      rollNo:user.rollNo,
                      branch:user.branch,
                      course:user.course,
                      email:user.email
                    }
                  x.hostel=hostel;
                  hostelfeesfirstrequest.push(x);
              }
            });
        });


        //Hostel Fees Edit Request
        await requesthostelfees.forEach(async(hh)=>{
           await users.forEach(async(user)=>{
             if(user.email == hh.email){
                let i=await user.hostelfees.findIndex(y=>y.sem==hh.hostelfees.sem);
                const x={
                  name:user.name,
                  rollNo:user.rollNo,
                  email:user.email,
                  hostel:user.hostelfees[i],
                  newhostel:hh.hostelfees,
                  branch:user.branch,
                  course:user.course
                }
                hostelfeeseditrequest.push(x);
             }
           });
        });
        
        //Mess Fees First Request
        await users.forEach(async(user)=>{
          await user.messfees.forEach((mess)=>{
            if(mess.accepted == "Application under Review"){
                  let x={
                    name:user.name,
                    rollNo:user.rollNo,
                    branch:user.branch,
                    course:user.course,
                    email:user.email
                  }
                x.mess=mess;
                messfeesfirstrequest.push(x);
            }
          });
      });


        //Mess Fees Edit Request
        
        await requestmessfees.forEach(async(hh)=>{
          await users.forEach(async(user)=>{
            if(user.email == hh.email){
               let i=await user.messfees.findIndex(y=>y.sem==hh.messfees.sem);
               const x={
                 name:user.name,
                 rollNo:user.rollNo,
                 email:user.email,
                 mess:user.messfees[i],
                 newmess:hh.messfees,
                 branch:user.branch,
                 course:user.course
               }
               messfeeseditrequest.push(x);
            }
          });
       });
             

        const queriedhostel=[];
        const queriedmess=[];

        // Queried Hostel Fees First Request
        if(req.query.sem && req.query.course){
           hostelfeesfirstrequest.forEach((x)=>{
              if(x.hostel.sem==req.query.sem && req.query.course == (x.course+":"+x.branch)){
                 queriedhostel.push(x);
              }
           });
        }else{
          hostelfeesfirstrequest.forEach((x)=>{
            if(x.hostel.sem==1 && x.course == "BTECH" && x.branch =="CS"){
               queriedhostel.push(x);
            }
          }); 
        }
      
        //Queried Mess First Request
        if(req.query.sem && req.query.course){
          messfeesfirstrequest.forEach((x)=>{
             if(x.mess.sem==req.query.sem && req.query.course == (x.course+":"+x.branch)){
                queriedmess.push(x);
             }
          });
       }else{
         messfeesfirstrequest.forEach((x)=>{
           if(x.mess.sem==1 && x.course == "BTECH" && x.branch =="CS"){
              queriedmess.push(x);
           }
         }); 
       }
       
        res.render("adminfees",{currentUser:req.user,
                               clientType:req.session.client,
                               hostelfeesfirstrequest:queriedhostel,
                               hostelfeeseditrequest,
                               messfeesfirstrequest:queriedmess,
                               messfeeseditrequest,
                               totalcontactsrequest:requestcontacts.length,
                               totalitemsrequest:requestitems.length,
                               users:users});
       });
      });
     });
    });
  });   
});

router.get("/dashboard/hostelfeesfirstrequest/:email/:sem/:choice",auth,(req,res)=>{
   User.findOne({email:req.params.email},async(err,user)=>{
      user.hostelfees.forEach((i)=>{
        if(i.sem == req.params.sem){
          i.accepted=req.params.choice;
        }
      });
      await user.save();
      res.redirect("/admin/dashboard/fees/edit/request");
   });
});

router.get("/dashboard/messfeesfirstrequest/:email/:sem/:choice",auth,(req,res)=>{
  User.findOne({email:req.params.email},async(err,user)=>{
     user.messfees.forEach((i)=>{
       if(i.sem == req.params.sem){
         i.accepted=req.params.choice;
       }
     });
     await user.save();
     res.redirect("/admin/dashboard/fees/edit/request");
  });
});

router.get("/dashboard/hostelfeeseditrequest/:email/:sem/:choice",auth,(req,res)=>{

  RequestHostelFees.findOne({email:req.params.email},(err,request)=>{
      User.findOne({email:req.params.email},async(err,user)=>{
        if(err){
          throw Error(err);
        }else{
          if(req.params.choice == "verified"){
              await user.hostelfees.forEach((i)=>{
                 if(i.sem == request.hostelfees.sem){
                    i.transactionAmount = request.hostelfees.transactionAmount;
                    i.transactionId = request.hostelfees.transactionId;
                    i.modeOfPayment = request.hostelfees.modeOfPayment;
                    i.dateTime = request.hostelfees.dateTime;
                    i.occupancy = request.hostelfees.occupancy;
                    i.accepted = "verified";
                 }
              });
              await user.save();
              RequestHostelFees.findOneAndDelete({email:req.params.email},(err,x)=>{
                if(err){
                  throw Error(err);
                }else{
                  res.redirect("/admin/dashboard/fees/edit/request");
                }
            })
          }else{
             RequestHostelFees.findOneAndDelete({email:req.params.email},(err,x)=>{
                 if(err){
                   throw Error(err);
                 }else{
                   res.redirect("/admin/dashboard/fees/edit/request");
                 }
             })
          }
        }
      });
  });
});

module.exports = router;
