import { User } from '@genesislcap/foundation-user';
import { customElement, GenesisElement } from '@genesislcap/web-core';
import { EntitiesStyles as styles } from './entities.styles';
import { EntitiesTemplate as template } from './entities.template';

@customElement({
  name: 'static-entities-manager',
  template,
  styles,
})
export class StaticEntitiesManager extends GenesisElement {
  @User user: User;
}
