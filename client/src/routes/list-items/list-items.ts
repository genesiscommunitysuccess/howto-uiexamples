import { Connect } from '@genesislcap/foundation-comms';
import { customElement, FASTElement, observable, Route } from '@genesislcap/web-core';
import { listItemStyles as styles } from './list-items.styles';
import { listItemTemplate as template } from './list-items.template';


const name = 'list-items-container';

// UI-LIST-ITEMS
// #2 Rendering list in a repeat
@customElement({
  name,
  template,
  styles,
})
export class ListItems extends FASTElement {
  @Connect connect!: Connect;

  @observable entities: any[] = [];

  public async connectedCallback() {
    super.connectedCallback();
    const data = await this.connect.snapshot('ALL_TRADES');
    this.entities = data.ROW;
  }

  navigateToListItem(instrumentId: string): void {
    Route.path.push(`list-item-detail/${instrumentId}`);
  }
}
