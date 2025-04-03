const makeInjectable = require("../../../helpers/makeInjectable");
const { Types } = require("mongoose");
module.exports = makeInjectable(
  {
    defaults: {
      FoodsModel: () => require("../models/food"),
    },
  },
  async function ({ FoodsModel }, req, res) {
    // Check that required parameters were passed. Can expand error-checking later if needed, also check on frontend
    if (
      !req.body.id ||
      !req.body.name ||
      !req.body.calories ||
      !req.body.sodium ||
      !req.body.potassium ||
      !req.body.carbs ||
      !req.body.carbs.total ||
      !req.body.carbs.fiber ||
      !req.body.carbs.sugar ||
      !req.body.protein
    ) {
      return res.status(404).json({ error: "One or more fields are missing" });
    }
    let id = req.body.id;
    let nName = req.body.name.toUpperCase();
    let nCalories = parseFloat(req.body.calories);
    let nSodium = parseFloat(req.body.sodium);
    let nPotassium = parseFloat(req.body.potassium);
    let nCarbs = parseFloat(req.body.carbs.total);
    let nSugar = parseFloat(req.body.carbs.sugar);
    let nFiber = parseFloat(req.body.carbs.fiber);
    let nProtein = parseFloat(req.body.protein);

    //Get the food to be edited
    const food = await FoodsModel.findOne({ _id: id });
    if (!food) {
      return res.status(404).json({ error: "No food found with provided ID" });
    }

    //Update fields

    food.name = nName;
    food.calories = nCalories;
    food.sodium = nSodium;
    food.potassium = nPotassium;
    food.carbs.total = nCarbs;
    food.carbs.sugar = nSugar;
    food.carbs.fiber = nFiber;
    food.protein = nProtein;

    let status = await food.save();
    if (!status) {
      return res.status(409).json({ error: "Failed to save food" });
    }

    return res.status(200).json({ message: "Food saved!" });
  }
);
