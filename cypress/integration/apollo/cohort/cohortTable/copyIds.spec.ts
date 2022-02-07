import * as TC from "konstants/testing-constants.json";
import {switchActiveEntity} from "./helpers";


describe("Copy ID & Download", () => {
  beforeEach(() => {
    cy.login("qa_tester_ui_1");
    cy.visit("APOLLO_K_PATIENT_TED_5_ENTITIES");
    cy.get(TC.NAVBAR_CONTAINER, {timeout: 60000}).last().contains(TC.COMPONENT_NAVBAR_TAB, "Data Preview", {matchCase: false}).click();
    cy.get(TC.COHORT_TABLE_CELL, {timeout: 120000});
  });

  it("when there is no Primary field, the Copy ID button is disabled", () => {
    // Non-main entity with NO own Primary field but with main-entity primary field
    switchActiveEntity("N_immune");
    cy.get(TC.TABLE_ENTITY_DROPDOWN_COMPONENT).should("have.text", "N_immune");
    cy.get(TC.TED_TABLE_ACTIONS_COPY_ID_BUTTON).should("have.attr", "disabled");

    // Non-main entity with NO own Primary field and NO main-entity primary field
    switchActiveEntity("N_residency");
    cy.get(TC.TABLE_ENTITY_DROPDOWN_COMPONENT).should("have.text", "N_residency");
    cy.get(TC.TED_TABLE_ACTIONS_COPY_ID_BUTTON).should("have.attr", "disabled");
  });

  it("when multiple entities are present and no item is selected the Copy ID button applies to ALL the items from the active entity", () => {
    cy.get(TC.TED_TABLE_ACTIONS_COPY_ID_BUTTON).click();
    cy.get(TC.ALERT_CONTAINER, {timeout: 30000}).should("be.visible").and("have.text", "2219 items copied to clipboard");
    cy.task("getClipboard").then((clipboardData: any) => {
      cy.readFile(`./fixtures/cohort/benchmarkFilesTED/multiEntitiesPresentNoItemSelected.txt`).then(content => {
        expect(`${clipboardData}\n`).to.eq(content);
      });
    });
  });

  it("when multiple entities are present and a few items are selected the Copy ID button applies to these few items", () => {
    cy.get(TC.APOLLO_TABLE_ROW).eq(3).find(TC.COMPONENT_CHECKBOX).click();
    cy.get(TC.APOLLO_TABLE_ROW).eq(6).find(TC.COMPONENT_CHECKBOX).click();
    cy.get(TC.APOLLO_TABLE_ROW).eq(9).find(TC.COMPONENT_CHECKBOX).click();
    cy.get(TC.TED_TABLE_ACTIONS_COPY_ID_BUTTON).click();
    cy.get(TC.ALERT_CONTAINER, {timeout: 30000}).should("be.visible").and("have.text", "3 items copied to clipboard");
    cy.task("getClipboard").then((clipboardData: any) => {
      cy.readFile(`./fixtures/cohort/benchmarkFilesTED/multiEntitiesPresentFewItemsSelected.txt`).then(content => {
        expect(`${clipboardData}\n`).to.eq(content);
      });
    });
  });
});
