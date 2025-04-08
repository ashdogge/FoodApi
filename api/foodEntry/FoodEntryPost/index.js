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
    const { food } = req.body;
    if (!food) return res.status(400).json({ error: "Missing food ID" });

    try {
      const entry = await FoodEntryModel.create({ food });
      res.status(200).json({ message: "Added entry successfully" });
    } catch (err) {
      console.error("Error creating entry:", err);
      res.status(500).json({ error: err.message });
    }
  }
);
