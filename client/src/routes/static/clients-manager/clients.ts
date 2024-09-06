import { User } from '@genesislcap/foundation-user';
import { customElement, GenesisElement } from '@genesislcap/web-core';
import { ClientsStyles as styles } from './clients.styles';
import { ClientsTemplate as template } from './clients.template';

@customElement({
  name: 'static-clients-manager',
  template,
  styles,
})
export class StaticClientsManager extends GenesisElement {
  @User user: User;
}
