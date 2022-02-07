const startTimes: {[id: string]: Date} = {};
export function startTimer(id: string): void {
  startTimes[id] = new Date;
}

export function endTimer(id: string): Cypress.Chainable<number> {
  const timer = startTimes[id];
  if (!timer) {
    throw new Error("Requires to run `startTimer` first!");
  }
  // @ts-ignore
  const timeElapsed = new Date() - timer;
  delete timer[id];
  if (Number.isNaN(timeElapsed)) {
    throw new Error(`Failed to record time`);
  }
  const timeInSecs = timeElapsed / 1000;
  return cy.log(`Time elapsed: ${timeInSecs.toPrecision(3)}s`)
    .then(() => timeInSecs);
}

Cypress.Commands.add("startTimer", startTimer);
Cypress.Commands.add("endTimer", endTimer);
