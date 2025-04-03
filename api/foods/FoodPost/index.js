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
    // convert name to uppercase. Can be formatted on frontend
    let nName = req.body.name.toUpperCase();
    let nCalories = parseFloat(req.body.calories);
    let nSodium = parseFloat(req.body.sodium);
    let nPotassium = parseFloat(req.body.potassium);
    let nCarbs = parseFloat(req.body.carbs.total);
    let nSugar = parseFloat(req.body.carbs.sugar);
    let nFiber = parseFloat(req.body.carbs.fiber);
    let nProtein = parseFloat(req.body.protein);

    //build new food instance

    let newFood = {
      _id: new Types.ObjectId(),
      name: nName,
      calories: nCalories,
      sodium: nSodium,
      potassium: nPotassium,
      carbs: {
        total: nCarbs,
        sugar: nSugar,
        fiber: nFiber,
      },
      protein: nProtein,
    };

    let status = await FoodsModel.create(newFood);
    if (!status) {
      return res.status(406).json({ error: "Failed to add food" });
    }

    return res.status(200).json(status);
  }
);
