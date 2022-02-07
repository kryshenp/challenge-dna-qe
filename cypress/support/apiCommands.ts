import {isEmpty} from "lodash";
import SparkMD5 from "spark-md5";

Cypress.Commands.add("login", (user: string, {cacheSession = true} = {}) => {
  const login = (): void => {
    cy.request({
      method: "POST",
      url: "https://stagingauth.dnanexus.com/system/newAuthToken",
      body: Cypress.env(user),
    }).then((response) => {
      localStorage.setItem("access_token", response.body.access_token);
      localStorage.setItem("token_signature", response.body.token_signature);
      localStorage.setItem("token_type", response.body.token_type);
      localStorage.setItem("user_id", response.body.user_id);
      localStorage.setItem("_session.cookiesCompliance", "opt-in");

      cy.setCookie("access_token", response.body.access_token);
      cy.setCookie("token_signature", response.body.token_signature);
      cy.setCookie("token_type", response.body.token_type);
      cy.setCookie("user_id", response.body.user_id);
      cy.setCookie("_session.cookiesCompliance", "opt-in");

      cy.fixture(`userSettings_${user}.json`).then(fixture => {
        cy.request({
          method: "POST",
          url: `https://stagingapi.dnanexus.com/user-${user}/update`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: fixture,
        });
      });
    });
  };
  if (cacheSession) {
    cy.session(user, login);
  } else {
    login();
  }
});

Cypress.Commands.add("preserveLoginTokens", () => {
  Cypress.Cookies.preserveOnce("access_token", "token_signature", "token_type", "user_id");
  cy.getCookie("access_token").then((cookie: any) => localStorage.setItem("access_token", cookie.value));
  cy.getCookie("token_signature").then((cookie: any) => localStorage.setItem("token_signature", cookie.value));
  cy.getCookie("token_type").then((cookie: any) => localStorage.setItem("token_type", cookie.value));
  cy.getCookie("user_id").then((cookie: any) => localStorage.setItem("user_id", cookie.value));
});

Cypress.Commands.add("uploadTextFileToProject", (projectID, folder, file) => {
  cy.request({
    method: "POST",
    url: "https://stagingapi.dnanexus.com/file/new",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {
      folder: folder,
      name: file.name,
      project: `project-${projectID}`,
    },
  }).then((response) => {
    cy.request({
      method: "POST",
      url: `https://stagingapi.dnanexus.com/${response.body.id}/upload`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: {
        md5: SparkMD5.hash(`${file.textContent}\n`),
        size: (new TextEncoder().encode(`${file.textContent}\n`)).length,
        body: {},
        index: 1,
      },
    }).then((uploadResponse) => {
      cy.request({
        method: "PUT",
        url: uploadResponse.body.url,
        headers: {
          "Content-MD5": uploadResponse.body.headers["content-md5"],
          "Content-Type": uploadResponse.body.headers["content-type"],
          "x-amz-server-side-encryption": "AES256",
        },
        body: `${file.textContent}\n`,
      });

      cy.request({
        method: "POST",
        url: `https://stagingapi.dnanexus.com/${response.body.id}/close`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: {},
      });
    });
  });
});

Cypress.Commands.add("createNewFolderInProject", (projectID: string, folderName: string, projectScope: string) => {
  cy.request({
    method: "POST",
    url: `https://stagingapi.dnanexus.com/project-${projectID}/newFolder`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {
      "folder": `/${projectScope}/${folderName}`,
    },
  }).then((createNewFolderResp: any) => {
    if (createNewFolderResp.status === 200) {
      cy.log(`folder with name: ${folderName} was created successfully`);
    } else {
      throw new Error(`Folder creation failed with status ${createNewFolderResp.status}`);
    }
  });
});

