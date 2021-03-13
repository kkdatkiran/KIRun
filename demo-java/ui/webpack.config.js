const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const path = require("path");
const APP_DIR = path.resolve(__dirname, "./src");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ["json"],
    }),
  ],
};
