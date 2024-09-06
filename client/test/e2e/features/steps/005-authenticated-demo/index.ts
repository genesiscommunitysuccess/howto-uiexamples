import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: Check Demo Page

Given('005 - I am already logged in', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When('005 - At the demo page', async ({ authenticatedPage }) => {
  authenticatedPage.demoNavButton.click();
  await authenticatedPage.page.waitForURL('**/demo');
  await expect(authenticatedPage.page).toHaveURL('/demo');
});

Then('005 - I see the demo page contents', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.demoPageContent).toBeVisible();
});
