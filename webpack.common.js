const path = require("path");


module.exports = () => {
  return {
    entry: {
      pannexin: [path.join(__dirname, "src")],
    },
    resolve: {
      modules: [path.join(__dirname, "src"), "node_modules"],
      alias: {
        domains: path.resolve(__dirname, "src/domains/"),
        konstants: path.resolve(__dirname, "src/konstants"),
        cyFixtures: path.resolve(__dirname, "cypress/fixtures/"),
        cySupport: path.resolve(__dirname, "cypress/support/"),
      },
      symlinks: false,
      extensions: [".ts", ".tsx", ".js"],
    },
  };
};
