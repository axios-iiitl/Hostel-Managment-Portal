const mongoose = require("mongoose");

const RequestContactSchema = new mongoose.Schema(
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
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("requestcontact",RequestContactSchema);
