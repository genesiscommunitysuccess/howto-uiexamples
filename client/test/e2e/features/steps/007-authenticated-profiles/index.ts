import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: Check Profiles Page

Given('007 - I am already logged in', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When('007 - At the profiles page', async ({ authenticatedPage }) => {
  authenticatedPage.profilesNavButton.click();
  await authenticatedPage.page.waitForURL('**/profiles');
  await expect(authenticatedPage.page).toHaveURL('/profiles');
});

Then('007 - I see the profiles page contents', async ({ authenticatedPage }) => {
  const profilesPbcElementCount = await authenticatedPage.profilesPageContent.count();
  await expect(profilesPbcElementCount).toBeGreaterThan(0);
  await expect(profilesPbcElementCount).toEqual(1);
});
