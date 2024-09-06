import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: Check Users Page

Given('006 - I am already logged in', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When('006 - At the users page', async ({ authenticatedPage }) => {
  authenticatedPage.usersNavButton.click();
  await authenticatedPage.page.waitForURL('**/users');
  await expect(authenticatedPage.page).toHaveURL('/users');
});

Then('006 - I see the users page contents', async ({ authenticatedPage }) => {
  const usersPbcElementCount = await authenticatedPage.usersPageContent.count();
  await expect(usersPbcElementCount).toBeGreaterThan(0);
  await expect(usersPbcElementCount).toEqual(1);
});
