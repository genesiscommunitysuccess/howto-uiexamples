import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: Page Title

Given("001 - I start my Ui Examples web application", async ({ loginPage}) => {
  await loginPage.goto();
});

When("001 - The login page loads", async ({ loginPage }) => {
  await loginPage.page.waitForURL('**/login');
});

Then("001 - I see in title {string}", async ({ loginPage }, text: string) => {
  await expect(loginPage.page).toHaveTitle(new RegExp(text));
});
