// Function index.js - function to be tested
const func = require("./index");
const { getJSON } = require("../../../helpers/readFile");

const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const FoodsModel = require("../models/food");

test("FoodGet returns 404 if id not found in body", async () => {
  mockingoose(FoodsModel).toReturn(null, "find");

  let req = {
    header: {},
    body: {},
  };
  let res = makeMockRes();
  await func.inject({ FoodsModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);

  expect(body).toEqual({ error: "No ID found" });
});
test("FoodGet returns 404 if food is not found by ID", async () => {
  mockingoose(FoodsModel).toReturn(null, "findById");

  let req = {
    header: {},
    body: { id: "67ee094061abb538057cf23f" },
  };
  let res = makeMockRes();
  await func.inject({ FoodsModel })(req, res);
  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(404);

  expect(body).toEqual({ error: "No Food found with provided ID" });
});
test("FoodGet returns 200 if food is found by ID", async () => {
  const foundfood = {
    _id: "67ee094061abb538057cf23f",
    name: "Bread",
    calories: 15,
    fat: 2,
    sodium: 11,
    potassium: 55,
    carbs: {
      total: 15,
      fiber: 34,
      sugar: 24,
    },
    protein: 11,
  };

  let req = {
    header: {},
    body: { id: "67ee094061abb538057cf23f" },
  };
  let res = makeMockRes();
  mockingoose(FoodsModel).toReturn(foundfood, "findOne");
  await func.inject({ FoodsModel })(req, res);
  const body = res.json.mock.calls[0][0];
  expect(res.status).toHaveBeenCalledWith(200);

  expect(JSON.stringify(body)).toBe(JSON.stringify(foundfood));
});
