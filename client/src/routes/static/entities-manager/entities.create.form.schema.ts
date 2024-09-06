import { UiSchema } from '@genesislcap/foundation-forms';

export const createFormSchema: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      label: 'Entity Name',
      scope: '#/properties/ENTITY_NAME',
      options: {},
    },
    {
      type: 'Control',
      label: 'Entity Description',
      scope: '#/properties/ENTITY_DESCRIPTION',
      options: {},
    },
  ],
};
