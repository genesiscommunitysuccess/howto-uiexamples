import { customEvent } from '@genesislcap/foundation-events';
import { UiSchema } from '@genesislcap/foundation-forms';
import { html } from '@genesislcap/web-core';
import { TwoWayBindingForm } from './two-way-binding-form';

const uiSchema: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/currency',
    },
    {
      type: 'Control',
      scope: '#/properties/amount',
    },
    {
      type: 'Control',
      scope: '#/properties/side',
    },
  ],
};

const jsonSchema = {
  type: 'object',
  properties: {
    currency: {
      type: 'string',
    },
    amount: {
      type: 'number',
    },
    side: {
      type: 'string',
    },
  },
};

export const TwoWayBindingFormTemplate = html<TwoWayBindingForm>`
  <foundation-form
    :uischema="${() => uiSchema}"
    :jsonSchema="${() => jsonSchema}"
    :data="${(x) => x.currentValue}"
    @submit="${(x, c) => x.handleSubmit(customEvent(c))}"
  ></foundation-form>
`;
