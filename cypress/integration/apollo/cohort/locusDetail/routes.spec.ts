import * as TC from "konstants/testing-constants.json";


describe("Routes", () => {
  const allele = "55039791";

  const searchInTable = (tableName: "cohort" | "allele", columnName: string, searchValue: string): void => {
    const locator = (): string => {
      if (tableName == "cohort") {
        return TC.APOLLO_SAMPLES_TABLE;
      } else if (tableName == "allele") {
        return TC.APOLLO_ALLELE_TABLE;
      } else {
        throw new Error("Invalid 'table' parameter provided. Please use 'cohort' or 'allele'.");
      }
    };

    cy.get(TC.COHORT_TABLE_CELL, {timeout: 120000}); // wait for table to load
    cy.get(locator()).find(TC.APOLLO_TABLE_HEADER_CELL).contains(columnName, {matchCase: false}).click();
    cy.get(locator()).find(TC.APOLLO_TABLE_HEADER_CELL).contains(TC.APOLLO_TABLE_HEADER_CELL, columnName, {matchCase: false})
      .find(TC.TABLE_HEADER_DROPDOWN_SEARCH_COLUMN).click();
    cy.get(locator()).find(TC.APOLLO_TABLE_HEADER_CELL).contains(TC.APOLLO_TABLE_HEADER_CELL, columnName, {matchCase: false})
      .find(TC.COMPONENT_DOTTED_INPUT).type(`1:${searchValue}`);
    cy.get(locator()).click();
  };

  beforeEach(() => {
    cy.login("qa_tester_ui_1");
  });

  ["APOLLO_UKB_100K_1_1", "APOLLO_UKB_100K_2_9", "APOLLO_UKB_100K_3_0"].forEach(dataset => {
    it(`V3 should open when visiting from ${dataset} dataset`, {tags: ["@trace"]}, () => {
      const variantBrowserTabText = dataset == "APOLLO_UKB_100K_1_1" ? "Variant Browser" : "Genomics";

      cy.trace("DNA_GUI_LOCUS_DETAIL_LOAD");

      cy.visit(dataset);
      cy.get(TC.NAVBAR_CONTAINER, {timeout: 120000}).last().contains(TC.COMPONENT_NAVBAR_TAB, variantBrowserTabText, {matchCase: false}).click();
      searchInTable("allele", "location", allele);
      cy.contains(TC.COHORT_TABLE_CELL, allele, {timeout: 120000})
        .should("be.visible")
        .find("a")
        .invoke("removeAttr", "target")
        .click();
      cy.get(TC.APOLLO_TABLE_CELL, {timeout: 60000}).should("contain", `_${allele}_`);
      cy.url().should("contain.multiple", ["3.0", allele]);
    });
  });
});
