const mongoose=require("mongoose");
const ContactSchema=new mongoose.Schema({
  PhoneNo:String,
  FatherName:String,
  FatherNo:String,
  Address:String,

});
const Contact=  mongoose.model("Contact",ContactSchema);
module.exports={
  Contact:Contact,
  ContactSchema:ContactSchema
}