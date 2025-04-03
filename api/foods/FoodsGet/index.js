const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      FoodsModel: /*istanbul ignore next*/ () => require("../models/food"),
    },
  },
  async function ({ FoodsModel }, req, res) {
    //Call the find function to retrieve all documents
    let foods = await FoodsModel.find();
    if (!foods) {
      return res.status(404).json({ error: "No foods found in database" });
    }
    return res.status(200).json(foods);
  }
);
