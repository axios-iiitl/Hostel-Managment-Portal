const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
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
    }
  }
});

module.exports = mongoose.model("User", UserSchema);
