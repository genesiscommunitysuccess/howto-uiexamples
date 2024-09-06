import { css } from '@genesislcap/web-core';

export const twoWayBindingStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    margin: calc(var(--design-unit) * 1rem);
    text-align: center;
  }

  .two-way-binding-container {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--design-unit) * 0.5rem);
    justify-content: center;
  }
`;
