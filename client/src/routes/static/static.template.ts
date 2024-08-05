import { isDev } from '@genesislcap/foundation-utils';
import { html } from '@genesislcap/web-core';
import type { Static } from './static';
import { StaticEntitiesManager } from './entities-manager';
import { StaticClientsManager } from './clients-manager';

StaticEntitiesManager;
StaticClientsManager;

export const StaticTemplate = html<Static>`
  <rapid-layout auto-save-key="${() => (isDev() ? null : 'Static_1722852266201')}">
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
