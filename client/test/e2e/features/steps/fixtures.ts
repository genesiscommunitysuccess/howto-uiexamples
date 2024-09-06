import { Locator, Page } from '@genesislcap/foundation-testing/e2e';
import { PlaywrightBDD, test as base } from '@genesislcap/foundation-testing/playwright-bdd';

const { config: pkgConfig } = require('../../../../package.json');

export type FixtureConfig = {
  API_HOST: string;
  DEFAULT_USER: string;
  DEFAULT_PASSWORD: string;
  PORT: number;
};

export type Fixture = {
  config: FixtureConfig;
  loginPage: LoginPage;
};

export class LoginPage {
  config: FixtureConfig;
  page: Page;

  username: Locator;
  password: Locator;
  showPassword: Locator;
  submitLogin: Locator;
  forgotPassword: Locator;
  resetPassword: Locator;
  requestAccount: Locator;

  message: Locator;

  constructor(config: FixtureConfig, page: Page) {
    this.config = config;
    this.page = page;

    // Locators
    this.username = this.page.locator('data-test-id=username').locator('input');
    this.password = this.page.locator('data-test-id=password').locator('input');
    this.showPassword = this.page.locator('data-test-id=show-password');
    this.submitLogin = this.page.locator('data-test-id=submit-login').locator('button');

    this.forgotPassword = this.page.locator('data-test-id=forgot-password');
    this.resetPassword = this.page.locator('data-test-id=reset-password');
    this.requestAccount = this.page.locator('data-test-id=request-account');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillUsernameAndPassword(
    username: string | undefined = this.config.DEFAULT_USER || process.env.DEFAULT_USER,
    password: string | undefined = this.config.DEFAULT_PASSWORD || process.env.DEFAULT_PASSWORD,
  ) {
    await this.username.fill(username ?? '');
    await this.password.fill(password ?? '');
  }

  async attemptLogin() {
    await this.submitLogin.click();
  }

  async getMessage() {
    return (this.message = this.page.locator('data-test-id=message'));
  }
}

export class AuthenticatedPage {
  config: FixtureConfig;
  page: Page;

  navItems: Locator;
  homeNavButton: Locator;
  homeTitle: Locator;
  contentCards: Locator;
  firstCard: Locator;
  secondCard: Locator;
  thirdCard: Locator;
  fourthCard: Locator;
  fifthCard: Locator;

  staticNavButton: Locator;
  staticPageContent: Locator;

  demoNavButton: Locator;
  demoPageContent: Locator;

  usersNavButton: Locator;
  usersPageContent: Locator;

  profilesNavButton: Locator;
  profilesPageContent: Locator;

  modalsPageSeeAppButton: Locator;
  modalsPageContent: Locator;
  modalsPageModalBasicOpenButton: Locator;
  modalsPageModalBasic: Locator;
  modalsPageModalBasicCloseButton: Locator;

  modalsPageModalFormButton: Locator;
  modalsPageModalForm: Locator;
  modalsPageModalFormCloseButton: Locator;

  modalsPageModalLeftButton: Locator;
  modalsPageModalLeft: Locator;
  modalsPageModalLeftCloseButton: Locator

  constructor(config: FixtureConfig, page: Page) {
    this.config = config;
    this.page = page;

    // Locators
    this.navItems = this.page.locator('data-test-id=hamburger-menu');

    this.homeNavButton = this.page.locator('data-test-id=home-button');
    this.homeTitle = this.page.locator('data-test-id=home-title');
    this.contentCards = this.page.locator('data-test-id=content-cards');
    this.firstCard = this.page.locator('data-test-id=template-switch-statement-with-foundation-web-card');
    this.secondCard = this.page.locator('data-test-id=foundation-layout-example-card');
    this.thirdCard = this.page.locator('data-test-id=list-items-and-detail-view-card');
    this.fourthCard = this.page.locator('data-test-id=two-way-binding-card');
    this.fifthCard = this.page.locator('data-test-id=modals-card');

    this.staticNavButton = this.page.locator('data-test-id=static-button');
    this.staticPageContent = this.page.locator('data-test-id=static-page');

    this.demoNavButton = this.page.locator('data-test-id=demo-button');
    this.demoPageContent = this.page.locator('data-test-id=demo-page');

    this.usersNavButton = this.page.locator('data-test-id=users-button');
    this.usersPageContent = this.page.locator('user-management-pbc');

    this.profilesNavButton = this.page.locator('data-test-id=profiles-button');
    this.profilesPageContent = this.page.locator('profile-management-pbc');

    this.modalsPageSeeAppButton = this.page.locator('data-test-id=modals-see-app');
    this.modalsPageContent = this.page.locator('modal-how-to');

    this.modalsPageModalBasicOpenButton = this.page.locator('data-test-id=modal-basic-button');
    this.modalsPageModalBasic = this.page.locator('data-test-id=modal-basic').locator('dialog');
    this.modalsPageModalBasicCloseButton = this.page.locator('data-test-id=modal-basic').locator('.close-icon') 

    this.modalsPageModalFormButton = this.page.locator('data-test-id=modal-form-button');
    this.modalsPageModalForm = this.page.locator('data-test-id=modal-form').locator('dialog');
    this.modalsPageModalFormCloseButton = this.page.locator('data-test-id=modal-form').locator('.submit-button');

    this.modalsPageModalLeftButton = this.page.locator('data-test-id=modal-left-button');
    this.modalsPageModalLeft = this.page.locator('data-test-id=modal-left').locator('dialog');
    this.modalsPageModalLeftCloseButton = this.page.locator('data-test-id=modal-left').locator('.close-icon');
  }

  async goto(page: string = '/home') {
    await this.page.goto(page);
  }
}

export const test = base.extend<Fixture>({
  config: [pkgConfig, { option: true }],
  loginPage: async ({ config, page }, use) => {
    const loginPage = new LoginPage(config, page);
    await loginPage.goto();
    await use(loginPage);
  },
  authenticatedPage: async ({ config, page }, use) => {
    const authenticatedPage = new AuthenticatedPage(config, page);
    await authenticatedPage.goto();
    await use(authenticatedPage);
  },
});

export const {Before, Given, When, Then } = PlaywrightBDD.createBdd(test);
