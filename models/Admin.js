const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: String,
  name:String,
  accessToken: [String]
});

const Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;
