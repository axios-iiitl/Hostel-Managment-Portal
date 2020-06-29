const mongoose = require("mongoose");

const SuperSchema = new mongoose.Schema({
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
    accessToken: [String]
});
module.exports = mongoose.model("Super", SuperSchema);
