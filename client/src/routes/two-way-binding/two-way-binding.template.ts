import { customEvent } from '@genesislcap/foundation-events';
import { html } from '@genesislcap/web-core';
import { ExecutionContext, repeat } from '@genesislcap/web-core';
import { TwoWayBinding } from './two-way-binding';
import { TwoWayType } from './two-way-bindings.types';

export const twoWayBindingTemplate = html<TwoWayBinding>`
  <h1>Two-way binding example</h1>
  <div class="two-way-binding-container">
    ${repeat(
      (x) => x.items,
      html<TwoWayType>`
        <two-way-binding-card
          is-active="${(x, c: ExecutionContext<TwoWayBinding>) => x === c.parent.activeItem}"
          :currentValue="${(x) => x}"
          @toggleActive="${(x, c: ExecutionContext<TwoWayBinding>) => c.parent.toggleActive(x)}"
          @twoWayFormSubmitted="${(x, c: ExecutionContext<TwoWayBinding>) =>
            c.parent.handleFormSubmitted(customEvent(c))}"
        ></two-way-binding-card>
      `,
    )}
  </div>
`;
