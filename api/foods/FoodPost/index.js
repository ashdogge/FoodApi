const makeInjectable = require("../../../helpers/makeInjectable");
const { Types } = require("mongoose");
module.exports = makeInjectable(
  {
    defaults: {
      FoodsModel: () => require("../models/food"),
    },
  },
  async function ({ FoodsModel }, req, res) {
    // Check that required parameters were passed. Can expand error-checking later if needed,
    // also check on frontend

    if (!req.body.name) {
      return res.status(404).json({ error: "name missing from request" });
    }
    if (isNaN(req.body.fat)) {
      return res.status(404).json({ error: "fat missing from request" });
    }
    if (isNaN(req.body.calories)) {
      return res.status(404).json({ error: "calories missing from request" });
    }
    if (isNaN(req.body.sodium)) {
      return res.status(404).json({ error: "sodium missing from request" });
    }
    if (isNaN(req.body.potassium)) {
      return res.status(404).json({ error: "potassium missing from request" });
    }
    if (!req.body.carbs) {
      return res.status(404).json({ error: "carbs missing from request" });
    }
    if (isNaN(req.body.carbs.fiber)) {
      return res.status(404).json({ error: "fiber missing from request" });
    }
    if (isNaN(req.body.carbs.sugar)) {
      return res.status(404).json({ error: "sugar missing from request" });
    }
    if (isNaN(req.body.protein)) {
      return res.status(404).json({ error: "id missing from request" });
    }
    // convert name to uppercase. Can be formatted on frontend
    let nName = req.body.name.toUpperCase();
    let nFat = parseFloat(req.body.fat);
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
      fat: nFat,
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
