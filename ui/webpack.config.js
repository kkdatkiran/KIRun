const path = require("path");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
};
