// Function index.js - function to be tested
const func = require("./index");
const { getJSON } = require("../../../helpers/readFile");

const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const FoodsModel = require("../models/food");

test("FoodsModel returns 404 if no foods are found", async () => {
  mockingoose(FoodsModel).toReturn(null, "find");

  let req = {
    header: {},
  };
  let res = makeMockRes();
  await func.inject({ FoodsModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);

  expect(body).toEqual({ error: "No foods found in database" });
});
test("FoodsModel returns array of foods with status code 200", async () => {
  const foodsDocument = getJSON("../api/foods/_test/foods.json");

  mockingoose(FoodsModel).toReturn(foodsDocument, "find");

  let req = {
    header: {},
  };
  let res = makeMockRes();
  // Inject any elements (database, mongodb, blobstorage)
  await func.inject({ FoodsModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(200);

  const foodsResponse = getJSON("../api/foods/_test/foodsRes.json");

  expect(JSON.stringify(body)).toBe(JSON.stringify(foodsResponse));
});
