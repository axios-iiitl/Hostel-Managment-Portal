const mongoose=require("mongoose");
const ItemSchema=new mongoose.Schema({
  TableNo:String,
  ChairNo:String,
  ShelfNo:String,
  LampNo:String,
  RoomNo:String
});
const Item=  mongoose.model("Item",ItemSchema);
module.exports={
  Item:Item,
  ItemSchema:ItemSchema
}