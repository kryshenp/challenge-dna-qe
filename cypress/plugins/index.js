/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const clipboardy = require("clipboardy");
const path = require("path");
const webpack = require("@cypress/webpack-preprocessor");
const {addMatchImageSnapshotPlugin} = require("cypress-image-snapshot/plugin");
const {existsSync, lstatSync, readdirSync, readFileSync} = require("fs");

module.exports = (on, config) => {
  require("cypress-grep/src/plugin")(config);

  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: require("../webpack.cypress"),
    watchOptions: {},
  };
  addMatchImageSnapshotPlugin(on, config);

  on("file:preprocessor", webpack(options));

  if (config.env.baseUrl) {
    config.baseUrl = config.env.url[config.env.baseUrl];
  }

  on("task", {
    getClipboard() {
      return clipboardy.readSync();
    },
    getLastDownloadedFilePath() {
      const cypressDownladsPath = "downloads";

      // cypress/downloads folder only appears after a file has been downloaded; need to check if it exists
      if (!existsSync(cypressDownladsPath)) {
        return null;
      }

      /**
       * create an array of objects sorted by creationDate in format like eg.:
       * [
       *  {
       *    fileName: 'downloads/DNAnexus_export_urls-20211012-110606.txt',
       *    creationDate: 2021-10-12T09:06:06.586Z
       *  },
       *  {
       *    fileName: 'downloads/test_file_to_copy_download',
       *    creationDate: 2021-09-15T14:17:12.095Z
       *  }
       * ]
       */
      const filesOrdered = readdirSync(cypressDownladsPath).map(file => {
        const filePath = path.join(cypressDownladsPath, file);

        return {filePath, creationDate: lstatSync(filePath).mtime};
      }).sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());

      if (!filesOrdered.length) {
        return null;
      }

      return filesOrdered[0].filePath;
    },
    readFileMaybe(filename) {
      if (existsSync(filename)) {
        return readFileSync(filename, "utf8");
      }

      return null;
    },
  });

  return config;
};
