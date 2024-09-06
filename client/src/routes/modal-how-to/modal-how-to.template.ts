import { html, ref, whenElse } from '@genesislcap/web-core';
import { repeat } from '@genesislcap/web-core';
import { ModalHowTo } from './modal-how-to';

const formSchema = {
  type: 'object',
  properties: {
    textField: {
      type: 'string',
    },
    numberField: {
      type: 'number',
    },
  },
};

export const modalHowToTemplate = html<ModalHowTo>`
  <rapid-button data-test-id="modal-basic-button" @click="${(x) => x.openModal()}">
    Open Modal
  </rapid-button>
  <rapid-button data-test-id="modal-form-button" @click="${(x) => x.openModalWithForm()}">
    Open Form Modal
  </rapid-button>
  <rapid-button data-test-id="modal-left-button" @click="${(x) => x.openModalLeft()}">
    Open Left Position Modal
  </rapid-button>
  <rapid-button data-test-id="modal-right-button" @click="${(x) => x.openModalRight()}">
    Open Right Position Modal
  </rapid-button>
  <rapid-button data-test-id="modal-callback-button" @click="${(x) => x.openModalWithCallback()}">
    Open Modal with callbacks
  </rapid-button>
  <rapid-button data-test-id="modal-slots-button" @click="${(x) => x.openModalWithSlots()}">
    Open Modal with top/bottom slots
  </rapid-button>
  <rapid-modal ${ref('modal')} data-test-id="modal-basic">
    <p>This is a modal. You can slot any content you want in here.</p>
  </rapid-modal>
  <rapid-modal ${ref('modalLeft')} position="left" data-test-id="modal-left">
    <p>This is a modal. It is positioned to the left.</p>
  </rapid-modal>
  <rapid-modal ${ref('modalRight')} position="right" data-test-id="modal-right">
    <p>This is a modal. It is positioned to the right.</p>
  </rapid-modal>
  <rapid-modal show-close-icon="false" ${ref('modalWithForm')} data-test-id="modal-form">
    <foundation-form
      @submit="${(x) => x.handleModalFormSubmit()}"
      :jsonSchema="${() => formSchema}"
    ></foundation-form>
  </rapid-modal>
  <rapid-modal
    ${ref('modalWithCallbacks')}
    :onShowCallback="${(x) => () => x.modalOpenCallback()}"
    :onCloseCallback="${(x) => () => x.modalClosedCallback()}"
    data-test-id="modal-callbacks"
  >
    ${whenElse(
      (x) => !!x.entities,
      html<ModalHowTo>`
        <ul class="entities-list">
          ${repeat(
            (x) => x.entities,
            html`
              <li>${(x) => x.ENTITY_NAME}</li>
            `,
          )}
        </ul>
      `,
      html<ModalHowTo>`
        <div class="loading-spinner-container">
          <rapid-progress-ring></rapid-progress-ring>
          Loading entities...
        </div>
      `,
    )}
  </rapid-modal>
  <rapid-modal ${ref('modalWithSlots')} data-test-id="modal-slots">
    <h3 slot="top">Top slot header</h3>
    <p>This is a modal. It is positioned to the right.</p>
    <div slot="bottom" style="font-size: 10px">
      <i>Slotted content in the bottom</i>
    </div>
  </rapid-modal>
`;
