import { UiSchema } from '@genesislcap/foundation-forms';

export const updateFormSchema: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      label: 'Client Name',
      scope: '#/properties/CLIENT_NAME',
      options: {},
    },
    {
      type: 'Control',
      label: 'Client Description',
      scope: '#/properties/CLIENT_DESCRIPTION',
      options: {},
    },
  ],
};
