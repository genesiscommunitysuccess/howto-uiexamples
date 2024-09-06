import {
  css,
  customElement,
  ExecutionContext,
  FASTElement,
  html,
  observable,
  repeat,
  ViewTemplate,
} from '@genesislcap/web-core';

enum TemplateMode {
  MODE_1 = 'MODE_1',
  MODE_2 = 'MODE_2',
  MODE_3 = 'MODE_3',
  MODE_4 = 'MODE_4',
}

const getTemplateForMode = (mode: TemplateMode): ViewTemplate => {
  switch (mode) {
    case TemplateMode.MODE_1:
      return html`
        <h2>Mode 1</h2>
      `;

    case TemplateMode.MODE_2:
      return html`
        <h2>Mode 2</h2>
      `;

    case TemplateMode.MODE_3:
      return html`
        <h2>Mode 3</h2>
      `;

    case TemplateMode.MODE_4:
      return html`
        <h2>Mode 4</h2>
      `;
  }
};

const name = 'template-switch-statement';

@customElement({
  name,
  template: html<TemplateSwitchStatement>`
    <tutorial-container :route="${() => 'template-switch-statement'}">
      <h1>Template switch statement</h1>
      <div class="buttons">
        ${repeat(
          (x) => x.ribbonButtons,
          html<TemplateMode>`
            <rapid-button
              @click="${(x, ctx: ExecutionContext<TemplateSwitchStatement>) =>
                ctx.parent.setMode(x)}"
            >
              ${(x) => x}
            </rapid-button>
          `,
        )}
      </div>
      <div class="mode">${(x) => getTemplateForMode(x.mode)}</div>
    </tutorial-container>
  `,
  styles: css`
    .buttons {
      display: flex;
    }

    .buttons rapid-button {
      margin-right: 10px;
    }
  `,
})
export class TemplateSwitchStatement extends FASTElement {
  ribbonButtons: TemplateMode[] = Object.keys(TemplateMode).map((key) => TemplateMode[key]);

  @observable mode: TemplateMode = TemplateMode.MODE_1;

  setMode(mode: TemplateMode): void {
    this.mode = mode;
  }
}
