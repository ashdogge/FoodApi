const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      FoodEntryModel: /*istanbul ignore next*/ () =>
        require("../models/foodEntry"),
    },
  },
  async function ({ FoodEntryModel }, req, res) {
    //Call the find function to retrieve all documents
    let foodEntries = await FoodEntryModel.find();
    if (!foodEntries) {
      return res
        .status(404)
        .json({ error: "No food entries found in database" });
    }
    return res.status(200).json(foodEntries);
  }
);
