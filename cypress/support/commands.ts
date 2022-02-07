import {PROJECTSCOPE, URLS} from "cySupport/enums";

import * as TC from "konstants/testing-constants.json";

const selectorOrDataTestId = (selector: string) => typeof selector == "string" && selector.startsWith("UIT_") ? `[data-test-id='${selector}']` : selector;

Cypress.Commands.add("dragTo", {prevSubject: "element"}, (subject: boolean | Cypress.PrevSubject | Cypress.PrevSubject[], targetElement: string) => {
  cy.wrap(subject).trigger("dragstart");
  cy.get(targetElement).trigger("drop");
});

Cypress.Commands.add("containsAttached", (selector, text, opts?) => {
  const retries = opts?.retries || 10;
  const delay = opts?.delay || 100;
  const isAttached = (resolve, count = 0) => {
    const el = Cypress.$(`${selectorOrDataTestId(selector)}:contains('${text}')`);

    // is element attached to the DOM?
    count = Cypress.dom.isAttached(el) ? count + 1 : 0;

    // hit our base case, return the element
    if (count >= retries) {
      return resolve(el);
    }
    setTimeout(() => isAttached(resolve, count), delay); // retry after delay
  };

  // first wait for the element with timeout if any given
  cy.get(selectorOrDataTestId(selector), {timeout: opts?.timeout || Cypress.config("defaultCommandTimeout")});

  return cy.wrap(null).then(() => {
    return new Cypress.Promise((resolve) => {
      return isAttached(resolve, 0);
    }).then((el) => {
      return cy.wrap(el);
    });
  });
});

Cypress.Commands.overwrite("get", (originalFn, selector, options) => {
  return originalFn(selectorOrDataTestId(selector), options);
});

Cypress.Commands.overwrite("contains", (originalFn, subject, filter, text, options = {}) => {
  return originalFn(subject, selectorOrDataTestId(filter), text, options);
});

Cypress.Commands.overwrite("find", (originalFn, subject, selector, options) => {
  return originalFn(subject, selectorOrDataTestId(selector), options);
});

Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  if (url in URLS) {
    return originalFn(URLS[url], options);
  }
  return originalFn(url, options);
});

Cypress.Commands.add("searchByNameInDM", (name): void => {
  cy.get(TC.FILTER_BAR_NAME_FILTER, {timeout: 60000}).last().click();
  cy.get(TC.FILTER_BAR_NAME_FILTER).last().find("input").clear().type(name).blur();
  cy.get(TC.FILTER_BAR_NAME_FILTER).last().contains("button", "Apply").click();
});

Cypress.Commands.add("searchByIdInDM", (id: string): void => {
  cy.get(TC.FILTER_BAR_ID_FILTER).last().click();
  cy.get(TC.FILTER_BAR_ID_FILTER).last().find("input").clear().type(id).blur();
  cy.get(TC.FILTER_BAR_ID_FILTER).last().contains("button", "Apply").click();
});

Cypress.Commands.add("switchProjectScopeInDM", (projectScope: PROJECTSCOPE): void => {
  cy.get(TC.FILTER_BAR_PROJECT_SCOPE_FILTER).last().click();
  cy.get(TC.FILTER_BAR_PROJECT_SCOPE_FILTER).last()
    .contains(TC.MENU_ITEM_COMPONENT, projectScope).click();
});

Cypress.Commands.add("addDashboardTile", (chartType: string, dataFieldName: string, secondDataFieldName?: string): void => {
  cy.get(TC.COHORT_ADD_TILE_BUTTON, {timeout: 120000}).click();
  cy.get(TC.CHART_BUILDER_HIERARCHY_CONTAINER, {timeout: 120000}).contains("Updating").should("not.exist");
  cy.get(TC.CHART_BUILDER_SEARCH_INPUT).type(dataFieldName);
  cy.get(TC.MODAL_CONTAINER, {timeout: 120000}).find(TC.LOADING_SPINNER).should("not.exist");
  cy.get(TC.CHART_BUILDER_HIERARCHY_CONTAINER, {timeout: 120000})
    .contains(dataFieldName)
    .should("be.visible");
  cy.get(TC.CHART_BUILDER_ITEM).contains(dataFieldName).should("be.visible").click({force: true});
  if (secondDataFieldName) {
    cy.get(TC.CHART_BUILDER_SEARCH_INPUT).clear().type(secondDataFieldName);
    cy.get(TC.CHART_BUILDER_HIERARCHY_CONTAINER, {timeout: 120000})
      .contains(secondDataFieldName)
      .should("be.visible");
    cy.get(TC.CHART_BUILDER_ITEM_PLUS_BUTTON).first().should("be.visible").click();
  }
  cy.get(TC.CHART_BUILDER_CHART_TYPE_SELECTOR).contains(TC.CHART_BUILDER_CHART_TYPE_SELECTOR, chartType).click();
  cy.get(TC.CHART_BUILDER_ADD_TILE_OR_FILTER_BUTTON).click();
  cy.get(TC.MODAL_CLOSE_BUTTON).click();
});

Cypress.Commands.add("trace", (...args) => {
  // @ts-ignore
  Mocha.Test.requirement = args;
});

Cypress.Commands.add("handleNewTab", () => {
  cy.window().then((win) => {
    cy.stub(win, "open").callsFake(url => {
      // visit URL that would have opened in a new tab
      win.location.href = Cypress.config().baseUrl + url;
      // @ts-ignore
    }).as("newTab");
  });
});
