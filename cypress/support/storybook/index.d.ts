import {startTimer, endTimer} from "./commands";

declare namespace Cypress {
  interface Chainable {
    startTimer(): typeof startTimer;

    endTimer(): typeof endTimer;
}