Cypress.Commands.add("associateWithUKB", (platformUser: string, ukbRapUser: string) => {
  cy.request({
    method: "POST",
    url: "https://stagingauth.dnanexus.com/system/newAuthToken",
    body: Cypress.env(platformUser),
  }).then((response) => {
    localStorage.setItem("access_token", response.body.access_token);
    localStorage.setItem("token_signature", response.body.token_signature);
    localStorage.setItem("token_type", response.body.token_type);
    localStorage.setItem("user_id", response.body.user_id);
    localStorage.setItem("_session.cookiesCompliance", "opt-in");
    cy.request({
      method: "POST",
      url: `https://stagingapi.dnanexus.com/user-${platformUser}/describe`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: {
        fields: {
          providers: true,
        },
      },
    }).then((ukbProvidersCheck) => {
      // continues association process if the DNAnexus user has no association with the UKBiobank AMS user
      // or provider status is inactive
      if (
        isEmpty(ukbProvidersCheck.body.providers) ||
        ukbProvidersCheck.body.providers["provider-ukbiobank"].status == "inactive"
      ) {
        cy.request({
          // get the associate Ukb Provider url
          method: "POST",
          url: "https://stagingapi.dnanexus.com/provider-ukbiobank/associate",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            Origin: "https://ukbiobank-staging.dnanexus.com",
            Referer: "https://ukbiobank-staging.dnanexus.com/panx/associate",
          },
          body: {},
        }).then((associateUkbProvider) => {
          cy.request({
            method: "GET",
            url: associateUkbProvider.body.url,
          }).then(() => {
            // get the login page body with csrf token
            cy.request({
              method: "GET",
              url: "https://bbams.ndph.ox.ac.uk/aoTesting/login",
            }).then((loginResponse) => {
              // log in programatically to the UKBiobank AMS system
              cy.request({
                method: "POST",
                url: "https://bbams.ndph.ox.ac.uk/aoTesting/login",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: {
                  _csrf: loginResponse.body.match(/name="_csrf" value="(.*)"/)[1],
                  username: Cypress.env(ukbRapUser).username,
                  password: Cypress.env(ukbRapUser).password,
                },
              }).then(() => {
                // get the code of 4 alphanumeric symbols to be assigned later
                // as a parameter to the dnanexus association url address on redirect
                cy.request({
                  method: "GET",
                  url: associateUkbProvider.body.url,
                  headers: {
                    Referer: "https://bbams.ndph.ox.ac.uk/aoTesting/login",
                  },
                }).then((authorizeWithCookieResponse) => {
                  // authorize assiciated user
                  cy.request({
                    method: "POST",
                    url: "https://stagingapi.dnanexus.com/provider-ukbiobank/associate",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                      Origin: "https://ukbiobank-staging.dnanexus.com",
                      Referer: authorizeWithCookieResponse.allRequestResponses[0]["Response Headers"].location,
                    },
                    body: {
                      code: authorizeWithCookieResponse.allRequestResponses[0]["Response Headers"].location.match(
                        /code=(.*)/,
                      )[1],
                    },
                  });
                });
              });
            });
          });
        });
      } else {
        cy.log(`User ${platformUser} is already associated with UKBiobank RAP user ${ukbRapUser}`);
      }
    });
  });
});

