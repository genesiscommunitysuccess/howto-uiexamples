# E2E - How to Set Up and Run Tests

This guide provides an overview of setting up and running E2E tests using the tools and practices found within this Genesis application. It also covers configuring your pages and working with fixture files to ensure a clean and maintainable test setup.

---

## Table of Contents

1. [Setup](#setup)
   - [Installing Dependencies](#installing-dependencies)
   - [Project Structure](#project-structure)
2. [E2E Scripts In-Depth](#e2e-scripts-in-depth)
   - [Example Scripts](#example-scripts)
   - [Running E2E Tests](#running-e2e-tests)
   - [Debugging E2E Tests](#debugging-e2e-tests)
   - [Running E2E Tests with UI](#running-e2e-tests-with-ui)
   - [Viewing E2E Test Reports](#viewing-e2e-test-reports)
   - [Watching E2E Tests](#watching-e2e-tests)
3. [Writing Tests](#writing-tests)
   - [Features](#features)
   - [Step Definitions](#step-definitions)
4. [Working with Fixtures](#working-with-fixtures)
   - [Configuring Pages](#configuring-pages)
   - [Using Fixtures](#using-fixtures)
5. [Detailed Examples](#detailed-examples)
   - [Login Test](#login-test)
   - [Authenticated Page Test](#authenticated-page-test)
6. [Environment Variables Setup](#environment-variables-setup)
   - [Using `config` in `package.json`](#1-using-config-in-packagejson)
   - [Using `.env.local` File](#2-using-envlocal-file)
   - [Overriding Environment Variables via Command Line](#3-overriding-environment-variables-via-command-line)
   - [Using Environment Variables in Fixtures and Pages](#4-using-environment-variables-in-fixtures-and-pages)

---

## Setup

### Installing Dependencies

To run the E2E tests, you'll need to install the necessary packages. Based on the codebase, here are the dependencies you should install:

1. **Install Node.js**: Ensure Node.js is installed. This is required for running JavaScript/TypeScript-based tests. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Foundation Testing**:

   ```bash
   npm install --save-dev @genesislcap/foundation-testing
   ```

   - `@genesislcap/foundation-testing`: Provides utilities for testing within your project.
      - Integrates Playwright with Behavior-Driven Development (BDD) tools, enabling the use of Gherkin syntax in tests.

### Project Structure

A typical E2E testing project structure:

```plaintext
e2e/
├── features/
│   ├── example.feature
│   └── another-feature.feature
├── steps/
│   ├── fixtures.ts
│   ├── index.ts
│   └── specific-feature/
│       └── index.ts
├── pages/
│   ├── login-page.ts
│   └── home-page.ts
└── test-config.ts
```

- **features/**: Contains `.feature` files written in Gherkin syntax, describing the tests.
- **steps/**: Contains TypeScript files that define the steps corresponding to the Gherkin steps in the feature files.
- **pages/**: Page Object Models (POMs) encapsulate interactions with different parts of the application.
- **test-config.ts**: Configuration for your testing environment.

---

## E2E Scripts In-Depth

Below is a comprehensive guide on how to use these scripts to run your E2E tests effectively, along with explanations of each script.

### Example Scripts

Here are the key scripts that you can add to your `package.json` for E2E testing:

```json
"scripts": {
    "test:e2e": "npx bddgen && genx test --e2e --watch",
    "test:e2e:report": "npx playwright show-report",
    "test:e2e:debug": "genx test --e2e --debug",
    "test:e2e:ui": "genx test --e2e --interactive",
    "test:e2e:watch:bdd": "npx -y nodemon -w ./test/e2e/features -w ./test/e2e/features/steps -e feature,ts --exec \"npx bddgen\"",
    "test:e2e:watch:pw": "genx test --e2e --interactive",
    "test:e2e:watch": "npx run-p test:e2e:watch:*"
  }
```

### Running E2E Tests

To run all E2E tests in your project, use the following command:

```bash
npm run test:e2e
```

- **What it does**: This script runs all the E2E tests while watching for any changes in the files. The `npx bddgen` command regenerates the BDD files before running the tests, ensuring everything is up-to-date. The tests are then executed using the `genx` tool with the `--e2e` flag.

### Debugging E2E Tests

If you need to debug your E2E tests, use the following command:

```bash
npm run test:e2e:debug
```

- **What it does**: This script runs the E2E tests in debug mode. The `genx test --e2e --debug` command allows you to pause the execution and inspect the state of your application during the tests.

### Running E2E Tests with UI

For an interactive testing experience where you can manually interact with the tests and see them running, use:

```bash
npm run test:e2e:ui
```

- **What it does**: This script runs the E2E tests in interactive mode, where you can see the tests as they are executed and manually control the flow. The `genx test --e2e --interactive` command opens an interface for this purpose.

### Viewing E2E Test Reports

After running your E2E tests, you can view detailed reports by using the following command:

```bash
npm run test:e2e:report
```

- **What it does**: This script uses `npx playwright show-report` to open the Playwright report UI, where you can review the results of your tests in detail.

### Watching E2E Tests

If you want to continuously watch and run your E2E tests whenever there are changes, use:

```bash
npm run test:e2e:watch
```

- **What it does**: This script combines multiple watch commands to monitor changes in your E2E test files and automatically rerun the tests. It includes watching for changes in the feature files and step definitions and regenerating BDD files as needed.

---

## Writing Tests

### Features

Feature files are written in Gherkin syntax, a business-readable, domain-specific language. Each feature file represents a functionality of the application, described in scenarios.

Example (`example.feature`):

```gherkin
Feature: Example Feature

  Scenario: Example scenario
    Given I am on the example page
    When I perform an example action
    Then I should see the expected result
```

### Step Definitions

Step definitions are implemented in TypeScript and correspond to the steps in your feature files. They are written using Playwright and the foundation-testing libraries. Functions are structured as arrow functions.

Example (`steps/example-steps.ts`):

```typescript
import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, When, Then } from '../fixtures';

Given('I am on the example page', async ({ examplePage }) => {
  await examplePage.goto();
});

When('I perform an example action', async ({ examplePage }) => {
  await examplePage.performAction();
});

Then('I should see the expected result', async ({ examplePage }) => {
  const result = await examplePage.getResult();
  expect(result).toBe('Expected Result');
});
```

---

## Working with Fixtures

### Configuring Pages

In an E2E test setup, it's crucial to have a well-organized way of interacting with different parts of your application. This is typically done using Page Object Models (POMs). Each POM represents a page or a significant component of your application and encapsulates all interactions with it.

Example of a page model for a login page (`login-page.ts`):

```typescript
import { Locator, Page } from '@genesislcap/foundation-testing/e2e';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test-id="username"]');
    this.password = page.locator('[data-test-id="password"]');
    this.submitButton = page.locator('[data-test-id="submit-login"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillUsernameAndPassword(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }
}
```

### Using Fixtures

Fixtures in the context of Playwright are a way to set up and maintain context for your tests. They allow you to define common setup and teardown logic that can be reused across your tests.

In the provided codebase, fixtures are configured to provide a consistent testing environment, including setting up pages like `LoginPage` and configuring test settings.

Example fixture setup (`fixtures.ts`):

```typescript
import { Locator, Page } from '@genesislcap/foundation-testing/e2e';
import { test as base } from '@genesislcap/foundation-testing/playwright-bdd';
import { LoginPage } from '../pages/login-page';

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export const { Given, When, Then } = PlaywrightBDD.createBdd(test);
```

In this example:

- `base.extend` is used to extend the default test environment provided by Playwright BDD export from `foundation-testing` package.
- The `loginPage` fixture is defined, which creates an instance of `LoginPage` for each test.
- The `use` function is called to provide the `loginPage` instance to the test.
- The `PlaywrightBDD.createBdd` function is used to create the Gherkin steps (`Given`, `When`, `Then`) that use the fixtures.

---

## Detailed Examples

### Login Test

A common test scenario for login functionality might include both successful and unsuccessful login attempts.

**Feature File:**

```gherkin
Feature: Login

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to the home page

  Scenario: Unsuccessful login
    Given I am on the login page
    When I enter invalid credentials
    Then I should see an error message
```

**Step Definitions:**

```typescript
import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, When, Then } from '../fixtures';

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.goto();
});

When('I enter valid credentials', async ({ loginPage }) => {
  await loginPage.fillUsernameAndPassword('user', 'password');
});

Then('I should be redirected to the home page', async ({ loginPage }) => {
  await expect(loginPage.page).toHaveURL('/home');
});
```

### Authenticated Page Test

This test ensures that authenticated users can access the home page.

**Feature File:**

```gherkin
Feature: Authenticated Home Page

  Scenario: Accessing the home page
    Given I am logged in
    When I navigate to the home page
    Then I should see the home page content
```

**Step Definitions:**

```typescript
import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, When, Then } from '../fixtures';

Given('I am logged in', async ({ loginPage }) => {
  await loginPage.login('user', 'password');
});

When('I navigate to the home page', async ({ homePage }) => {
  await homePage.goto();
});

Then('I should see the home page content', async ({ homePage }) => {
  await expect(homePage.isContentVisible()).toBeTruthy();
});
```

### Environment Variables Setup

Proper environment configuration is crucial for ensuring that your end-to-end (E2E) tests run smoothly across different environments. This section outlines different methods for setting environment variables that can be accessed within your fixture and page setup.

---

#### 1. Using `config` in `package.json`

Your `package.json` includes a `config` section that can be used to define environment variables:

```json
"config": {
    "API_HOST": "ws://localhost:9064",
    "PORT": 6060,
    "ENABLE_SSO": false
}
```

These variables can be accessed in your TS/JS files as follows:

```javascript
const apiHost = process.env.npm_package_config_API_HOST;
const port = process.env.npm_package_config_PORT;
const enableSSO = process.env.npm_package_config_ENABLE_SSO;
```

These can be utilized in your test setup, for example, within your fixture or page setup:

```typescript
export const test = base.extend({
  config: async ({}, use) => {
    const config = {
      API_HOST: process.env.npm_package_config_API_HOST,
      PORT: process.env.npm_package_config_PORT,
      ENABLE_SSO: process.env.npm_package_config_ENABLE_SSO,
    };
    await use(config);
  },
});
```

#### 2. Using `.env.local` File

Your `.env.local` file at the root of your project contains sensitive environment variables like `DEFAULT_USER` and `DEFAULT_PASSWORD`. These variables can be loaded using a package like `dotenv`.

`genx` automatically loads environment variables from `.env.local` (or `.env`) when running tests. To access these variables in your test setup, follow these steps:

1. **Load the variables in your test setup**:

   ```typescript
   export const test = base.extend({
     config: async ({}, use) => {
       const config = {
         DEFAULT_USER: process.env.DEFAULT_USER,
         DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
       };
       await use(config);
     },
   });
   ```

   With this setup, your test environment will have access to the variables defined in `.env.local`, allowing you to easily configure user credentials and other sensitive data.

#### 3. Overriding Environment Variables via Command Line

Sometimes, you may need to override certain environment variables for specific test runs. This can be done directly via the command line:

```bash
genx test -e API_HOST=ws://localhost:9064,DEFAULT_USER=testuser --e2e
```

This approach temporarily sets `API_HOST` and `DEFAULT_USER` for that specific test run, overriding the values defined in `package.json` or `.env.local`.

#### 4. Using Environment Variables in Fixtures and Pages

After setting up your environment variables through any of the above methods, you can easily access them in your fixtures or page models.

Example of using environment variables in a fixture:

```typescript
export const test = base.extend({
  loginPage: async ({ page, config }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameAndPassword(
      process.env.DEFAULT_USER || config.DEFAULT_USER,
      process.env.DEFAULT_PASSWORD || config.DEFAULT_PASSWORD
    );
    await use(loginPage);
  },
});
```
