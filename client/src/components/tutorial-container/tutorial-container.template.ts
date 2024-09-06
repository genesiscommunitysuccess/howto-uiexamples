import { html } from '@genesislcap/web-core';
import type { TutorialContainer } from './tutorial-container';

export const TutorialContainerTemplate = html<TutorialContainer>`
  <div class="container">
    <div class="header-tutorial">
      <div class="buttons">
        <rapid-button appearance="accent" class="back-arrow" @click=${(x) => x.back()}>
          <rapid-icon variant="solid" name="angle-left"></rapid-icon>
        </rapid-button>

        <rapid-button appearance="accent" @click=${(x) => x.openSource()}>
          <rapid-icon variant="solid" name="code"></rapid-icon>
          Source Code
        </rapid-button>
      </div>
    </div>
    <div class="subtitle">
      <h2>${(x) => x.tutorial?.title}</h2>
      <h4>${(x) => x.tutorial?.description}</h4>
    </div>
    <div class="sample">
      <slot></slot>
    </div>
  </div>
`;
