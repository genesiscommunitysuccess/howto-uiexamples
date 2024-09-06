import { customElement, FoundationElement, observable } from '@genesislcap/web-core';
import { TwoWayBindingCard } from '../../components/two-way-binding-card/two-way-binding-card';
import { TwoWayBindingForm } from '../../components/two-way-binding-form/two-way-binding-form';
import { twoWayBindingStyles as styles } from './two-way-binding.styles';
import { twoWayBindingTemplate as template } from './two-way-binding.template';
import { TwoWayType } from './two-way-bindings.types';

TwoWayBindingForm;
TwoWayBindingCard;

const items: TwoWayType[] = [
  { currency: 'USD', amount: 100, side: 'Buy' },
  { currency: 'GBP', amount: 532, side: 'Sell' },
  { currency: 'EUR', amount: 231.43, side: 'Sell' },
  { currency: 'USD', amount: 122.11, side: 'Sell' },
];

@customElement({
  name: 'two-way-binding',
  template,
  styles,
})
export class TwoWayBinding extends FoundationElement {
  @observable items: TwoWayType[] = items;

  @observable activeItem;

  toggleActive(item): void {
    this.activeItem = item;
  }

  handleFormSubmitted(e: CustomEvent): void {
    const activeIndex = this.items.indexOf(this.activeItem);
    this.items[activeIndex] = e.detail.payload;
    this.items = [...this.items];
    this.activeItem = null;
  }
}
