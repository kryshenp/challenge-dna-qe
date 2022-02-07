export const oneDimensional = [
  {
    traceTag: "DNA_GUI_ROW_CHART",
    chartType: "Row Chart",
    dataFieldName: "Work hours - lumped category",
    dataType: "categorical_single_integer",
  }, {
    traceTag: "DNA_GUI_ROW_CHART",
    chartType: "Row Chart",
    dataFieldName: "Potassium in urine result flag",
    dataType: "categorical_single_string",
  }, {
    traceTag: "DNA_GUI_ROW_CHART",
    chartType: "Row Chart",
    dataFieldName: "Qualifications",
    dataType: "categorical_multiple_integer",
  }, {
    traceTag: "DNA_GUI_ROW_CHART",
    chartType: "Row Chart",
    dataFieldName: "Delivery methods",
    dataType: "categorical_multiple_string",
  }, {
    traceTag: "DNA_GUI_HISTOGRAM",
    chartType: "Histogram",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    dataType: "integer",
  }, {
    traceTag: "DNA_GUI_HISTOGRAM",
    chartType: "Histogram",
    dataFieldName: "Coffee intake",
    dataType: "integer_sparse",
  }, {
    traceTag: "DNA_GUI_HISTOGRAM",
    chartType: "Histogram",
    dataFieldName: "Seated height",
    dataType: "float",
  }, {
    traceTag: "DNA_GUI_HISTOGRAM",
    chartType: "Histogram",
    dataFieldName: "Interpolated Year when cancer first diagnosed",
    dataType: "float_sparse",
  }, {
    traceTag: "DNA_GUI_HISTOGRAM",
    chartType: "Histogram",
    dataFieldName: "Date of attending assessment centre",
    dataType: "date",
  }, {
    traceTag: "DNA_GUI_HISTOGRAM",
    chartType: "Histogram",
    dataFieldName: "Time of blow measurement",
    dataType: "time",
  }, {
    traceTag: "DNA_GUI_BOX_PLOT",
    chartType: "Box Plot",
    dataFieldName: "Year immigrated to UK (United Kingdom)",
    dataType: "integer_box",
  }, {
    traceTag: "DNA_GUI_BOX_PLOT",
    chartType: "Box Plot",
    dataFieldName: "Water intake",
    dataType: "integer_sparse_box",
  }, {
    traceTag: "DNA_GUI_BOX_PLOT",
    chartType: "Box Plot",
    dataFieldName: "Calibration - maximum x stationary value",
    dataType: "float_box",
  }, {
    traceTag: "DNA_GUI_BOX_PLOT",
    chartType: "Box Plot",
    dataFieldName: "Interpolated Year when operation took place",
    dataType: "float_sparse_box",
  }, {
    traceTag: "DNA_GUI_LIST_VIEW",
    chartType: "List View",
    dataFieldName: "Job code",
    dataType: "hierarchical_single_integer",
  }, {
    traceTag: "DNA_GUI_LIST_VIEW",
    chartType: "List View",
    dataFieldName: "Type of cancer: ICD10",
    dataType: "hierarchical_single_string",
  }, {
    traceTag: "DNA_GUI_LIST_VIEW",
    chartType: "List View",
    dataFieldName: "Cancer code, self-reported",
    dataType: "hierarchical_multiple_integer",
  }, {
    traceTag: "DNA_GUI_LIST_VIEW",
    chartType: "List View",
    dataFieldName: "Operative procedures - main OPCS",
    dataType: "hierarchical_multiple_string",
  }, {
    traceTag: "DNA_GUI_LIST_VIEW",
    chartType: "List View",
    dataFieldName: "Treatment speciality of consultant (recoded)",
    dataType: "categorical_multiple_integer_list",
  }, {
    traceTag: "DNA_GUI_LIST_VIEW",
    chartType: "List View",
    dataFieldName: "PCT responsible for patient data",
    dataType: "categorical_multiple_string_list",
  },
];

