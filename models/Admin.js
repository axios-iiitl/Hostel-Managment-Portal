const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: String,
  googleId: String
});

const Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;
