const makeInjectable = require("../../../helpers/makeInjectable");
require("../../foods/models/food");
module.exports = makeInjectable(
  {
    defaults: {
      FoodEntryModel: /*istanbul ignore next*/ () =>
        require("../models/foodEntry"),
    },
  },
  async function ({ FoodEntryModel }, req, res) {
    try {
      // Fetch all entries and populate the `food` ref
      const foodEntries = await FoodEntryModel.find().populate("food");
      // If the collection is simply empty, send an empty array
      return res.status(200).json(foodEntries);
    } catch (err) {
      console.error("Error fetching food entries:", err);
      return res.status(500).json({ error: err.message });
    }
  }
);
