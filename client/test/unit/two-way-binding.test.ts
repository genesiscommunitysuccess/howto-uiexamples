import {assert, createComponentSuite} from "@genesislcap/foundation-testing";
import {TwoWayBinding} from "../../src/routes/two-way-binding/two-way-binding";
import {DOM} from "@genesislcap/web-core";

TwoWayBinding;  // reference to avoid tree shaking.

const Suite = createComponentSuite<TwoWayBinding>('TwoWayBinding', 'two-way-binding');

Suite('Can be created in the DOM', async ({element}) => {
  assert.ok(element.shadowRoot);
});

Suite('Contains correct title', async ({element}) => {
  const title = element.shadowRoot.querySelector('h1');
  assert.equal(title.textContent, 'Two-way binding example');
});

Suite('Contains card container', async ({element}) => {
  const cardContainer = element.shadowRoot.querySelector('div.two-way-binding-container');
  assert.ok(cardContainer);
});

Suite('Contains correct number of cards inside card container', async ({element}) => {
  const cardContainer = element.shadowRoot.querySelector('div.two-way-binding-container');
  assert.ok(cardContainer);
  const cards = cardContainer.querySelectorAll('two-way-binding-card');
  assert.ok(cards);
  assert.equal(cards.length, element.items.length);
});

Suite('Card has an Edit button and it opens the form when clicked.', async ({element}) => {
  const firstCard = element.shadowRoot.querySelectorAll('two-way-binding-card')[0];
  assert.ok(firstCard);
  const editButton = firstCard.shadowRoot.querySelector('rapid-button');
  assert.equal(editButton.textContent, 'Edit');
  await (editButton as HTMLElement).click();
  await DOM.nextUpdate();
  const form = firstCard.shadowRoot.querySelector('two-way-binding-form');
  assert.ok(form);
});

Suite.run();
