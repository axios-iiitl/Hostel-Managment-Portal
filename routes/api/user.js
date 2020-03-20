const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/dashboard", auth, (req, res) => {
  res.render("landing", { currentUser: req.user });
});

module.exports = router;
