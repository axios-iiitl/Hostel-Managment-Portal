const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    trim: true,
    required: true
  },
  accessToken: [String],
  name: {
    type: String,
    trim: true,
    required: true
  },
  branch: {
    type: String,
    trim: true,
    required: true
  },
  year: {
    type: String,
    trim: true,
    required: true
  },
  course: {
    type: String,
    trim: true,
    required: true
  },
  rollNo: {
    type: String,
    trim: true,
    required: true,
    index: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  displayPicture: {
    type: String,
    trim: true
  },
  items: {
    tableNumber: {
      type: String,
      trim: true
    },
    chairNumber: {
      type: String,
      trim: true
    },
    shelfNumber: {
      type: String,
      trim: true
    },
    lampNumber: {
      type: String,
      trim: true
    },
    roomNumber: {
      type: String,
      trim: true
    },
    bedNumber:{
      type:String,
      trim:true
    }
  },
  contacts: {
    phoneNumber: {
      type: String,
      trim: true
    },
    guardianName: {
      type: String,
      trim: true
    },
    guardianNumber: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    emergencyNumber:{
      type: String,
      trim: true
    }
  },
  fitem:{
    type:Number,
    default:1
  }, 
  fcontact:{
    type:Number,
    default:1
  },
});

module.exports = mongoose.model("User", UserSchema);