Cypress.Commands.add("removeProject", (projectId: string) => {
  cy.request({
    method: "POST",
    url: `https://stagingapi.dnanexus.com/${projectId}/destroy`,
    body: {
      terminateJobs: true,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).then((removeProjectResp: any) => {
    if (removeProjectResp.status === 200) {
      cy.log(`project with ID: ${projectId} was removed successfully`);
    } else {
      cy.log(`project with ID: ${projectId} was not removed`);
    }
  });
});

Cypress.Commands.add("removeFilesFromProject", (projectID: string, folderScope: string, fileNameFilter: string, fileAgeInMs: number) => {
  cy.request({
    method: "POST",
    url: "https://stagingapi.dnanexus.com/system/findDataObjects",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {
      "created": {
        "after": 946681200000,
        "before": Date.now() - fileAgeInMs,

      },
      "describe": {
        "fields": {
          name: true,
        },
      },
      "limit": 100,
      "name": {
        "flags": "i",
        "regexp": fileNameFilter,
      },
      "scope": {
        "folder": folderScope,
        "project": `project-${projectID}`,
        "recurse": true,
      },
      "totalResults": true,
    },
  }).then(findFilesResp => {
    const fileIdsList: Array<string> = [];
    const fileNamesList: Array<string> = [];
    findFilesResp.body.results.forEach((result: {id: string, describe: {name: string}}) => {
      fileIdsList.push(result.id);
      fileNamesList.push(result.describe.name);
    });
    if (fileIdsList.length > 0) {
      cy.request({
        method: "POST",
        url: `https://stagingapi.dnanexus.com/project-${projectID}/removeObjects`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: {
          "objects": fileIdsList,
          "force": true,
        },
      }).then((fileRemoval) => {
        expect(fileRemoval.status).to.eq(200);
        cy.log(`The following elements were removed successfully: ${fileNamesList}`);
      });
    } else {
      cy.log(`No elements matching the ${fileNameFilter} were found in directory ${folderScope} `);
    }
  });
});

Cypress.Commands.add("removeFolderFromProject", (projectID: string, folderScope: string) => {
  cy.request({
    method: "POST",
    url: `https://stagingapi.dnanexus.com/project-${projectID}/removeFolder`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {"folder": folderScope, "recurse": true, "force": true},
  }).then((folderRemoval) => {
    expect(folderRemoval.status).to.eq(200);
    cy.log(`${folderScope} was removed successfully`);
  });
});

Cypress.Commands.add("pinProjects", (username: string, projectIDsList: Array<string>) => {
  cy.request({
    method: "POST",
    url: `https://stagingapi.dnanexus.com/user-${username}/update`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {
      "sessionData": {
        "favorites": {
          "projects": projectIDsList,
        },
      },
    },
  }).then((pinProjects) => {
    expect(pinProjects.status).to.eq(200);
    cy.log(`${projectIDsList} was pinned successfully`);
  });
});

Cypress.Commands.add("setDefaultBillingRegionForOrg", (orgId: string, regionName: string) => {
  cy.request({
    method: "POST",
    url: `https://stagingapi.dnanexus.com/${orgId}/update`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {
      defaultRegion: regionName,
    },
  }).then((setDefaultRegion) => {
    expect(setDefaultRegion.status).to.eq(200);
  });
});

Cypress.Commands.add("failIfEndpointIsCalled", (endpoint: string) => {
  cy.intercept(`**/${endpoint}`, (req) => {
    req.reply(() => {
      throw new Error(`**/${endpoint} was already fetched before\nTiles should not call API when switching back.`);
    });
  });
});

Cypress.Commands.add("failOnInvalidResponse", (endpoints: Array<string> | string) => {
  const endpointsList = typeof endpoints == "string" ? [endpoints] : endpoints;
  endpointsList.forEach((endpoint: string) => {
    cy.intercept(endpoint, (req) => {
      req.on("response", (res) => {
        if (res.statusCode >= 400) {
          throw new Error(`Invalid API response.\n\n
            URL: ${req.url}\n\n
            Status Code: ${res.statusCode}\n\n
            Response Body: ${typeof res.body == "string" ? res.body : JSON.stringify(res.body)}`,
          );
        }
      });
    });
  });
});


Cypress.Commands.add("terminateRunningJobs", (projectID: string, jobNameFilter: string, minJobAgeInMs: number) => {
  cy.request({
    method: "POST",
    url: "https://stagingapi.dnanexus.com/system/findExecutions",
    headers: {
      Referer: `https://staging.dnanexus.com/projects/${projectID}/monitor`,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {
      "created": {
        "before": Date.now() - minJobAgeInMs,
      },
      "limit": 40,
      "name": {
        "regexp": jobNameFilter,
      },
      "project": `project-${projectID}`,
      "state": [
        "idle",
        "runnable",
        "waiting_on_input",
        "running",
        "restartable",
        "waiting_on_output",
        "unresponsive",
        "in_progress",
      ],
    },
  }).then(findExecutionsResp => {
    findExecutionsResp.body.results.forEach((result: {id: string}) => {
      cy.request({
        method: "POST",
        url: `https://stagingapi.dnanexus.com/${result.id}/terminate`,
        body: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }).then((jobTermination) => {
        expect(jobTermination.status).to.eq(200);
        cy.log(`job with id=${result.id} was terminated successfully`);
      });
    });
  });
});

Cypress.Commands.add("createProject", (projectName: string, billToOrg: string, region: string) => {
  cy.request({
    method: "POST",
    url: "https://stagingapi.dnanexus.com/project/new",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: {
      "billTo": billToOrg,
      "description": "",
      "name": projectName,
      "region": region,
      "summary": "",
      "tags": [],
      "properties": {},
      "downloadRestricted": false,
      "protected": false,
      "restricted": false,
    },
  }).then((createProjectResp: any) => {
    if (createProjectResp.status === 200) {
      cy.log(`project with name: ${projectName} was created successfully`);
      // save a project ID as Cypress.env in format: <projectName>_ID:<ID>
      Cypress.env(`${projectName}_ID`, createProjectResp.body.id.split("project-")[1]);
    } else {
      throw new Error(`Project creation failed with status ${createProjectResp.status}`);
    }
  });
});
