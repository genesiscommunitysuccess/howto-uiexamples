# E2E Testing

## Overview

The foundation-testing package is a comprehensive framework for implementing End-to-End (E2E) testing. use it to ensure that your Genesis Web Application provides a seamless user experience by testing workflows and user interactions across various scenarios.

---

## Key tools and features
- **Customizable E2E scenarios**: Manage and create detailed test scenarios within the **tests/e2e** folder, focusing on critical user journeys. These scenarios are fully customizable by default, allowing for comprehensive coverage of different user paths and interactions.
- **Playwright integration**: Use Playwright to automate browser actions, simulate user interactions, and verify that your application behaves as expected across different browsers. Playwright supports cross-browser testing, parallel test execution, and context isolation, allowing for robust and scalable E2E tests. Playwright can capture videos, screenshots, and other artifacts when a test fails, aiding in debugging and issue resolution.
- **Lighthouse performance testing**: Integrate Lighthouse to measure and improve the performance, accessibility, SEO, and overall quality of your web applications. Use Lighthouse reports to track key performance metrics, such as load time, interactivity, and visual stability, and enforce performance budgets to maintain a high standard for user experience.
- **Automated testing pipeline**: Integrate your E2E tests into a continuous integration (CI) pipeline, ensuring that every change to the codebase is thoroughly tested before deployment. This automation reduces the risk of bugs and ensures consistent test outcomes across different environments.

---

## Getting started with E2E testing

1. **Creating and running E2E Tests**:
  - Define test scenarios in the **tests/e2e** folder, targeting critical user journeys and application functionalities.
  - Use Playwright for browser automation and Lighthouse for performance auditing within the same test suite.
  - Execute tests via your preferred test runner or CI pipeline, ensuring reliable and consistent outcomes.
2. **Using Playwright**:
  - Install and configure Playwright as part of your project dependencies. Follow the set-up guide provided by the foundation-testing package.
  - Write and run tests using the Playwright API to simulate real-world user interactions. These include clicking buttons, filling in forms, and navigating from page to page.
3. **Incorporating Lighthouse**:
  - Integrate Lighthouse into your E2E tests to run performance audits alongside functional tests.
  - Use the insights from Lighthouse reports to identify and address performance issues, optimizing your application for speed and user experience.
4. **Advanced features**:
  - **BDD Testing**: Write behavior-driven tests using `playwright-bdd`, making it easier to define test scenarios and expectations in a human-readable format.
  - **Cross-Browser Testing**: Use the Playwright cross-browser support to ensure your application works seamlessly across different browsers, including Chrome, Firefox, and WebKit.
  - **Visual Testing**: Use the Playwrights screenshot and visual comparison features to validate the consistency of your UI across different devices and resolutions.
  - **Performance Budgets**: Set performance thresholds using Lighthouse to maintain high performance standards, ensuring metrics like Time to Interactive (TTI) and First Contentful Paint (FCP) stay within acceptable limits.

---

## Resources and further documentation

- [foundation-testing](https://github.com/genesislcap/foundation-ui/tree/master/packages/foundation/foundation-testing)
- [Playwright Documentation](https://playwright.dev/)
- [playwright-bdd](https://github.com/vitalets/playwright-bdd)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse) 
