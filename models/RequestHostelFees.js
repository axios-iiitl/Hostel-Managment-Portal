const mongoose = require("mongoose");

const RequestHostelSchema = new mongoose.Schema(
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
    hostelfees:{
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

        occupancy:{
            type:String,
            trim:true
        },

        accepted:{
            type:Boolean,
            default:false
        }
    }  
});
module.exports = mongoose.model("requesthostelfees",RequestHostelSchema);
