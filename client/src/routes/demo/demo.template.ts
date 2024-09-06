import { html } from '@genesislcap/web-core';
import { Demo } from './demo';

export const DemoTemplate = html<Demo>`
  <div class="wrapper" data-test-id="demo-page">
    <h1>${(x) => x.greeting}</h1>
    <h2>It's currently: ${(x) => x.time}</h2>
  </div>
`;
