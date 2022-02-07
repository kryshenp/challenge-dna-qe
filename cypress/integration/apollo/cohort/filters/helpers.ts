import _ from "lodash";
import * as TC from "konstants/testing-constants.json";
import {FILTEROPERATOR, ZYGOSITY} from "cySupport/enums";

/**
 *
 * @param filterName Name of the field in the chart builder
 * @param filterValue value applied in the filter modal
 * @param options.toEntity add filter to a specific group. can be he name of entity, or any text from the filter pills
 * @param options.operator the logic applied in the filter modal
 * @returns when options.addAsTile = true
 *
 * Adds a filter or tile via the Ad Filter button in the cohort panel, or the plus icon by the filter pill (options.toEntity)
 */
export const addFilter = (
  filterName: string,
  filterValue: string | [string, string] | number,
  options?: {
      addAsTile?: boolean,
      toEntity?: string,
      operator?: FILTEROPERATOR,
    }): void => {
  if (options?.toEntity) {
    cy.contains(TC.COHORT_PANEL_FILTER_GROUP, options.toEntity)
      .find(TC.COHORT_PANEL_FILTER_PLUS_BUTTON, {timeout: 120000}).first().click();
  } else {
    cy.get(TC.COHORT_PANEL_ADD_FILTER_BUTTON, {timeout: 120000}).click();
  }
  /**
   * in order to avoid clicking on elements with similar names this regex marks the start and end of the input string
   * mind that because of this the input string must be the whole text and not just a partial text
   */
  cy.get(TC.CHART_BUILDER_SEARCH_INPUT).type(`/^${_.escapeRegExp(filterName)}$/`);
  cy.get(TC.CHART_BUILDER_ITEM).should("be.visible").and("contain", filterName);
  cy.wait(500); // needs to wait for the chart items to render before any action, otherwise it is flaky and fails sometimes
  cy.containsAttached(TC.CHART_BUILDER_ITEM, filterName).last().click();
  if (options?.addAsTile) {
    cy.contains(TC.DROPDOWN_BUTTON, "Other actions", {matchCase: false}).click();
    cy.contains(TC.MENU_ITEM_COMPONENT, "Add as tile", {matchCase: false}).click();
    cy.get(TC.MODAL_CLOSE_BUTTON).click();
    return;
  }
  cy.get(TC.MODAL_CONTAINER).find(TC.LOADING_SPINNER, {timeout: 120000}).should("not.exist");
  cy.containsAttached(TC.CHART_BUILDER_ADD_TILE_OR_FILTER_BUTTON, "Add as Filter").click({force: true});
  if (options?.operator) {
    cy.get(TC.MODAL_CONTAINER).find(TC.COMPONENT_MULTILEVEL_DROPDOWN).first().click();
    cy.contains(TC.COMPONENT_MULTILEVEL_DROPDOWN_ITEM, options.operator).click();
  }
  if (filterValue) {
    if (typeof filterValue == "string") {
      cy.get(TC.MODAL_CONTAINER).find(TC.MODAL_PHENO_FILTER_SELECT_INPUT_WRAPPER).type(`${filterValue}{enter}`);
    } else if (typeof filterValue == "number") {
      cy.get(TC.MODAL_CONTAINER).find(TC.COMPONENT_DOTTED_INPUT).first().type(filterValue.toString());
    } else {
      cy.get(TC.MODAL_CONTAINER).find(TC.COMPONENT_DOTTED_INPUT).first().type(filterValue[0]);
      cy.get(TC.MODAL_CONTAINER).find(TC.COMPONENT_DOTTED_INPUT).last().type(filterValue[1]);
    }
  }
  cy.get(TC.MODAL_CONFIRM_BUTTON).click();
  cy.get(TC.COHORT_PANEL_FILTER_PILL_CONTAINER).should("contain", typeof filterValue == "object" ? filterValue[0] : filterValue).should("be.visible");
};

/**
 *
 * @param filterType one of "Gene" | "Variant"
 * @param filterValue value entered into the modal text area eg. OMG,BRCA1
 * @param options.zygosity one of enum ZYGOSITY ie. ANY | HOMOZYGOUS | HETEROZYGOUS
 *
 * @example
 *
 * addGeneFilter("Gene", "OMG", {zygosity: ZYGOSITY.HETEROZYGOUS});
 *
 * addGeneFilter("Variant", "chr1_55039812_G_A,rs28362202", {zygosity: ZYGOSITY.HETEROZYGOUS});
 */
export const addGeneFilter = (
  filterType: "Gene" | "Variant",
  filterValue: string,
  options?: {
      zygosity?: ZYGOSITY
    }): void => {
  cy.get(TC.COHORT_PANEL_ADD_FILTER_BUTTON, {timeout: 120000}).click();
  cy.get(TC.MODAL_CONTAINER).contains(TC.COMPONENT_NAVBAR_TAB, "Geno", {matchCase: false, timeout: 120000}).click();
  cy.contains(TC.CHART_BUILDER_ITEM, filterType, {matchCase: false}).click();

  if (options?.zygosity) {
    cy.contains("button", options.zygosity, {matchCase: false}).click();
  }

  cy.get(TC.MODAL_TEXT_AREA).clear().type(filterValue);
  cy.get(TC.MODAL_CONFIRM_BUTTON).click();
};
