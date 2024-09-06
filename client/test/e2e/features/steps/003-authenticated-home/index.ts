import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: See Home Page Navigation

Given("003 - I am logged in", async ({ loginPage}) => {
  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When("003 - The home page loads", async ({ authenticatedPage }) => {
  await authenticatedPage.page.waitForURL('**/home');
  await expect(authenticatedPage.page).toHaveURL('/home');
});

Then("003 - I see the home page navigation items", async ({ authenticatedPage }) => {
  await expect(authenticatedPage.navItems).toBeVisible();
});

// Scenario: Login Successfully and Get to Home Title

Given("003 - I am already logged in", async ({ loginPage }) => {
  // await authenticatedPage.goto();
  // TODO: serial mode not working?? The stuff below is temporary

  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When("003 - At the home page", async ({ authenticatedPage }) => {
  await authenticatedPage.page.waitForURL('**/home');
  await expect(authenticatedPage.page).toHaveURL('/home');
});

Then("003 - I see the home page title", async ({ authenticatedPage }) => {
  await expect(authenticatedPage.homeTitle).toHaveText('Genesis Playground');
});

// Scenario: Check Home Page Contents

Given("003 - I am already logged in - 2", async ({ loginPage }) => {
  // await authenticatedPage.goto();
  // TODO: serial mode not working?? The stuff below is temporary

  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When("003 - At the home page - 2", async ({ authenticatedPage }) => {
  await authenticatedPage.page.waitForURL('**/home');
  await expect(authenticatedPage.page).toHaveURL('/home');
});

Then("003 - I see the home page contents", async ({ authenticatedPage }) => {
  await expect(authenticatedPage.contentCards).toBeVisible();
  await expect(authenticatedPage.firstCard).toContainText('Template switch statement with foundation web');
  await expect(authenticatedPage.secondCard).toContainText('Foundation layout example');
  await expect(authenticatedPage.thirdCard).toContainText('List items and detail view');
  await expect(authenticatedPage.fourthCard).toContainText('Two Way Binding');
  await expect(authenticatedPage.fifthCard).toContainText('Modals');
});
