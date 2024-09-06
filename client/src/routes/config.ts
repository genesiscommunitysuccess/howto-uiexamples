import { getUser, navigateTo } from '@genesislcap/foundation-auth';
import { Connect } from '@genesislcap/foundation-comms';
import { FoundationRouterConfiguration } from '@genesislcap/foundation-ui';
import { GENESIS_SOCKET_URL, PUBLIC_PATH } from '@genesislcap/foundation-utils';
import { defaultLayout, loginLayout } from '../layouts';
import { Demo } from './demo/demo';
import { FoundationLayoutIntro } from './foundation-layout-intro/foundation-layout-intro';
import { Home } from './home/home';
import { ListItemDetail } from './list-item-detail/list-item-detail';
import { ListItems } from './list-items/list-items';
import { ModalHowTo } from './modal-how-to/modal-how-to';
import { NotFound } from './not-found/not-found';
import { defaultNotPermittedRoute, NotPermitted } from './not-permitted/not-permitted';
import { Static } from './static/static';
import { TemplateSwitchStatement } from './template-switch-statement/template-switch-statement';
import { TwoWayBinding } from './two-way-binding/two-way-binding';
import { LoginSettings } from './types';
import { Charts } from './charts/charts';

// eslint-disable-next-line
declare var ENABLE_SSO: string;

const ssoSettings =
  typeof ENABLE_SSO !== 'undefined' && ENABLE_SSO === 'true'
    ? {
        autoAuth: true,
        sso: {
          toggled: true,
          identityProvidersPath: 'gwf/sso/list',
        },
      }
    : {};

const publicPath = typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '';

export class MainRouterConfig extends FoundationRouterConfiguration<LoginSettings> {
  @Connect private connect: Connect;

  async configure() {
    this.configureAnalytics();
    this.configureRoutePermittedChecks();
    this.configureFallbackRouteDefinition();
    this.title = 'Ui Examples';
    this.defaultLayout = defaultLayout;

    const authPath = 'login';

    this.routes.map(
      { path: '', redirect: authPath },
      {
        path: authPath,
        name: 'login',
        title: 'Login',
        element: async () => {
          const { configure, defaultAuthConfig } = await import(
            '@genesislcap/foundation-auth/config'
          );
          return configure({
            omitRoutes: ['request-account', 'forgot-password'],
            hostPath: this.loginPath,
            // The router accepts the WebSocket only once the HTTP login has set its session cookie
            postLoginRedirect: async () => {
              await this.connect.connect(GENESIS_SOCKET_URL);
              const lastPath =
                getUser().lastPath() === `${publicPath}/` ? undefined : getUser().lastPath();
              navigateTo(lastPath ?? `${publicPath}/home`);
            },
            postLogoutRedirect: () => {
              if (this.connect.isConnected) {
                this.connect.disconnect();
              }
              defaultAuthConfig.postLogoutRedirect();
            },
            ...ssoSettings,
          });
        },
        layout: loginLayout,
        settings: { public: true },
        childRouters: true,
      },
      {
        path: 'home',
        element: Home,
        title: 'Home',
        name: 'home',
        navItems: [
          {
            title: 'Home',
            icon: {
              name: 'house',
              variant: 'solid',
            },
            permission: '',
          },
        ],
      },
      { path: 'not-found', element: NotFound, title: 'Not Found', name: 'not-found' },
      {
        path: defaultNotPermittedRoute,
        element: NotPermitted,
        title: 'Not Permitted',
        name: defaultNotPermittedRoute,
      },
      {
        path: 'static',
        element: Static,
        title: 'Static',
        name: 'static',
        navItems: [
          {
            title: 'Static',
            icon: {
              name: 'cog', // use an icon from https://fontawesome.com/icons
              variant: 'solid',
            },
            permission: '',
          },
        ],
      },
      {
        path: 'template-switch-statement',
        element: TemplateSwitchStatement,
        title: 'Template Switch Statement',
        name: 'template-switch-statement',
      },
      {
        path: 'foundation-layout-intro',
        element: FoundationLayoutIntro,
        title: 'Foundation Layout Intro',
        name: 'foundation-layout-intro',
      },
      {
        path: 'list-items',
        element: ListItems,
        title: 'List items',
        name: 'list-items',
      },
      {
        // UI-LIST-ITEMS
        // #3 Adding route with route param. The value after the slash is treated as an id to be used in communicating with the backend
        path: 'list-item-detail/{tradeId}',
        element: ListItemDetail,
        title: 'List item detail',
        name: 'list-item-detail',
      },
      {
        path: 'two-way-binding',
        element: TwoWayBinding,
        title: 'Two Way Binding',
        name: 'two-way-binding',
      },
      {
        path: 'modal-how-to',
        element: ModalHowTo,
        title: 'Modal How To',
        name: 'modal-how-to',
      },
      {
        path: 'charts',
        element: Charts,
        title: 'Charts',
        name: 'charts',
      },
      {
        path: 'demo',
        element: Demo,
        title: 'Demo',
        name: 'demo',
        navItems: [
          {
            title: 'Demo',
            icon: {
              name: 'cog',
              variant: 'solid',
            },
            permission: '',
          },
        ],
      },
    );

    this.contributors.push({
      navigate: async (phase) => {
        const settings = phase.route.settings;

        /**
         * If the route is public or the user is authenticated don't block
         */
        if (settings?.public || this.user.isAuthenticated) {
          return;
        }

        /**
         * Otherwise route them to login
         */
        this.navigationPhaseLoginRedirect(phase);
      },
    });
  }
}
