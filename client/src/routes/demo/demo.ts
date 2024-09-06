import { User } from '@genesislcap/foundation-user';
import { customElement, DOM, GenesisElement, observable, volatile } from '@genesislcap/web-core';
import { timeOfDay } from '../../utils/util';
import { DemoStyles as styles } from './demo.styles';
import { DemoTemplate as template } from './demo.template';

@customElement({
  name: 'demo-route',
  template,
  styles,
})
export class Demo extends GenesisElement {
  @User user: User;

  @observable
  private t: number = Date.now();
  private timeoutId: number;

  constructor() {
    super();
  }

  @volatile
  get greeting() {
    const h = new Date().getHours();
    const tod = timeOfDay(h);
    const username = this.user.userName;
    return `Good ${tod}, ${username}!`;
  }

  @volatile
  get time() {
    return new Date(this.t).toLocaleTimeString();
  }

  connectedCallback() {
    super.connectedCallback();
    DOM.queueUpdate(() => this.updateTime());
  }

  // @internal
  private updateTime = () => {
    clearTimeout(this.timeoutId);
    this.t = Date.now();
    this.timeoutId = window.setTimeout(this.updateTime, 1);
  };
}
