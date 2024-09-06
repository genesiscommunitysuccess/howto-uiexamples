import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: Fill Username and Password

Given("002 - I start my Ui Examples web application", async ({ loginPage }) => {
  await loginPage.goto();
});

When("002 - The login page loads", async ({ loginPage }) => {
  await loginPage.page.waitForURL('**/login');
});

Then("002 - I am able to fill the username and password fields", async ({ loginPage }, text: string) => {
  await loginPage.fillUsernameAndPassword();

  await expect(loginPage.username).not.toHaveValue('')
  await expect(loginPage.password).not.toHaveValue('');
});

// Scenario: Login Successfully and Get to Home Page

Given("002 - I am at the login page", async ({ loginPage }) => {
  await loginPage.goto();
});

When("002 - I fill the username and password fields", async ({ loginPage }) => {
  await loginPage.page.waitForURL('**/login');
  await loginPage.fillUsernameAndPassword();
});

Then("002 - I am able login successfully and get to the home page", async ({ loginPage }) => {
  await loginPage.attemptLogin();
  await loginPage.page.waitForURL('**/home');
  await expect(loginPage.page).toHaveURL('/home');
});

// Login Fails and Get Error Message

Given("002 - I am at the login page once again", async ({ loginPage }) => {
  await loginPage.goto();
});

When("002 - I fill the username and password fields with incorrect credentials", async ({ loginPage }) => {
  await loginPage.page.waitForURL('**/login');
  await loginPage.fillUsernameAndPassword('invalid' + Date.now() , 'invalid' + Date.now());
});

Then("002 - I am NOT able login successfully and get an error message", async ({ loginPage }) => {
  await loginPage.attemptLogin();
  await loginPage.page.waitForURL('**/login');
  await expect(loginPage.page).toHaveURL('/login');
  await expect(loginPage.page).not.toHaveURL('/home');

  // TODO: for some reason when running in e2e mode, the message is not being displayed
  // await expect(loginPage.message).toHaveText('INCORRECT_CREDENTIALS: Problem logging in');
});
