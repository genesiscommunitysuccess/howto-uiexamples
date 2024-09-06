import { customElement, FoundationElement, observable } from '@genesislcap/web-core';
import { TwoWayType } from '../../routes/two-way-binding/two-way-bindings.types';
import { TwoWayBindingFormTemplate as template } from './two-way-binding-form.template';

@customElement({
  name: 'two-way-binding-form',
  template,
})
export class TwoWayBindingForm extends FoundationElement {
  @observable currentValue: TwoWayType;

  handleSubmit(e: CustomEvent): void {
    this.$emit('twoWayFormSubmitted', e.detail);
  }
}
