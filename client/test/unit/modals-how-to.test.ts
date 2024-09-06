import { assert, createComponentSuite, Registration, sinon } from '@genesislcap/foundation-testing';
import { Connect, Message } from "@genesislcap/foundation-comms";
import { ModalHowTo } from '../../src/routes/modal-how-to/modal-how-to';

ModalHowTo; // reference to avoid tree shaking.

const rowData = [
  {
    "ENTITY_NAME": "First entity",
  },
  {
    "ENTITY_NAME": "Second entity",
  },
  {
    "ENTITY_NAME": "Third entity",
  },
];

const mockData = {
  "ROWS_COUNT": 3,
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

const Suite = createComponentSuite<ModalHowTo>('ModalHowTo', 'modal-how-to', undefined, mocks);

Suite('Can be created in the DOM.', async ({element}) => {
  assert.ok(element);
});

Suite('assert basic modal opened', async ({element}) => {
  element.modal = {
    show: sinon.spy()
  } as any;
  const button = element.shadowRoot.querySelector('[data-test-id="modal-basic-button"]');
  button.click();
  sinon.assert.called(element.modal.show);
});

Suite('assert form modal opened', async ({element}) => {
  element.modalWithForm = {
    show: sinon.spy()
  } as any;
  const button = element.shadowRoot.querySelector('[data-test-id="modal-form-button"]');
  button.click();
  sinon.assert.called(element.modalWithForm.show);
});

Suite('assert left modal opened', async ({element}) => {
  element.modalLeft = {
    show: sinon.spy()
  } as any;
  const button = element.shadowRoot.querySelector('[data-test-id="modal-left-button"]');
  button.click();
  sinon.assert.called(element.modalLeft.show);
});

Suite('assert right modal opened', async ({element}) => {
  element.modalRight = {
    show: sinon.spy()
  } as any;
  const button = element.shadowRoot.querySelector('[data-test-id="modal-right-button"]');
  button.click();
  sinon.assert.called(element.modalRight.show);
});

Suite('assert callbacks modal opened', async ({element}) => {
  element.modalWithCallbacks = {
    show: sinon.spy()
  } as any;
  const button = element.shadowRoot.querySelector('[data-test-id="modal-callback-button"]');
  button.click();
  sinon.assert.called(element.modalWithCallbacks.show);
});

Suite('assert slots modal opened', async ({element}) => {
  element.modalWithSlots = {
    show: sinon.spy()
  } as any;
  const button = element.shadowRoot.querySelector('[data-test-id="modal-slots-button"]');
  button.click();
  sinon.assert.called(element.modalWithSlots.show);
});

Suite.run();
