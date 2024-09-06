import { css, customElement, FASTElement, html } from '@genesislcap/web-core';

const name = 'foundation-layout-intro';

@customElement({
  name,
  template: html<FoundationLayoutIntro>`
    <tutorial-container :route="${() => 'foundation-forms-intro'}">
      <rapid-layout
        auto-save-key="how-to-ui-layout"
        :dimensionsConfig=${(_) => ({
          borderWidth: 10,
        })}
      >
        <rapid-layout-region type="vertical">
          <rapid-layout-region type="horizontal" size="33%">
            <rapid-layout-item title="First">
              <h2>First content</h2>
            </rapid-layout-item>
            <rapid-layout-item title="Second" registration="analysisCard">
              <h2>Second content</h2>
            </rapid-layout-item>
            <rapid-layout-item title="Third">
              <h2>Third content</h2>
            </rapid-layout-item>
          </rapid-layout-region>
          <rapid-layout-region type="horizontal" size="67%">
            <rapid-layout-item title="Fourth">
              <h2>Fifth content</h2>
            </rapid-layout-item>
            <rapid-layout-item title="Fifth">
              <h2>Sixth content</h2>
            </rapid-layout-item>
          </rapid-layout-region>
        </rapid-layout-region>
      </rapid-layout>
    </tutorial-container>
  `,
  styles: css`
    :host {
      height: 100%;
      width: 100%;
    }
  `,
})
export class FoundationLayoutIntro extends FASTElement {}
