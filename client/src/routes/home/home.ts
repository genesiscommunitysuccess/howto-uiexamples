import { customElement, FASTElement, observable, Route } from '@genesislcap/web-core';
import { Tutorial } from '../../components/tutorial-container/tutorial';
import { HomeStyles as styles } from './home.styles';
import { HomeTemplate as template } from './home.template';
import thumb7 from './thumbnails/foundation-layout-intro.png';
import thumb8 from './thumbnails/list-items.png';
import thumb6 from './thumbnails/template-switch-statement.png';
import thumbCharts from './thumbnails/charts.png';
import thumbTwoWayBinding from './thumbnails/two-way-binding.png';
import thumbModals from './thumbnails/modals.png';


@customElement({
  name: 'home-route',
  template,
  styles,
})
export class Home extends FASTElement {
  @observable public searchedTerms: string = '';
  @observable public filteredTutorials: Array<Tutorial>;

  public tutorials: Array<Tutorial> = [
    new Tutorial(
      'Template switch statement with foundation web',
      'How to use switch statements in your template',
      'template-switch-statement',
      'https://github.com/genesislcap/platform-howto/tree/master/howto-uiexamples/client/src/routes/template-switch-statement',
      thumb6,
    ),
    new Tutorial(
      'Foundation layout example',
      'How to use the foundation layout. This example has two horizontal regions nested within a parent vertical region',
      'foundation-layout-intro',
      'https://github.com/genesislcap/platform-howto/tree/master/howto-uiexamples/client/src/routes/foundation-layout-intro',
      thumb7,
    ),
    new Tutorial(
      'List items and detail view',
      'How to create a list from an array and link to a detail view page for each item',
      'list-items',
      'https://github.com/genesislcap/platform-howto/tree/master/howto-uiexamples/client/src/routes/list-items',
      thumb8,
    ),
    new Tutorial(
      'Two Way Binding',
      'How to emit events and set properties with custom elements. Set custom inputs and create custom events. Create bindings for these in your template.',
      'two-way-binding',
      'https://github.com/genesislcap/platform-howto/tree/master/howto-uiexamples/client/src/routes/two-way-binding',
      thumbTwoWayBinding,
    ),
    new Tutorial(
      'Modals',
      'How to show and hide modal components with slotted content.',
      'modal-how-to',
      'https://github.com/genesislcap/platform-howto/tree/master/howto-uiexamples/client/src/routes/modal-how-to',
      thumbModals,
    ),
    new Tutorial(
      'Charts',
      'How to create charts populated by server side data',
      'charts',
      'https://github.com/genesislcap/genesis-gks/tree/develop/client/src/routes/charts',
      thumbCharts,
    ),
  ];

  constructor() {
    super();
    const isFirstAccess = localStorage.getItem('tutorials') === null;
    localStorage.setItem('tutorials', JSON.stringify(this.tutorials));

    if (isFirstAccess) {
      location.reload();
    }
  }

  public async connectedCallback() {
    super.connectedCallback();
  }

  public searchedTermsChanged() {
    this.filteredTutorials = this.tutorials?.filter(
      (tutorial) =>
        tutorial.title.toLowerCase().includes(this.searchedTerms.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(this.searchedTerms.toLowerCase()),
    );
  }

  public navigateTo(path: string) {
    try {
      Route.path.push(path);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}
