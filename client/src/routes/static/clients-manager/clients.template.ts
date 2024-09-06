import { html, whenElse } from '@genesislcap/web-core';
import { getViewUpdateRightComponent } from '../../../utils';
import type { StaticClientsManager } from './clients';
import { columnDefs } from './clients.column.defs';
import { createFormSchema } from './clients.create.form.schema';
import { updateFormSchema } from './clients.update.form.schema';

export const ClientsTemplate = html<StaticClientsManager>`
  ${whenElse(
    (x) => getViewUpdateRightComponent(x.user, ''),
    html`
      <entity-management
        design-system-prefix="rapid"
        header-case-type="capitalCase"
        enable-row-flashing
        enable-cell-flashing
        resourceName="ALL_CLIENTS"
        createEvent="${(x) => getViewUpdateRightComponent(x.user, '', 'EVENT_CLIENT_INSERT')}"
        :createFormUiSchema=${() => createFormSchema}
        updateEvent="${(x) => getViewUpdateRightComponent(x.user, '', 'EVENT_CLIENT_MODIFY')}"
        :updateFormUiSchema=${() => updateFormSchema}
        deleteEvent="${(x) => getViewUpdateRightComponent(x.user, '', 'EVENT_CLIENT_DELETE')}"
        :columns=${() => columnDefs}
        modal-position="centre"
        size-columns-to-fit
        enable-search-bar
      ></entity-management>
    `,
    html`
      <not-permitted-component></not-permitted-component>
    `,
  )}
`;
