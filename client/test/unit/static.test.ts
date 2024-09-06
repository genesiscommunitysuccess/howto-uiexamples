import {Static} from '../../src/routes/static/static'
import {assert, createComponentSuite} from "@genesislcap/foundation-testing";

Static;  // reference to avoid tree shaking.

const Suite = createComponentSuite<Static>('Static', 'static-route');

Suite('Can be created in the DOM', async ({element}) => {
  assert.ok(element);
});

Suite('Contains static-entities-manager', async ({element}) => {
  assert.ok(element.shadowRoot?.querySelector('static-entities-manager'));
});

Suite('static-entities-manager is in layout-item titled Entities', async ({element}) => {
  const em = element.shadowRoot?.querySelector('static-entities-manager');
  assert.ok(em);
  assert.equal(em.parentElement.getAttribute('title'), 'Entities');
});

Suite('Contains static-clients-manager', async ({element}) => {
  assert.ok(element.shadowRoot?.querySelector('static-clients-manager'));
});

Suite('static-clients-manager is in layout-item titled Clients', async ({element}) => {
  const cm = element.shadowRoot?.querySelector('static-clients-manager');
  assert.ok(cm);
  assert.equal(cm.parentElement.getAttribute('title'), 'Clients');
});

Suite.run();
