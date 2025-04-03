const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      FoodsModel: () => require("../models/food"),
    },
  },
  async function ({ FoodsModel }, req, res) {
    if (!req.body.id) {
      return res.status(404).json({ error: "No ID found" });
    }

    let id = req.body.id;


    let food = await FoodsModel.findOne({ _id: id });


    if (!food) {
      return res.status(404).json({ error: "No Food found with provided ID" });
    }
    return res.status(200).json(food);
  }
);
