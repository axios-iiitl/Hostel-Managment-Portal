const mongoose = require("mongoose");

const RequestMessSchema = new mongoose.Schema(
{
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    messfees:{
        sem:{
            type:String,
            trim:true
        },
        transactionAmount:{
            type:String,
            trim:true
        },
        transactionId:{
            type:String,
            trim:true
        },
        modeOfPayment:{
            type:String,
            trim:true
        },
        dateTime:{
            type:Date
        },
        accepted:{
            type:Boolean,
            default:false
        }
    }  
});
module.exports = mongoose.model("requestmessfees",RequestMessSchema);