export const twoDimensional = [
  {
    traceTag: "DNA_GUI_STACKED_ROW_CHART",
    chartType: "Stacked Row Chart",
    dataFieldName: "Work hours - lumped category",
    secondDataFieldName: "Email access",
    dataType: "categorical_single_integer × categorical_single_integer",
  }, {
    traceTag: "DNA_GUI_STACKED_ROW_CHART",
    chartType: "Stacked Row Chart",
    dataFieldName: "Potassium in urine result flag",
    secondDataFieldName: "Email access",
    dataType: "categorical_single_string × categorical_single_integer",
  }, {
    traceTag: "DNA_GUI_STACKED_ROW_CHART",
    chartType: "Stacked Row Chart",
    dataFieldName: "Work hours - lumped category",
    secondDataFieldName: "Microalbumin in urine device ID",
    dataType: "categorical_single_integer × categorical_single_string",
  }, {
    traceTag: "DNA_GUI_STACKED_ROW_CHART",
    chartType: "Stacked Row Chart",
    dataFieldName: "Potassium in urine result flag",
    secondDataFieldName: "Microalbumin in urine device ID",
    dataType: "categorical_single_string × categorical_single_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    secondDataFieldName: "Email access",
    dataType: "integer × categorical_single_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Coffee intake",
    secondDataFieldName: "Email access",
    dataType: "integer_sparse × categorical_single_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    secondDataFieldName: "Microalbumin in urine device ID",
    dataType: "integer × categorical_single_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Coffee intake",
    secondDataFieldName: "Microalbumin in urine device ID",
    dataType: "integer_sparse × categorical_single_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    secondDataFieldName: "Delivery onset methods",
    dataType: "integer × categorical_multiple_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Coffee intake",
    secondDataFieldName: "Delivery onset methods",
    dataType: "integer_sparse × categorical_multiple_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    secondDataFieldName: "Delivery methods",
    dataType: "integer × categorical_multiple_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Coffee intake",
    secondDataFieldName: "Delivery methods",
    dataType: "integer_sparse × categorical_multiple_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Seated height",
    secondDataFieldName: "Email access",
    dataType: "float × categorical_single_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Interpolated Year when cancer first diagnosed",
    secondDataFieldName: "Email access",
    dataType: "float_sparse × categorical_single_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Seated height",
    secondDataFieldName: "Microalbumin in urine device ID",
    dataType: "float × categorical_single_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Interpolated Year when cancer first diagnosed",
    secondDataFieldName: "Microalbumin in urine device ID",
    dataType: "float_sparse × categorical_single_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Seated height",
    secondDataFieldName: "Delivery onset methods",
    dataType: "float × categorical_multiple_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Interpolated Year when cancer first diagnosed",
    secondDataFieldName: "Delivery onset methods",
    dataType: "float_sparse × categorical_multiple_integer",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Seated height",
    secondDataFieldName: "Delivery methods",
    dataType: "float × categorical_multiple_string",
  }, {
    traceTag: "DNA_GUI_GROUPED_BOX_PLOT",
    chartType: "Grouped Box Plot",
    dataFieldName: "Interpolated Year when cancer first diagnosed",
    secondDataFieldName: "Delivery methods",
    dataType: "float_sparse × categorical_multiple_string",
  }, {
    traceTag: "DNA_GUI_SURVIVAL_PLOT",
    chartType: "Survival Plot",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    secondDataFieldName: "Test array presented",
    dataType: "integer × categorical_single_integer_list",
  }, {
    traceTag: "DNA_GUI_SURVIVAL_PLOT",
    chartType: "Survival Plot",
    dataFieldName: "Coffee intake",
    secondDataFieldName: "Test array presented",
    dataType: "integer_sparse × categorical_single_integer_list",
  }, {
    traceTag: "DNA_GUI_SURVIVAL_PLOT",
    chartType: "Survival Plot",
    dataFieldName: "Seated height",
    secondDataFieldName: "Test array presented",
    dataType: "float × categorical_single_integer_list",
  }, {
    traceTag: "DNA_GUI_SURVIVAL_PLOT",
    chartType: "Survival Plot",
    dataFieldName: "Interpolated Year when cancer first diagnosed",
    secondDataFieldName: "Test array presented",
    dataType: "float_sparse × categorical_single_integer_list",
  }, {
    traceTag: "DNA_GUI_SCATTER_PLOT",
    chartType: "Scatter Plot",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    secondDataFieldName: "Year of birth",
    dataType: "integer × integer",
  }, {
    traceTag: "DNA_GUI_SCATTER_PLOT",
    chartType: "Scatter Plot",
    dataFieldName: "Seated height",
    secondDataFieldName: "Year of birth",
    dataType: "float × integer",
  }, {
    traceTag: "DNA_GUI_SCATTER_PLOT",
    chartType: "Scatter Plot",
    dataFieldName: "Number of unsuccessful stop-smoking attempts",
    secondDataFieldName: "Townsend deprivation index at recruitment",
    dataType: "integer × float",
  }, {
    traceTag: "DNA_GUI_SCATTER_PLOT",
    chartType: "Scatter Plot",
    dataFieldName: "Seated height",
    secondDataFieldName: "Townsend deprivation index at recruitment",
    dataType: "float × float",
  },
];

export const chartTypesEndpointsList = [
  "**/boxplot",
  "**/count",
  "**/count-cohort",
  "**/histogram",
  "**/row",
  "**/scatterplot",
];
