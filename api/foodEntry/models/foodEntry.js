const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");

const FoodEntrySchema = new Schema({
  food: {
    type: Types.ObjectId,
    ref: "Foods",
    required: true,
  },
  eatenAt: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("FoodEntry", FoodEntrySchema);
