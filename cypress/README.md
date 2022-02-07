
Cypress

======



## Quickstart



Install Cypress by running

```

npm run cy:install

```



Open Cypress GUI

```

npm run cy:open

```



Run Cypress tests headlessly

```

npm run cy:run

```



### Environment variables



For documentation visit [Link co Cypress Docs -> Environment variables](https://docs.cypress.io/guides/guides/environment-variables.html#Setting)



1. We store credentials in `./fixtures/credentials.json`
	This JSON object is then loaded into Cypress.env() on framework configuration in: `cypress/plugins/index.ts`



2. To inject environment variables from the CLI/CI you need to prefix `CYPRESS_`
	```

	CYPRESS_USERNAME="dnanexus_username" CYPRESS_PASSWORD="dnanexus_password" npm run cy:open

	```



3. It's also possible to have them saved in `Cypress.evn.json` without the `CYPRESS_` prefix
	```
	{
		"myUserName": {
			"username": "myUserName",
			"password": "password"
		}
	}
	```

4. For running or opening cypress on different url's you can pass the `--env baseUrl=urlKeyFromCypressEnvJson` eg. `cypress run --env baseUrl=storyBook`
	If you are using different localhost address than `http://localhost.dnanexus.com:3000` set your specific URL in cypress.env.json



### Selectors



cy.get(), cy.find() and cy.contains() are overriden to automatically search for `data-test-id` attributes when the selector parameter starts with `UIT_`.

These overrides can be found in `support/commands.ts`



eg.

`cy.get(TC.MODAL_CONTAINER)` or `cy.get('UIT_modal_container)` will search for `cy.get('[data-test-id="UIT_modal_container"]')`



Therefore it is *important* to keep this naming convention.




Element locators are defined in two places:

1. pannexin/src/konstants/testing-constants.json

2. dxbase/konstants/testing-constants.json



### Custom commands



For custom commands there should be a few `rules of thumb` we want to follow:

1. Try to write custtom commands with YAGNI (You Aren't Gonna Need It) in mind -> don't write them for something you might but also might not need in the future

2. For repeatable behavior specific to only a single spec file it’s more efficient to write a function instead a custom command

3. Don't overcomplicate things - there's no need to add unnecessary level of complexity by wrapping only a couple of commands



For more info refer to Cypress Best Practices: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html

And Custom Commands documentation page: https://docs.cypress.io/api/cypress-api/custom-commands.html#Best-Practices



### UI tests Migration note



Old Selenium/Behave tests were fully migrated to Cypress on Jul, 16th 2021.
The reference to old test environment is available here: https://github.com/dnanexus/pannexin/tree/14a2a2df9ce69a6bc50341a1b75575edbcf23875/test/UI



### Legacy Cohort Browser tests archival note



Legacy Cohort Browser tests were removed from the test suite on Nov, 10th 2021.
The reference to Legacy Cohort Browser tests is available here: https://github.com/dnanexus/pannexin/tree/cf1e89cc8076cf2b1b4d1fb45ae1e99349eea3c0/cypress/integration/cohortBrowser
