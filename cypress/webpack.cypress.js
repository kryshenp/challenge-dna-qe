const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      konstants: path.resolve(__dirname, "../src/konstants"),
      cyFixtures: path.resolve(__dirname, "./fixtures"),
      cySupport: path.resolve(__dirname, "./support"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/typescript",
              ],
            },
          },
        ],
      },
    ],
  },
};
