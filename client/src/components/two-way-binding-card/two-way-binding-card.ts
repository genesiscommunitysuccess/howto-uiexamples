import { customElement, FoundationElement, observable } from '@genesislcap/web-core';
import { attr } from '@genesislcap/web-core';
import { TwoWayType } from '../../routes/two-way-binding/two-way-bindings.types';
import { TwoWayBindingCardStyles as styles } from './two-way-binding-card.styles';
import { TwoWayBindingCardTemplate as template } from './two-way-binding-card.template';

@customElement({
  name: 'two-way-binding-card',
  template,
  styles,
})
export class TwoWayBindingCard extends FoundationElement {
  @observable currentValue: TwoWayType;

  @attr({ mode: 'boolean', attribute: 'is-active' }) isActive = false;

  @observable showForm: boolean;

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;
    if (name === 'is-active') {
      this.showForm = newValue === 'true';
    }
  }

  toggleActive(): void {
    this.$emit('toggleActive', this.currentValue);
  }
}
