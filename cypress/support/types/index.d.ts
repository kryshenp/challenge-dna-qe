declare namespace Chai {
  interface Assertion {
      descending(): Assertion;
      ascending(): Assertion;
  }
}

declare namespace Cypress {
  export interface Chainable {
    /**
     * Extend the original visit to primarily recommend URLs from enums as values when typing cy.visit("")
     */
    visit(url: import("../enums").UrlsType, options?: Partial<VisitOptions>): Chainable<AUTWindow>

    /**
     * Login to the app programatically.
     * - Saves tokens to localStorage for the session.
     *
     * - Expects <user>_USERNAME and <user>_PASSWORD to be injected via environment variables either from
     * cypress.json under env, or the CLI
     *
     * note: if injecting via the CLI the CYPRESS_ prefix has to be used
     *
     * @example
     *     CYPRESS_USERNAME="usr" CYPRESS_PASSWORD="pwd" cypress run
     *
     * @see https://docs.cypress.io/guides/guides/environment-variables.html#Setting
     * @param user - Platform user username
     * @param {cacheSession: true} - Whether to use cached localstorage, sessionStorage and cookies. Defaults to true
     */
    login(user: string, {cacheSession = true} = {}): Cypress.Chainable<Cypress.Cookie>;

    /**
     * @param name - the name to search for in the filter bar
     *
     * - Click the name filter
     * - type: `${name}` to the input
     * - click the Apply button
     *
     */
    searchByNameInDM(name: string): void;

    /**
     * @param id - the ID of element to search for in the filter bar
     *
     * - Click the ID filter
     * - type: `${id}` to the input
     * - click the Apply button
     *
     */
     searchByIdInDM(id: string): void;

     /**
     * @param scope - project Scope
     *
     * - click the project scope dropdown in DM and choose different project scope
     * @examples
     * cy.switchProjectScopeInDM("Entire Project");
     * cy.switchProjectScopeInDM("Current Folder and Subfolders");
     * cy.switchProjectScopeInDM("Current Folder Only");
     */
      switchProjectScopeInDM(scope: string): void;

    /**
     *
     * @param chartType - chart types as seen in tile preview selection or Chart Type Drowpdown in the Tile Frame
     * @param dataFieldName - name of the first datafield in the chart builder
     * @param secondDataFieldName - name of the second datafield in the chart builder
     * @example
     * for one dimensional tiles
     * cy.addDashboardTile("Row Chart", "Age at recruitment");
     *
     * for two dimensional tiles
     * cy.addDashboardTile("Row Chart", "Age at recruitment", "Email access")
     */
    addDashboardTile(chartType: string, dataFieldName: string, secondDataFieldName?: string): void;

    /**
     * Preserve the following cookies: `"access_token", "token_signature", "token_type", "user_id"`
     * and set them to `localStorage`
     */
    preserveLoginTokens(): void;

    /**
     *
     * Wait one second for the element to be attached.
     * If the element gets detached, get the new element's reference
     *
     * @param selector class, ID, data-test-id...
     * @param text contained in the element by selector
     * @param opts.timeout time in milis to wait for element
     */
    containsAttached(selector, text, opts?: {retries?: number, delay?: number, timeout?: number});

    /**
     * Programatically upload a file for testing purposes
     *
     * @param projectID the ID of the project found in settings or the URL
     * @param folder Folder from the root of the project
     * @param file These can be easily found when you manually upload the file and read the response
     *
     */
    uploadTextFileToProject(
      projectID: string,
      folder: string,
      file: {name: string; textContent: string},
    ): void;

    /**
     * Programatically create a new folder in the project
     *
     * @param projectID the ID of the project
     * @param folderName Folder name
     * @param projectScope path to folder in project
     *
     */
     createNewFolderInProject(
      projectID: string,
      folderName: string,
      projectScope: string,
    ): void;

    /**
     *
     * @param args comma separated strings with requirement tags
     *
     * @example
     * cy.trace('DNA_GUI_COHORTBROWSER_LOAD', 'DNA_GUI_COHORTBROWSER_VIEW_CHART')
     */
    trace(...args): void;

    /**
     * Programatically associate DNAnexus user with UKBiobank AMS user
     * @param platformUser platform username
     * @param ukbRapUser UKBiobank RAP username, see: https://confluence.internal.dnanexus.com/display/UKBB/UKB+RAP+Staging+Test+Accounts
     */
    associateWithUKB(platformUser: string, ukbRapUser: string): void;

    /**
     * Programatically remove the project
     *
     * @param projectId the ID of the project that should be removed
     *
     */
    removeProject(projectId: string): void;

