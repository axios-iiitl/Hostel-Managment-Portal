const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
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
    Leave: {
      type: Date,
      trim: true,
      required: true
    },
    Return: {
      type: Date,
      trim: true,
      required: true
    },
    leaveDuration: {
      type: Number,
      required: true
    },
    Reason: {
      type: String,
      trim: true,
      required: true
    },
    Approve: {
      type: Boolean
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Leave", LeaveSchema);
