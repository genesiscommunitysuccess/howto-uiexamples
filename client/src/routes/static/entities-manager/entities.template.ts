import { html, whenElse, repeat } from '@genesislcap/web-core';
import { getViewUpdateRightComponent } from '../../../utils';
import type { StaticEntitiesManager } from './entities';
import { createFormSchema } from './entities.create.form.schema';
import { updateFormSchema } from './entities.update.form.schema';
import { columnDefs } from './entities.column.defs';


export const EntitiesTemplate = html<StaticEntitiesManager>`
    ${whenElse(
        (x) => getViewUpdateRightComponent(x.user, ''),
        html`
            <entity-management
                design-system-prefix="rapid"
                header-case-type="capitalCase"
                enable-row-flashing
                enable-cell-flashing
                resourceName="ALL_ENTITYS"
                createEvent="${(x) => getViewUpdateRightComponent(x.user, '', 'EVENT_ENTITY_INSERT')}"
                :createFormUiSchema=${() => createFormSchema }
                updateEvent="${(x) => getViewUpdateRightComponent(x.user, '', 'EVENT_ENTITY_MODIFY')}"
                :updateFormUiSchema=${() => updateFormSchema}
                deleteEvent="${(x) => getViewUpdateRightComponent(x.user, '', 'EVENT_ENTITY_DELETE')}"
                :columns=${() => columnDefs }
                modal-position="centre"
                size-columns-to-fit
            ></entity-management>
        `,
        html`
          <not-permitted-component></not-permitted-component>
        `,
    )}`;
