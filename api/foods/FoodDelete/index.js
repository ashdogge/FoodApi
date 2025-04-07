const makeInjectable = require("../../../helpers/makeInjectable");
const { Types } = require("mongoose");
module.exports = makeInjectable(
  {
    defaults: {
      FoodsModel: () => require("../models/food"),
    },
  },
  async function ({ FoodsModel }, req, res) {
    if (!req.params.id) {
      return res.status(404).json({ error: "ID field is missing" });
    }

    let status = await FoodsModel.findByIdAndDelete({ _id: req.params.id });
    if (!status) {
      return res.status(409).json({ error: "Error deleting food" });
    }
    return res.status(200).json({ message: "Food deleted successfully." });
  }
);
