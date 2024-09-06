import { configDefaults } from '@genesislcap/foundation-testing/e2e';
import { PlaywrightBDD } from '@genesislcap/foundation-testing/playwright-bdd';

const testDir = PlaywrightBDD.defineBddConfig({
  features: 'test/e2e/features/*.feature',
  steps: 'test/e2e/features/steps/**/*.ts',
});

export default {
  ...configDefaults,
  testMatch: undefined,
  testDir,
  reporter: 'html',
  workers: 2,
};
