const fs = require("fs");
const path = require("path");

module.exports = {
  getJSON: (filePath) => {
    //Build path to json file    V gets full path to file
    //                                       V appends file path to JSON file
    const fullPath = path.join(__dirname, filePath);
    //Passes path to read json file
    const json = fs.readFileSync(fullPath);

    return JSON.parse(json);
  },
};
