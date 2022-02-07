/* eslint-disable import/no-extraneous-dependencies */
import "@4tw/cypress-drag-drop";
import "cypress-real-events/support";
import addContext from "mochawesome/addContext";
import "./storybook/commands";
import "./commands";
import "./apiCommands";
import "./chaiExtension";
import "chai-sorted";
import {addMatchImageSnapshotCommand} from "cypress-image-snapshot/command";

require("cypress-grep")();

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: "percent", // percent of image or number of pixels
  customDiffConfig: {threshold: 0.1}, // threshold for each pixel
  capture: "viewport", // capture viewport in screenshot
});

Cypress.on("test:before:run", () => {
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  const mm = currentDate.getMonth() + 1; // getMonth() is zero-based
  const dd = currentDate.getDate();
  const hh = currentDate.getHours();
  const mins = currentDate.getMinutes();
  const ss = currentDate.getSeconds();

  const timestamp = [
    yyyy,
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
    (hh > 9 ? "" : "0") + hh,
    (mins > 9 ? "" : "0") + mins,
    (ss > 9 ? "" : "0") + ss,
  ].join("");

  Mocha.Test.timestamp = timestamp;
});

Cypress.on("test:after:run", (test) => {
  if (Mocha.Test.requirement) {
    let status = "";
    if (test.state == "passed") {
      status = "PASS";
    } else {
      status = "FAIL";
    }
    addContext(
      {test},
      {
        title: "Traceability",
        value: {
          req: Mocha.Test.requirement,
          title: test.title,
          status: status,
          started: Mocha.Test.timestamp,
        },
      },
    );
    delete Mocha.Test.requirement;
  }
});
