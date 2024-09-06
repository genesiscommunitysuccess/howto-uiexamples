# How to Set Up and Run Unit Tests

This guide provides an overview of setting up and running unit tests using the tools and practices found within this Genesis application.
It also covers configuring your pages and working with fixture files to ensure a clean and maintainable test setup.

---

## Table of Contents

1.  [Setup](#setup)
    - [Installing Dependencies](#installing-dependencies)
    - [Project Structure](#project-structure)
2. [Unit Testing Scripts In-Depth](#unit-testing-scripts-in-depth)
    - [Example Scripts](#example-scripts)
    - [Running Unit Tests](#running-unit-tests)
    - [Debugging Unit Tests](#debugging-unit-tests)
    - [Watching Unit Tests](#watching-unit-tests)
3. [Writing Tests](#writing-tests)
    - [Suites](#suites)
    - [Unit Tests](#unit-tests)
4. [Detailed Examples](#detailed-examples)
    - [Testing Components](#testing-components)
    - [Testing Logic](#testing-logic)

---

## Setup

### Installing Dependencies

To run the unit tests, you'll need to install the necessary packages. Based on the codebase, here are the dependencies you should install:

1. **Install Node.js**: Ensure Node.js is installed. This is required for running JavaScript/TypeScript-based tests. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Foundation Testing**:

   ```bash
   npm install --save-dev @genesislcap/foundation-testing
   ```

  - `@genesislcap/foundation-testing`: Provides utilities for testing within your project.
    - Use UVU to write unit test suites.
    - Use sinon.js if you need test spies, stubs or mocks

### Project Structure

A typical unit testing project structure:

```plaintext
test/
├── unit/
│   ├── home-page.ts
│   └── utils.ts
```

- **unit/**: Contains unit test suites, usually one file per route or component and additional ones for utility functions etc

---

## Unit Testing Scripts In-Depth

Below is a comprehensive guide on how to use these scripts to run your unit tests effectively, along with explanations of each script.

### Example Scripts

Here are the key scripts that you can add to your `package.json` for unit testing:

```json
"scripts": {
    "test": "genx test",
    "test:debug": "genx test --debug --browser",
}
```

### Running Unit Tests

To run all unit tests in your project, use the following command:

```bash
npm run test
```

- **What it does**: This script runs all the unit tests. The tests are executed using the `genx` tool.

### Debugging Unit Tests

If you need to debug your unit tests, use the following command:

```bash
npm run test:debug
```

- **What it does**: This script runs the unit tests in debug mode, in a browser. The `genx test --debug --browser` command allows you to pause the execution and inspect the state of your application during the tests.

### Watching Unit Tests

If you want to continuously watch and run your unit tests whenever there are changes, use:

```bash
npm run test:unit:watch
```

- **What it does**: This script combines multiple watch commands to monitor changes in your unit test files and automatically rerun the tests.

---

## Writing Tests

### Suites

Test suites are a good way to keep your unit tests organized.
Ideally you want to have a test suite for each page or a significant component of your application.
Test suites can also be used to test arbitrary utility or helper functions.

### Unit tests

Each test suite can contain as many unit tests as you want.
Test tests are implemented in TypeScript using UVU and the foundation-testing libraries.
Functions are structured as arrow functions.

Example (`unit/example.test.ts`):

```typescript
import {Example} from '../../src/routes/example/example'
import {assert, createComponentSuite} from "@genesislcap/foundation-testing";

Example;  // reference to avoid tree shaking.

const Suite = createComponentSuite<Example>('Example', 'example-route');

Suite('Can be created in the DOM', async ({element}) => {
  assert.ok(element);
});

Suite.run();
```

## Detailed Examples

### Testing Components

You can use the `createComponentSuite` utility provided by `@genesislcap/foundation-testing` to easily create a test suite for your component. 
Apart from setting up and tearing down your element fixture with a wrapping design system and DI container, this util also allows you to provide DI container mocks, which are required for certain testing flows.

Example (`list-item.test.ts`):

In the below example for our `ListItems` (`list-items-container`) component, we are testing that:
 - It can be created in the DOM.
 - It displays a list item for every row in our mock data.
 - We can navigate to a "details" view by clicking on a list item

Note that we have provided a partial mock of the `Connect` service so that snapshots return our mock data during the tests.

```typescript
import {assert, createComponentSuite, Registration} from "@genesislcap/foundation-testing";
import {Connect, Message} from "@genesislcap/foundation-comms";
import {DOM} from "@genesislcap/web-core";
import {ListItems} from "../../src/routes/list-items/list-items";

ListItems; // reference to avoid tree shaking.

const rowData = [...];

const mockData = {
  "ROWS_COUNT": 100,
  "MESSAGE_TYPE": "QUERY_UPDATE",
  "ROW": rowData,
  "MORE_ROWS": false,
  "SOURCE_REF": "f5ebbfcd-7753-41d0-a1ec-eda8ffc307a3",
  "SEQUENCE_ID": 1
}

// partial mock of the Connect service so that snapshots return our mock data during these tests
const connectMock = {
  snapshot: (): Promise<Message> => Promise.resolve(mockData)
};

const mocks = [
  Registration.instance(Connect, connectMock),
];

const Suite = createComponentSuite<ListItems>('ListItems', 'list-items-container', undefined, mocks);

Suite('Can be created in the DOM.', async ({element}) => {
  assert.ok(element);
});

Suite('Displays a list item for every row.', async ({element}) => {
  await DOM.nextUpdate();
  const content = element.shadowRoot?.querySelector('div.content');
  const listItems = content.querySelectorAll('div.list-item');
  assert.equal(listItems.length, element.entities.length);
});

Suite('Can navigate to details from a list item', async ({element}) => {
  await DOM.nextUpdate();
  const content = element.shadowRoot?.querySelector('div.content');
  const firstListItem = content.querySelectorAll('div.list-item')[0];
  const anchor = firstListItem.querySelector('rapid-anchor');
  assert.ok(anchor);
  await (anchor as HTMLElement)?.click();
  assert.equal(window?.location?.pathname, `/list-item-detail/${element.entities[0].TRADE_ID}`);
});

Suite.run();
```

### Testing Logic

You can use the `createLogicSuite` utility provided by `@genesislcap/foundation-testing` to test function output given certain input arguments.

Example (`utils.test.ts`):

In the below example we are testing that our `timeOfDay` utility function returns the correct time of day for any input hour and returns `null` for invalid input arguments.

```typescript
import {createLogicSuite} from "@genesislcap/foundation-testing";
import {timeOfDay} from "../../src/utils/util";

const timeOfDaySuite = createLogicSuite('timeOfDay');

timeOfDaySuite('timeOfDay should return the correct time of day', ({runCases}) => {
  runCases(timeOfDay, [
    [[0], 'night'],
    [[5], 'night'],
    [[6], 'morning'],
    [[11], 'morning'],
    [[12], 'afternoon'],
    [[16], 'afternoon'],
    [[17], 'evening'],
    [[20], 'evening'],
    [[21], 'night'],
    [[24], 'night'],
    [[25], null],
    [[-1], null],
    [[false], null],
    [['banana'], null],
    [[{foo: 'bar'}], null],
    [[[1, 2, 3]], null],
  ]);
});
timeOfDaySuite.run();
```
