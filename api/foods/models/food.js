const mongoose = require("mongoose");
const FoodSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  calories: Number,
  fat: Number,
  sodium: Number,
  potassium: Number,
  carbs: {
    total: Number,
    fiber: Number,
    sugar: Number,
  },
  protein: Number,
});

module.exports = mongoose.model("Foods", FoodSchema, "Foods");
