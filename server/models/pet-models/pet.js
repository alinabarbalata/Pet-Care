const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [1, "Age must be a positive number"],
    },
    breed: { type: mongoose.Schema.Types.ObjectId, ref: "Breed" },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
    type: {
      type: String,
      enum: ["cat"],
      required: true,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
