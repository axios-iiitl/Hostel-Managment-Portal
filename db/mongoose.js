const mongoose=require("mongoose");
const keys=require("../config/keys");
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true },function(){
    console.log("MongoDB Connected");
});