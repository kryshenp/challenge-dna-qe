import * as TC from "konstants/testing-constants.json";


Cypress.config("experimentalSessionSupport", false);

describe("LocusZoom https app", () => {
  const checkFileOptionsDefaultValue = (inputId: string, defaultValue: string): void => {
    cy.get(inputId).find("option:selected").should("contain", defaultValue);
  };
  const chromosomeLinkMatcher = /https:\/\/job-.*\.internal\.dnanexus\.cloud\/gwas\/.*\/region\/\?chrom=20&start=.*&end=.*/;

  beforeEach(() => {
    cy.login("qa_tester_ui_1", {cacheSession: false});
  });

  it("should run the LocusZoom execution job", () => {
    const executionName = `cy-LocusZoom_${Date.now()}`;

    cy.visit("/app/locuszoom");
    cy.contains("button", "Run").click();
    cy.url().should("match", /\/panx\/tools\/run\/app-.*\/execution-settings\/select-output-modal/);
    cy.get(TC.FILTER_BAR_ID_FILTER).click();
    cy.get(TC.FILTER_BAR_ID_FILTER).find("input").type("FfQ4z7000GvgVZGPGk7kZPKF");
    cy.get(TC.FILTER_BAR_ID_FILTER).find(TC.FILTER_BAR_APPLY_BUTTON).click();
    cy.get(TC.UDS_PROJECT_NAME_CELL).click();
    cy.get(TC.MODAL_CONFIRM_BUTTON).click();
    cy.get(TC.APP_EXECUTION_NAME_INPUT).type(executionName);
    // limit app execution time to approx 1 hour = 1 $
    cy.get(TC.APP_EXECUTION_SPENDING_LIMIT_INPUT).type("1");
    cy.get(TC.NAV_ANALYSIS_INPUTS_TAB).click();
    cy.get(TC.SELECT_INPUT).click();
    cy.containsAttached(TC.FOLDER_TREE_ITEM, "LocusZoom testing files", {timeout: 30000}).click();
    cy.contains(TC.UDS_DATA_NAME_CELL, "normalized.txt", {timeout: 30000}).should("be.visible");
    cy.get(TC.SELECT_ALL_ROWS).click({force: true});
    cy.get(TC.MODAL_CONFIRM_BUTTON).click();
    cy.get("[data-dx-component='file-selected']").should("have.text", "(Array) 3 Files");
    cy.get(TC.EXECUTION_ANALYSIS_START_BUTTON).click();
    cy.get(`[title="${executionName}"]`).should("be.visible");

    // saves the job execution ID to a temporary fixture file
    cy.url().then((url: any) => {
      const jobID = url.match(/\/job\/(.*)/)[1];
      cy.writeFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionId.txt`, jobID);
    });

    // waits max 10 minutes for job to have status running and httpsApp url to be created
    // pings the job-${execId}/describe every minute to get legit execution status and httpsApp url
    cy.readFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionId.txt`).then(execId => {
      let retries = -1;
      const requestForExecutionStatus = (): unknown => {
        retries++;
        return cy.request({
          method: "POST",
          url: `https://stagingapi.dnanexus.com/job-${execId}/describe`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: {
            "fields": {
              "state": true,
              "httpsApp": true,
            },
          },
        })
          .then((jobStatusResp) => {
            try {
              expect(jobStatusResp.body.state).to.eq("running");
              expect(jobStatusResp.body.httpsApp.dns.url).to.not.eq(undefined);
            } catch (err) {
              cy.log(`Elapsed ${retries} minutes`);
              cy.log(`Job Execution status is ${jobStatusResp.body.state}`);
              localStorage.setItem("_session.lastActivity", `${Date.now()}`);
              cy.wait(60000);
              if (retries > 10)
                throw new Error(`Job execution is not running after ${--retries} minutes elapsed`);
              return requestForExecutionStatus();
            }
            return jobStatusResp;
          });
      };
      requestForExecutionStatus();
    });

    // log in the user to system & save the execution cookies names and values to a temporary fixture file for later reuse
    cy.readFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionId.txt`).then(execId => {
      // wait 4 minutes to bypass the 502 Bad request bug when job execution is running but httpsApp has not started yet
      cy.wait(240000);
      cy.request({
        method: "GET",
        url: `https://job-${execId}.internal.dnanexus.cloud/`,
      }).then((refererResp) => {
        // convert referer into correct format for later reuse
        const jobExecutionReferer = (refererResp.allRequestResponses[0]["Response Headers"].location).replace("com:443", "com");
        cy.request({
          method: "POST",
          url: "https://stagingauth.dnanexus.com/system/newAuthToken",
          headers: {
            "Content-Type": "application/json",
            Referer: jobExecutionReferer,
          },
          body: {
            username: Cypress.env("qa_tester_ui_1").username,
            password: Cypress.env("qa_tester_ui_1").password,
          },
        }).then((newAutTokenResp) => {
          localStorage.setItem("access_token", newAutTokenResp.body.access_token);
          localStorage.setItem("token_signature", newAutTokenResp.body.token_signature);
          localStorage.setItem("token_type", newAutTokenResp.body.token_type);
          localStorage.setItem("user_id", newAutTokenResp.body.user_id);
          localStorage.setItem("_session.cookiesCompliance", "opt-in");
          // request on system/newAuthToken endpoint to get the authorization_code for later reuse
          cy.request({
            method: "POST",
            url: "https://stagingauth.dnanexus.com/system/newAuthToken",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              Referer: jobExecutionReferer,
              Origin: "https://staging.dnanexus.com",
            },
            body: {
              "grant_type": "authorization_code",
              "scope": {
                "full": true,
              },
              "label": "httpsapp",
              "client_id": "httpsapp",
              "redirect_uri": `https://job-${execId.toLowerCase()}.internal.dnanexus.cloud:443/oauth2/access`,
            },
          });
        }).then((authCodeResponse) => {
          // requests the job execution url with authorization_code as parameter to get the
          // execution name, value and csfrToken value to set then later as cookies
          cy.request({
            method: "GET",
            url: `https://job-${execId}.internal.dnanexus.cloud/oauth2/access?code=${authCodeResponse.body.authorization_code}`,
            headers: {
              Referer: jobExecutionReferer,
            },
            failOnStatusCode: false,
          }).then((jobAuthorisationResp) => {
            const jobCookieName: string = (jobAuthorisationResp.allRequestResponses[0]["Response Headers"]["set-cookie"][0]).match(/[^=]*/)[0];
            const jobCookieValue = (jobAuthorisationResp.allRequestResponses[0]["Response Headers"]["set-cookie"][0]).match(/\=(.*?)\;/)[1];
            const csfrTokenCookieValue = (jobAuthorisationResp.allRequestResponses[3]["Response Headers"]["set-cookie"][0]).match(/\=(.*?)\;/)[1];
            // save the job jobCookieName, jobCookieValue and csfrTokenCookieValueto a temporary fixture file for later reuse
            cy.writeFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionCookies.json`, {
              jobCookieName: jobCookieName, jobCookieValue: jobCookieValue, csfrTokenCookieValue: csfrTokenCookieValue,
            });
          });
        });
      });
    });
  });

  context("assoc.chr20_t2d.regenie file data visualization", () => {
    it("upload file and check the outputs", () => {
      // set inputs for locusZoom visualization & verify that it's inputs autofilled with correct values
      cy.readFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionCookies.json`).then((tokens) => {
        cy.setCookie("csrftoken", tokens.csfrTokenCookieValue);
        cy.setCookie(tokens.jobCookieName, tokens.jobCookieValue);
        cy.readFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionId.txt`).then((execId) => {
          cy.visit(`https://job-${execId}.internal.dnanexus.cloud`);
          cy.get("#id_fileset-raw_gwas_file").type("file-G1JYvjQ00GvYVbzYP18FB199").focus();
          checkFileOptionsDefaultValue("#vs-chr", "Chr");
          checkFileOptionsDefaultValue("#vs-ref", "Ref");
          checkFileOptionsDefaultValue("#vs-pval", "Pval");
          checkFileOptionsDefaultValue("#vs-pos", "Pos");
          checkFileOptionsDefaultValue("#vs-alt", "Alt");
          cy.contains("button", "Next").click();
          checkFileOptionsDefaultValue("#vs-beta", "Effect");
          cy.contains("button", "Accept options").click();
          cy.get("#submit_button").click();
          // visualized data don't display immidiately and automatically, we need to wait 10 secs and reload the page
          cy.wait(10000);
          cy.reload();
          // check visualization header info
          cy.get("h1").should("have.text", "assoc.chr20_t2d.regenie");
          cy.get(".col-md-12").should("contain.multiple", ["File ID: file-G1JYvjQ00GvYVbzYP18FB199", "Build: GRCh37"]);
          // check Manhattan Plot visualization
          cy.get("h3").first().should("have.text", "Manhattan Plot");
          cy.get("#gwas_svg").should("be.visible");
          cy.get("#manhattan_plot_container").should("be.visible");
          // check that each point on Manhattan plot is link with valid href attribute
          cy.get("#manhattan_plot_container").find(".variant_hover_rings").children("a")
            .should("have.attr", "href").and("match", chromosomeLinkMatcher);
          cy.get("#manhattan_plot_container").find(".variant_points").children("a")
            .should("have.attr", "href").and("match", chromosomeLinkMatcher);
          cy.get("#manhattan_plot_container").find(".bins").children(".bin").should("be.visible");
          // check Top Hits table visualization
          cy.get("h3").eq(1).should("have.text", "Top Loci");
          cy.get("#top-hits-table").should("be.visible").and("contain", "No peaks found in GWAS");
          // check QQ Plot visualization
          cy.get("h3").last().should("have.text", "QQ Plot:");
          cy.get("#qq_svg").should("be.visible");
          cy.get("#qq_plot").find(".trumpet_ci").should("have.attr", "d").and("match", /.*\S.*/);
          cy.get("#qq_plot").find(".qq_points").children("circle").should("be.visible");
          // check QQ Plot footer is not empty
          cy.get(".gc-control").should("be.visible").invoke("text").should("match", /.*\S.*/);
        });
      });
    });
  });

  context("normalized.txt file data visualization", () => {
    it("upload file and check the outputs", () => {
      // set inputs for locusZoom visualization & verify that it's inputs autofilled with correct values
      cy.readFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionCookies.json`).then((tokens) => {
        cy.setCookie("csrftoken", tokens.csfrTokenCookieValue);
        cy.setCookie(tokens.jobCookieName, tokens.jobCookieValue);
        cy.readFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionId.txt`).then((execId) => {
          cy.visit(`https://job-${execId}.internal.dnanexus.cloud`);
          cy.get("#id_fileset-raw_gwas_file").type("file-G1JYvjQ00Gvbv6vvP1VZX1jF").focus();
          checkFileOptionsDefaultValue("#vs-chr", "chrom");
          checkFileOptionsDefaultValue("#vs-ref", "ref");
          checkFileOptionsDefaultValue("#vs-pval", "neg_log_pvalue");
          checkFileOptionsDefaultValue("#vs-pos", "pos");
          checkFileOptionsDefaultValue("#vs-alt", "alt");
          cy.contains("button", "Next").click();
          checkFileOptionsDefaultValue("#vs-beta", "beta");
          checkFileOptionsDefaultValue("#vs-stderr", "stderr_beta");
          cy.contains("button", "Accept options").click();
          cy.get("#submit_button").click();
          // visualized data don't display immidiately and automatically, we need to wait 10 secs and reload the page
          cy.wait(10000);
          cy.reload();
          // check visualization header info
          cy.get("h1").should("have.text", "normalized.txt");
          cy.get(".col-md-12").should("contain.multiple", ["File ID: file-G1JYvjQ00Gvbv6vvP1VZX1jF", "Build: GRCh37"]);
          // check Manhattan Plot visualization
          cy.get("h3").first().should("have.text", "Manhattan Plot");
          cy.get("#gwas_svg").should("be.visible");
          cy.get("#manhattan_plot_container").should("be.visible");
          // check that each point on Manhattan plot is link with valid href attribute
          cy.get("#manhattan_plot_container").find(".variant_hover_rings").children("a")
            .should("have.attr", "href").and("match", chromosomeLinkMatcher);
          cy.get("#manhattan_plot_container").find(".variant_points").children("a")
            .should("have.attr", "href").and("match", chromosomeLinkMatcher);
          cy.get("#manhattan_plot_container").find(".bins").children(".bin").should("be.visible");
          // check Top Hits table visualization
          cy.get("h3").eq(1).should("have.text", "Top Loci");
          cy.get("#top-hits-table").should("be.visible");
          cy.get("#top-hits-table").find("[tabulator-field='marker']").last().children("a")
            .should("not.be.empty").and("have.attr", "href").and("match", chromosomeLinkMatcher);
          cy.get("#top-hits-table").find("[tabulator-field='rsid']").last().invoke("text").should("match", /.*\S.*/);
          cy.get("#top-hits-table").find("[tabulator-field='nearest_genes']").last().invoke("text").should("match", /.*\S.*/);
          cy.get("#top-hits-table").find("[tabulator-field='neg_log_pvalue']").first().invoke("text").should("match", /.*\S.*/);
          // check QQ Plot footer is not empty
          cy.get("h3").last().should("have.text", "QQ Plot:");
          cy.get("#qq_svg").should("be.visible");
          cy.get("#qq_plot").find(".trumpet_ci").should("have.attr", "d").and("match", /.*\S.*/);
          // check QQ Plot footer is not empty
          cy.get("#qq_plot").find(".qq_points").children("circle").should("be.visible");
          cy.get(".gc-control").should("be.visible").invoke("text").should("match", /.*\S.*/);
        });
      });
    });
  });

  after("terminate the analysis", () => {
    cy.readFile(`${Cypress.env("pathToLocusZoomJobExecutionTokens")}/locusZoomExecutionId.txt`).then((execId) => {
      cy.request({
        method: "POST",
        url: `https://stagingapi.dnanexus.com/job-${execId}/terminate`,
        body: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }).then((analysisTermination) => {
        expect(analysisTermination.status).to.eq(200);
      });
    });
  });
});
