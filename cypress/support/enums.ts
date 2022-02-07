export enum FILTEROPERATOR {
  EQUALS = "EQUALS ANY OF",
  GREATER_THAN = "IS GREATER THAN",
  GREATER_THAN_OR_EQUALS_TO = "IS GREATER THAN OR EQUALS TO",
  LESS_THAN = "IS LESS THAN",
  LESS_THAN_OR_EQUALS_TO = "IS LESS THAN OR EQUALS TO",
  NOT_NULL = "IS NOT NULL",
  NOT_EMPTY = "IS NOT NULL",
}

export enum PROJECTSCOPE {
  ENTIRE_PROJECT = "Entire Project",
  CURRENT_FOLDER_ONLY = "Current Folder Only",
  CURRENT_FOLDER_AND_SUBFOLDERS = "Current Folder and Subfolders",
}

export enum ZYGOSITY {
  ANY = "Any",
  HOMOZYGOUS = "Homozygous",
  HETEROZYGOUS = "Heterozygous",
}

export enum PROJECT_ROLE {
  CONTRIBUTE = "CONTRIBUTE",
  ADMINISTER = "ADMINISTER",
}

export enum URLS {
  APOLLO_ALL_DATA_TYPES = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G658zVQ00GvxGp1233fqFVJz",
  APOLLO_ASSOCIATION_BROWSER = "/panx/apollo/browse/project/FkyXg38071F1vGy2GyXyYYQB/cohort/3.0/Fp5G7Pj071FP3jXx0vgQ1Q3J",
  APOLLO_COMPARE_UKB_100K = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/FyJB0Zj00GvZJ6XV58yg2gY0?compare=FyJB1Vj00GvbQvKQ3Z3G82qp",
  APOLLO_COMPARE_UKB_50K = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/FyG2PQQ00Gvx9k8g32k3Fx6V?compare=G04gy0j00Gvgf0ZK2bGB793f",
  APOLLO_COMPARE_UKB_100K_EMPTY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/FyJB0Zj00GvZJ6XV58yg2gY0?compare=FyJB1Vj00GvbQvKQ3Z3G82qp&layoutRecord=G5Z3Vj800Gvx2J16300k61jx",
  APOLLO_COMPARE_UKB_50K_EMPTY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/FyG2PQQ00Gvx9k8g32k3Fx6V?compare=G04gy0j00Gvgf0ZK2bGB793f&layoutRecord=G5Z3V6j00GvkvKVF2zq387p4",
  APOLLO_GWAS = "/panx/apollo/browse/project/FkyXg38071F1vGy2GyXyYYQB/cohort/3.0/Fp5GK8j071F75B0Q0vvVBqZQ",
  APOLLO_K_PATIENT_1_1_EMPTY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G693j5Q00Gvz87X8F0x273JZ",
  APOLLO_K_PATIENT_2_9_EMPTY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G693k4000GvbVb5pFkqGVX7V",
  APOLLO_K_PATIENT_3_0_EMPTY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G62Xx9j00GvkyVgk5k02VpX9",
  APOLLO_K_PATIENT_TED_5_ENTITIES = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G566F1j00GvjP8VX2qq2pv1y",
  APOLLO_K_PATIENT_TED_SCROLL_TEST = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G654VZQ00Gvf2VQ4FJXZ6Z6v",
  APOLLO_LOCUS_DETAIL_MULTI = "/panx/apollo/browse/project/FkyXg38071F1vGy2GyXyYYQB/cohort/3.0/FyFPyz0071F54Zjb32vG82Gj/locus/1_55039791_G_A",
  APOLLO_LOCUS_DETAIL_MULTITRANSCRIPT = "/panx/apollo/browse/project/FkyXg38071F1vGy2GyXyYYQB/cohort/3.0/FyFPyz0071F54Zjb32vG82Gj/locus/2_218282101_T_C",
  APOLLO_LOCUS_DETAIL_SINGLE = "/panx/apollo/browse/project/FkyXg38071F1vGy2GyXyYYQB/cohort/3.0/FyFPyz0071F54Zjb32vG82Gj/locus/1_55063628_G_A",
  APOLLO_TCGA = "/panx/apollo/browse/project/FkyXg38071F1vGy2GyXyYYQB/cohort/3.0/Fp5Fq2j071F48XjX35Yy3ffq",
  APOLLO_UKB_100K_1_1 = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G6944B800Gvf8gzyFvYZgXXq",
  APOLLO_UKB_100K_1_1_HEAVY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G694ZKj00Gvg1717FkYk9g3b",
  APOLLO_UKB_100K_2_9 = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G6944gQ00Gvz0GKkJ3PF2QkB",
  APOLLO_UKB_100K_3_0 = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G69k9kQ00Gvjkb3p3kF0Z7vZ",
  APOLLO_UKB_100K_3_0_EMPTY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G62Y0vj00GvygF5Q35Y6V0Xp",
  APOLLO_UKB_50K_1_1 = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G66Qk4000GvkgFjF32xv2YJ1",
  APOLLO_UKB_50K_2_9 = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G62Y2y800GvQ5gfq2Vv45gjQ",
  APOLLO_UKB_50K_3_0 = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G69jPG000GvV1qvzPFYffjKF",
  APOLLO_UKB_50K_3_0_EMPTY = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G6576Z800Gvgk89b265XX10k",
  APOLLO_UKB_RAP_100K = "/panx/apollo/browse/project/G4xXqVj0Y688PjY74bJk8YqV/cohort/3.0/G4xXv7j0Y68JGzfX4bBGkbV9",
  APOLLO_VIEWS_LIST_VIEWS = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G3Z4VB000Gvzv0z02JgJX8QX",
  APOLLO_VIEWS_ROW_CHARTS = "/panx/apollo/browse/project/FfQ4z7000GvgVZGPGk7kZPKF/cohort/3.0/G3Z4X8j00GvzG7B48Q6P431p",
  DM_AUTOMATION_COHORTS = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Automation%20cohorts/",
  DM_AUTOMATION_COPY_DATA = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Automation%20copy%20data/",
  DM_AUTOMATION_FOLDERS = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Automation%20folders/",
  DM_AUTOMATION_ADD_DATA_FROM_PROJECT = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Automation%20copy%20data/Add%20Data%20from%20Project/",
  DM_AUTOMATION_FILES = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Automation%20files/",
  DM_AUTOMATION_APPLETS = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Automation%20applets/",
  DM_AUTOMATION_ARCHIVAL = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Archival/",
  DM_AUTOMATION_TESTING_PROJECT = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/",
  DM_AUTOMATION_PROJECT_2 = "/panx/projects/FjZ4vy00QGBzXjF65ZF5p2q0/data/Automation%20cohorts",
  DM_NATERA_PROD_CLONE = "/panx/projects/FV5015Q0FZ9P6x403xFGQ7V2/data/",
  DM_COHORT_SNAPSHOTS = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Cohort%20snapshots/",
  DM_JUPYTER_FILE_VIEWER = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Jupyter%20fileviewer/",
  DM_VISUALIZE = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/visualize",
  PROFILE_BILLING = "/panx/profile/qa_tester_ui_1/settings/billing",
  PROFILE_USER_ACCOUNT = "/panx/profile/qa_tester_ui_1/settings/userAccount",
  DM_AUTOMATION_WORKFLOWS = "/panx/projects/FfQ4z7000GvgVZGPGk7kZPKF/data/Automation%20workflows/",
  DM_CY_MAIN_PROJECT_SHOWCASE_METADATA = "/panx/projects/G5jV5JQJGKPj761K2x11Q0Z7/data/Showcase%20metadata/",
  DM_CY_MAIN_PROJECT = "/panx/projects/G5jV5JQJGKPj761K2x11Q0Z7/data",
}

export type UrlsType = keyof typeof URLS
