const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const auth = require("../../middleware/authmess");
const Mess = require("../../models/Mess");
const Leaves = require("../../models/Leave");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard",auth,async (req,res)=>{
    res.render("mess_manager",{currentUser:req.user,clientType:req.session.client});
});

module.exports = router;