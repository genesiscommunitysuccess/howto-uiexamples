import { Connect } from '@genesislcap/foundation-comms';
import { customElement, FASTElement, observable } from '@genesislcap/web-core';
import { createCardConfig } from '../../utils/list-item.utils';
import { ListItemDetailStyles as styles } from './list-item-detail.styles';
import { ListItemDetailTemplate as template } from './list-item-detail.template';

export interface CardItem {
  label: string;
  value: string | number;
}

@customElement({
  name: 'list-item-detail',
  template,
  styles,
})
export class ListItemDetail extends FASTElement {
  @observable tradeId: string;

  @observable entity;

  @Connect connect!: Connect;

  @observable loaded: boolean = false;

  @observable cardItems: CardItem[] = [];

  @observable scoreItems: CardItem[] = [];

  @observable latestQuote: CardItem[] = [];

  public async connectedCallback() {
    super.connectedCallback();
    const data = await this.connect.snapshot('ALL_TRADES', {
      CRITERIA_MATCH: `TRADE_ID == "${this.tradeId}"`,
    });

    this.entity = data.ROW && data.ROW[0];
    if (this.entity) {
      this.cardItems = createCardConfig(this.entity, [
        'CLIENT_NAME',
        'ENTITY_NAME',
        'STATUS',
        'SIDE',
        'ENTRY_DATETIME',
        'SETTLEMENT_DATE',
      ]);
      this.scoreItems = createCardConfig(this.entity, [
        'TARGET_CURRENCY',
        'SOURCE_CURRENCY',
        'NOTIONAL',
        'RATE',
        'SOURCE_NOTIONAL',
      ]);
    }

    this.loaded = true;
  }
}
