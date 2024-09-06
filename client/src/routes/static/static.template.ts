import { isDev } from '@genesislcap/foundation-utils';
import { html } from '@genesislcap/web-core';
import { StaticClientsManager } from './clients-manager';
import { StaticEntitiesManager } from './entities-manager';
import type { Static } from './static';

StaticEntitiesManager;
StaticClientsManager;

export const StaticTemplate = html<Static>`
  <rapid-layout
    auto-save-key="${() => (isDev() ? null : 'Static_1722852266201')}"
    data-test-id="static-page"
  >
    <rapid-layout-region>
      <rapid-layout-item title="Entities">
        <static-entities-manager></static-entities-manager>
      </rapid-layout-item>
      <rapid-layout-item title="Clients">
        <static-clients-manager></static-clients-manager>
      </rapid-layout-item>
    </rapid-layout-region>
  </rapid-layout>
`;
