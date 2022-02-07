import * as TC from "konstants/testing-constants.json";
import {FILTEROPERATOR, ZYGOSITY} from "cySupport/enums";
import {chartTypesEndpointsList} from "cyFixtures/TileDefinitions";
import {addFilter, addGeneFilter} from "./helpers";


beforeEach(() => {
  cy.login("qa_tester_ui_1");
  cy.failOnInvalidResponse(chartTypesEndpointsList);
});

describe("Can save and load a cohort with", () => {
  const saveAndLoadSnapshot = (snapshotName: string): void => {
    cy.get(TC.COHORT_PANEL_SAVE_COHORT_BUTTON).click();
    cy.get(TC.MODAL_NAME_INPUT).clear().type(snapshotName);
  cy.get(TC.MODAL_DESTINATION_BUTTON).click();
    cy.get(TC.UDS_DATA_NAME_CELL, {timeout: 120000});
  cy.containsAttached(TC.FOLDER_TREE_ITEM, "Cohort snapshots").click();
    cy.contains(TC.MODAL_CONFIRM_BUTTON, "Load Selected", {matchCase: false}).click();
     cy.contains(TC.MODAL_CONFIRM_BUTTON, "Save").click();
    cy.get(TC.ALERT_CONTAINER, {timeout: 30000}).should("have.text", "Cohort Saved Successfully to Automation testing project/Cohort snapshots");
  cy.visit("DM_COHORT_SNAPSHOTS");
    cy.searchByNameInDM(snapshotName);
    cy.handleNewTab();
    cy.contains(TC.TABLE_NAME_CELL, snapshotName).click();
    cy.url().then(url => cy.visit(url));
    cy.get(TC.COHORT_PANEL_COHORT_COUNT, {timeout: 120000}); // Wait for data to load
  };


  it("ANDOR filters", () => {
    cy.visit("APOLLO_ALL_DATA_TYPES");
    addFilter("Age", "", {addAsTile: true});
    addFilter("Test", "", {operator: FILTEROPERATOR.NOT_NULL});
    addFilter("Visit Instance", "2", {toEntity: "Tests Performed", operator: FILTEROPERATOR.EQUALS});
    addFilter("Doctor", "Dr. Jones", {toEntity: "Visits"});
    addFilter("Cost (float)", "", {toEntity: "Visits", operator: FILTEROPERATOR.NOT_NULL});
    addFilter("Visit Instance", "2", {toEntity: "Tests Performed", operator: FILTEROPERATOR.EQUALS});
    addFilter("Doctor", "Dr. Smith", {toEntity: "AND With"});
    addFilter("Cost (float)", "", {toEntity: "AND With", operator: FILTEROPERATOR.NOT_NULL});
    cy.contains(TC.COHORT_PANEL_FILTER_GROUP, "Dr. Jones").find(TC.FILTER_JOIN_TOGGLE_CONTAINER).first().click();
    cy.get(TC.COHORT_PANEL_COHORT_COUNT)

    saveAndLoadSnapshot(`cy-ANDOR-SNAPSHOT-${Date.now()}`);
    cy.get().should("contain.multiple", ["Test", "Visit Instance", "2", "Doctor", "Dr. Jones", "Cost (float)", "Dr. Smith"]);
    cy.contains(TC.COHORT_PANEL_FILTER_GROUP, "Dr. Jones", {matchCase: false})
      .find(TC.).should("contain", "OR").and("have.length", 2);
    cy.contains(TC.COHORT_PANEL_FILTER_GROUP, "Dr. Smith", {matchCase: false})
      .find(TC.).should("contain", "AND").and("have.length", 2);
    cy.get(TC.COHORT_PANEL_COHORT_COUNT, {timeout: 120000}).should("have.text", "1");
    cy.get().should("contain.multiple", ["Age", "1", "the patient"]);
  });

  it("Gene filters", () => {
    cy.visit("APOLLO_UKB_50K_3_0");
    addGeneFilter("Gene", "ATM, CHEK2, IRF8, CCR3, IL10", {zygosity: ZYGOSITY.HOMOZYGOUS});
    saveAndLoadSnapshot(`cy-GENE-FILTER-${Date.now()}`);
    cy.get(TC.COHORT_PANEL_COHORT_COUNT, {timeout: 120000}).should("have.text", "47,406");
    cy.get(TC.COHORT_PANEL_FILTER_GROUP).should("contain.multiple", [ZYGOSITY.HOMOZYGOUS, "ATM", "CHEK2", "IRF8", "CCR3", "IL10"]);
  });

  it("Variant ID filters", () => {
    cy.visit("APOLLO_UKB_50K_3_0");
    addGeneFilter("Variant", "chr1_55039812_G_A,rs28362202", {zygosity: ZYGOSITY.HETEROZYGOUS});
    saveAndLoadSnapshot(`cy-VARIANT-FILTER-${Date.now()}`);
    cy.get(TC.COHORT_PANEL_COHORT_COUNT, {timeout: 120000}).should("have.text", "205");
    cy.get(TC.COHORT_PANEL_FILTER_GROUP).should("contain.multiple", [ZYGOSITY.HETEROZYGOUS, "chr1_55039812_G_A", "rs28362202"]);
  });

  it("Date filter; Filter values should be preserved in the modal", () => {
    cy.visit("APOLLO_ALL_DATA_TYPES");
    cy.get(TC.COHORT_PANEL_ADD_FILTER_BUTTON, {timeout: 120000}).click();
    cy.get(TC.CHART_BUILDER_SEARCH_INPUT).type("Sign Up Date (Sparse)");
    cy.contains(TC.CHART_BUILDER_ITEM, "Sign Up Date (Sparse)").click();
    cy.get(TC.CHART_BUILDER_ADD_TILE_OR_FILTER_BUTTON).click();
    cy.get(TC.COMPONENT_DOTTED_INPUT).first().type("2021-01-01");
    cy.get(TC.COMPONENT_DOTTED_INPUT).last().type("2020-02-01");
    cy.get(TC.MODAL_CONFIRM_BUTTON).click();

  });
});
