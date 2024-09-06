import { expect } from '@genesislcap/foundation-testing/e2e';
import { Before, Given, Then, When } from '../fixtures';

Before({ tags: '@auth' }, async ({ loginPage }) => {
  await loginPage.fillUsernameAndPassword();
  await loginPage.attemptLogin();
  await loginPage.page.waitForURL('**/home');
  await expect(loginPage.page).toHaveURL('/home');
})

// Scenario: Open Modal

Given('009 - I am at the modals page', async ({ authenticatedPage }) => {
  await authenticatedPage.modalsPageSeeAppButton.click();
  await authenticatedPage.page.waitForURL('**/modal-how-to');
  await expect(authenticatedPage.page).toHaveURL('/modal-how-to');
  await expect(authenticatedPage.modalsPageModalBasic).not.toBeVisible();
});

When('009 - I click on Open Modal button', async ({ authenticatedPage }) => {
  await authenticatedPage.modalsPageModalBasicOpenButton.click();
});

Then('009 - I see the modal and can close it', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.modalsPageModalBasic).toBeVisible();
  await authenticatedPage.modalsPageModalBasicCloseButton.click();
  await expect(authenticatedPage.modalsPageModalBasic).not.toBeVisible();
});

// Scenario: Open Form Modal

Given('009 - I am at the modals page 2', async ({ authenticatedPage }) => {
  await authenticatedPage.modalsPageSeeAppButton.click();
  await authenticatedPage.page.waitForURL('**/modal-how-to');
  await expect(authenticatedPage.page).toHaveURL('/modal-how-to');
  await expect(authenticatedPage.modalsPageModalForm).not.toBeVisible();
});

When('009 - I click on Open Form Modal button', async ({ authenticatedPage }) => {
  await authenticatedPage.modalsPageModalFormButton.click();
});

Then('009 - I see the modal with form and can close it 2', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.modalsPageModalForm).toBeVisible();
  await authenticatedPage.modalsPageModalFormCloseButton.click();
  await expect(authenticatedPage.modalsPageModalForm).not.toBeVisible();
});

// Scenario: Open Left Position Modal

Given('009 - I am at the modals page 3', async ({ authenticatedPage }) => {
  await authenticatedPage.modalsPageSeeAppButton.click();
  await authenticatedPage.page.waitForURL('**/modal-how-to');
  await expect(authenticatedPage.page).toHaveURL('/modal-how-to');
  await expect(authenticatedPage.modalsPageModalLeft).not.toBeVisible();
});

When('009 - I click on Open Left Position Modal button', async ({ authenticatedPage }) => {
  await authenticatedPage.modalsPageModalLeftButton.click();
});

Then('009 - I see the modal with left position and can close it', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.modalsPageModalLeft).toBeVisible();
  await authenticatedPage.modalsPageModalLeftCloseButton.click();
  await expect(authenticatedPage.modalsPageModalLeft).not.toBeVisible();
});
