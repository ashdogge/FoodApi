const express = require("express");
require("dotenv").config();
const YAML = require("js-yaml");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO).catch((error) => console.log);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const findRoutes = require("./helpers/findRoutes");
const mountRoute = require("./helpers/mountRoute");

const { routes } = YAML.load(fs.readFileSync("./api/routes.yaml"));

routes.forEach((route) => {
  const routeDir = path.join(__dirname, "api", route.path);
  findRoutes(routeDir).forEach((fn) => {
    mountRoute(app, route.prefix, fn);
  });
});
app.get("/", (req, res) => {
  return res.status(200).json({ message: "FoodApi 1.0 online!" });
});

app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});
