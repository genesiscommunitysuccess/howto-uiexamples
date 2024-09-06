import { expect } from '@genesislcap/foundation-testing/e2e';
import { Given, Then, When } from '../fixtures';

// Scenario: Check Modals Page

Given('008 - I am already logged in', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
});

When('008 - At the modals page', async ({ authenticatedPage }) => {
  await authenticatedPage.modalsPageSeeAppButton.click();
  await authenticatedPage.page.waitForURL('**/modal-how-to');
  await expect(authenticatedPage.page).toHaveURL('/modal-how-to');
});

Then('008 - I see the available modal openeners', async ({ authenticatedPage }) => {
  const modalsPageContent = await authenticatedPage.modalsPageContent.count();
  await expect(modalsPageContent).toBeGreaterThan(0);
  await expect(modalsPageContent).toEqual(1);
});
