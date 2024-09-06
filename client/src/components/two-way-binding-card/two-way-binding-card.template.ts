import { html, whenElse } from '@genesislcap/web-core';
import { TwoWayBindingCard } from './two-way-binding-card';

export const TwoWayBindingCardTemplate = html<TwoWayBindingCard>`
  ${whenElse(
    (x) => x.showForm,
    html<TwoWayBindingCard>`
      <two-way-binding-form :currentValue="${(x) => x.currentValue}"></two-way-binding-form>
    `,
    html<TwoWayBindingCard>`
      <h4>Currency</h4>
      <div>${(x) => x.currentValue?.currency}</div>
      <h4>Amount</h4>
      <div>${(x) => x.currentValue?.amount}</div>
      <h4>Side</h4>
      <div>${(x) => x.currentValue?.side}</div>
      <rapid-button @click="${(x) => x.toggleActive()}">Edit</rapid-button>
    `,
  )}
`;
