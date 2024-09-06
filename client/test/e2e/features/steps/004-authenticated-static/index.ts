import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: Check Static Page

Given('004 - I am already logged in', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When('004 - At the static page', async ({ authenticatedPage }) => {
  authenticatedPage.staticNavButton.click();
  await authenticatedPage.page.waitForURL('**/static');
  await expect(authenticatedPage.page).toHaveURL('/static');
});

Then('004 - I see the static page contents', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.staticPageContent).toBeVisible();
});