    /**
     * Programatically remove specified files form project
     *
     * @param projectID the ID of the project where the file is located
     * @param folderScope folder scope, eg. "/" - entire project, "/Automation workflows/outputs" - /<projectName>/Automation workflows/outputs folder
     * @param fileNameFilter filter file by name, eg "^cy-" - filter files that have names starting with "cy-"
     * @param fileAgeInMs age of file in miliseconds, eg. 1hour old file age is 3600000ms, 2 weeks old files is 1209600000;
     *
     ** @examples
     * cy.removeFilesFromProject(cy.removeFilesFromProject("FfQ4z7000GvgVZGPGk7kZPKF", "/", "^cy-", 3600000);
     * remove all files in "FfQ4z7000GvgVZGPGk7kZPKF" project that have names starting with "cy-" and are older than 1 hour.
     *
     * cy.removeFilesFromProject("FfQ4z7000GvgVZGPGk7kZPKF", "/Automation workflows/outputs", "cypress_small_manifest_input\\.txt\\.gz", 0);
     * remove all files with name "cypress_small_manifest_input.txt.gz", located at "/Automation workflows/outputs" folder
     * of the "FfQ4z7000GvgVZGPGk7kZPKF" project.
     */
    removeFilesFromProject(projectID: string, folderScope: string, fileNameFilter: string, fileAgeInMs: number): void;

    /**
     * Programatically remove specified folders form project
     *
     * @param projectID the ID of the project where the folder is located
     * @param folderScope folder scope - path to folder that should be removed eg. /Automation folders/cy-12345
     *
     ** @example
     * cy.removeFolderFromProject("FV5015Q0FZ9P6x403xFGQ7V2", `/Automation folders/cy-12345`);
     * remove cy-12345 folder located in root/Automation folders/ directory of the project with ID FV5015Q0FZ9P6x403xFGQ7V2
     *
     */
     removeFolderFromProject(projectID: string, folderScope: string): void;

    /**
     * Programatically pins the specified list of projects
     *
     * @param username username of the user whose session data will be affected
     * @param projectIDsList list of the id's of projects that should be pinned,
     * could be an empty array
     *
     ** @examples
     cy.pinProjects("qa_tester_ui_1", []);
     * no projects are pinned
     cy.pinProjects("qa_tester_ui_1", ["project-FfQ4z7000GvgVZGPGk7kZPKF", "project-G2J983QJbxzxB09gFx606Kz3"]);
     * 2 projects with specified IDs are pinned
     */
     pinProjects(username: string, projectIDsList: Array<string>): void;

    /**
     * Programatically sets the default region for organzation
     *
     * @param orgId ID of the organization
     * @param regionName Name of the region
     *
     ** @example
     cy.setDefaultBillingRegionForOrg("org-test_org1", "aws:us-east-1");
     */
     setDefaultBillingRegionForOrg(orgId: string, regionName: string): void;

    /**
     * Throw an error if an endpoint is called after this command
     * Used for testing scenarios, where some items shoul NOT be fetching again after some actions
     *
     * @param endpoint the API endpoint we want to fail if called
     *
     ** @example
      cy.get(TC.COMPONENT_NAVBAR_TAB).last().click();
      failIfIntercepted("histogram");
      cy.wait(3000)
     */
     failIfEndpointIsCalled(endpoint: string): void;


     /**
     * Throw an error if response on endpoint throws error with status code 4xx or 5xx
     * Used to prevent tests to continue if there is an error response on endpoint
     *
     * @param endpoint the API endpoint we want to prevent the failure on
     *
     ** @examples
      cy.failOnInvalidResponse("**\/count-cohort")
      cy.failOnInvalidResponse(["**\/count-cohort", "boxplot"])
     */
    failOnInvalidResponse(endpoints: Array<string> | string): void;


     /**
     * Programatically terminates jobs that are running over the  specified project
     *
     * @param projectID the ID of the project over which the jobs are running
     * @param jobNameFilter filter job by name, eg "^cy-" - filter jobs that have names starting with "cy-"
     * @param minJobAgeInMs minimal age of job in miliseconds, eg. 1hour old file age is 3600000ms, 2 weeks old files is 1209600000;
     *
     ** @examples
     * cy.terminateRunningJobs("FfQ4z7000GvgVZGPGk7kZPKF", "^cy-", 3600000);
     * terminate all jobs that are running over 1 hour in the project with ID: "FfQ4z7000GvgVZGPGk7kZPKF" with job name starting with "cy-".
     *
     * cy.terminateRunningJobs("FfQ4z7000GvgVZGPGk7kZPKF", "^cy-JupyterLab_", 0);
     * terminate all jobs that are running in the project with ID: "FfQ4z7000GvgVZGPGk7kZPKF" with job name starting with "cy-JupyterLab_".
     */
     terminateRunningJobs(projectID: string, jobNameFilter: string, minJobAgeInMs: number): void;

    /**
     * visit URL that would have opened in a new tab
     */
     handleNewTab(): void;

    /**
     *
     * @param projectName name of the project
     * @param billToOrg the ID of an organization the project should be billed to
     * @param region region of the project
     *
     * Creates a new Project through the API.
     * to run the command the value of access_token is needed so firstly login should be performed
     * command also saves a project ID as Cypress.env in format: <projectName>_ID:<ID>
     **/

     createProject(projectName: string, billToOrg: string, region: string): void;

     /**
      *
      * @param fromElement is provided by default from the chained element. In tests only send one param: toElement
      * @param toElement selector of element where the drag should end
      *
      * Must be chained off an element.
      * * @example
      * cy.get('.file').dragTo('folder')
      * cy.contains('.file', 'drag-this-file.txt').dragTo('[title="drag-to-this-folder"]')
      */
     dragTo(fromElement, toElement?: string): void;
  }
}
