const mongoose = require("mongoose");

const RequestItemSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: true
    },
    Email: {
      type: String,
      trim: true,
      required: true
    },
    items:{
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
          type: String,
          trim: true
        }
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("requestitem", RequestItemSchema);
