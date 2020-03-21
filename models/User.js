const mongoose=require("mongoose");
const Item=require("./Item");
const Contact=require("./Contact");
const UserSchema=new mongoose.Schema({
  googleId:String,
  name:String,
  items:[Item.ItemSchema],
  contacts:[Contact.ContactSchema]
});
module.exports=mongoose.model("User",UserSchema);
