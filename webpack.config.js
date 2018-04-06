const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/src/index.js",
  devtool: "inline-source-map",
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  output: {
    filename: "index-built.js",
    path: path.resolve(__dirname, "js/dist")
  }
};
