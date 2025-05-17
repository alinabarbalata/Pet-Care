const mongoose = require("mongoose");

const appointmentStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Status", appointmentStatusSchema);
