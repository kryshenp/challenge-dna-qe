import * as TC from "konstants/testing-constants.json";

/**
 *
 * @param entities the object of string arrays with entities
 * @param entityName name of the entity
 *
 * Adds the column for entity specified above in the Object entities (if imported) as a member with index 1
 * or also could be the custom Object
 **/

export const addColumn = (entities: { [key: string]: string[] }, entityName: string): void => {
  cy.get(TC.CHART_BUILDER_SEARCH_INPUT).clear().type(entities[entityName][1]);
  cy.get(TC.MODAL_CONTAINER, {timeout: 120000}).find(TC.LOADING_SPINNER).should("not.exist");
  cy.get(TC.CHART_BUILDER_HIERARCHY_CONTAINER).contains(entities[entityName][1]).should("be.visible");
  cy.get(TC.CHART_BUILDER_ITEM).contains(entities[entityName][1]).click({force: true});
  cy.get(TC.CHART_BUILDER_ADD_TILE_OR_FILTER_BUTTON).click();
};

/**
 *
 * @param entityName name of the entity
 *
 * Swithces the active entity
 **/

export const switchActiveEntity = (entityName: string): void => {
  cy.get(TC.TABLE_ENTITY_DROPDOWN_COMPONENT).click();
  cy.contains(TC.ENTITY_DROPDOWN_TOOLTIP_COMPONENT, entityName).click();
  cy.get(TC.LOADING_SPINNER, {timeout: 60000}).should("not.exist");
  cy.get(TC.TABLE_ENTITY_DROPDOWN_COMPONENT).should("have.text", entityName);
};

// The object of string arrays with entities we use for TED table testing
export const entities: { [key: string]: string[] } = {
  "N_patients": [
    "Main entity",
    "Patient Name",
    "Patient ID",
    "Patient State",
  ],
  "N_survival_status": [
    "1:1 to N_patients",
    "Survival ID",
    "Survival  Patient ID",
  ],
  "N_residency": [
    "N:1 to N_patients",
    "Cancer Incidence Rate",
    "Cancer Death Rate",
  ],
  "N_immune": [
    "1:N to N_patients",
    "Vaccine Location",
    "Vaccine Dose",
  ],
  "N_physician": [
    "N:N to N_patients",
    "Physician On Record",
    "Physician Specialty",
  ],
};

// The object of string arrays with entities columns content that we use for TED table testing
export const entitesTables = {
  nPatientsTable: [
    ["A. J. Killinsworth", "1001", "CA"],
    ["Aaron Day", "1002", "MA"],
    ["Aaron DeLozier", "1003", "IL"],
    ["Aaron Dixon", "1004", "IA"],
    ["Abhay Patel", "1005", "ME"],
    ["Abraham Hirschfeld", "1006", "ME"],
    ["Abraham J. Gutmann", "1007", "ME"],
    ["Adelle R. Nathanson", "1008", "MA"],
    ["Agnes Marie Regier", "1009", "MA"],
    ["Al Franken", "1010", "CA"],
  ],
  nResidencyTable: [
    ["453.8", "159.7"],
    ["474.6", "174.8"],
    ["399.6", "146.6"],
    ["453.4", "168.1"],
    ["396", "127.9"],
    ["471.9", "168.2"],
    ["410", "154.9"],
    ["460.4", "171.7"],
    ["488.1", "167.1"],
  ],
  nPhysicianTable: [
    ["David Ondrula", "General Surgery"],
    ["Peter Ihm", "Otolaryngology"],
    ["Brittain Kulow", "Dermatology"],
    ["Jeffrey Hamilton", "Physician Assistant"],
    ["Nina Jones", "Diagnostic Radiology"],
    ["Jeffery Bowman", "Family Medicine"],
    ["Blake Simmons", "Optometry"],
    ["John Long", "Physical Medicine And Rehabilitation"],
    ["Sarah Hicks", "Physician Assistant"],
    ["Andrew Cottingham", "Interventional Pain Management"],
  ],
  nImmuneTable: [
    ["A. J. Killinsworth", "Null", "Null"],
    ["Aaron Day", "Null", "Null"],
    ["Aaron DeLozier", "Null", "Null"],
    ["Aaron Dixon", "Null", "Null"],
    ["Abhay Patel", "Null", "Null"],
    ["Abraham Hirschfeld", "Null", "Null"],
    ["Abraham J. Gutmann", "Null", "Null"],
    ["Adelle R. Nathanson", "Null", "Null"],
    ["Agnes Marie Regier", "Null", "Null"],
    ["Al Franken", "Null", "Null"],
  ],
  nSurvivalStatusTable: [
    ["A. J. Killinsworth", "1", "A_J_Killinsworth"],
    ["Aaron Day", "2", "Aaron_Day"],
    ["Aaron DeLozier", "3", "Aaron_DeLozier"],
    ["Aaron Dixon", "4", "Aaron_Dixon"],
    ["Abhay Patel", "5", "Abhay_Patel"],
    ["Abraham Hirschfeld", "6", "Abraham_Hirschfeld"],
    ["Abraham J. Gutmann", "7", "Abraham_J_Gutmann"],
    ["Adelle R. Nathanson", "8", "Adelle_R_Nathanson"],
    ["Agnes Marie Regier", "9", "Agnes_Marie_Regier"],
    ["Al Franken", "10", "Al_Franken"],
  ],
  nPhysicianTableInitial: [
    "Nina Jones",
    "Richard Reed",
    "Peter Mamalakis",
    "Timothy Ebbert",
    "Brittain Kulow",
    "Thomas Bump",
    "Kelly Crawford",
    "Sarah Hicks",
    "Andrew Cottingham",
    "Jeffery Bowman",
  ],
  nImmuneTableInitial: [
    "leg",
    "arm",
  ],
  nResidencyTableInitial: [
    ["A. J. Killinsworth", "399.6"],
    ["Aaron Day", "453.8"],
    ["Aaron DeLozier", "460.4"],
    ["Aaron Dixon", "471.9"],
    ["Abhay Patel", "474.6"],
    ["Abraham Hirschfeld", "474.6"],
    ["Abraham J. Gutmann", "474.6"],
    ["Adelle R. Nathanson", "453.8"],
    ["Agnes Marie Regier", "453.8"],
    ["Al Franken", "399.6"],
  ],
  nBaselineTestTable: [
    ["1", "2", "Low"],
    ["2", "3", "Low"],
    ["3", "5", "Null"],
    ["4", "8", "Medium"],
    ["5", "9", "Null"],
  ],
  nVisitsTable: [
    ["1", "1", "2019-02-12"],
    ["2", "1", "2019-02-25"],
    ["3", "2", "2019-02-10"],
    ["4", "2", "2019-03-08"],
    ["5", "3", "2018-11-27"],
    ["6", "3", "2019-01-03"],
    ["7", "7", "2019-02-05"],
    ["8", "7", "2019-06-17"],
    ["9", "10", "2019-11-27"],
    ["10", "5", "2019-03-08"],
  ],
};
