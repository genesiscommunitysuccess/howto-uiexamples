import { Auth, Session } from '@genesislcap/foundation-comms';
import { defaultLoginConfig, LoginConfig } from '@genesislcap/foundation-login';
import { FoundationRouterConfiguration } from '@genesislcap/foundation-ui';
import { NavigationPhase, optional, Route } from '@genesislcap/web-core';
import { defaultLayout, loginLayout } from '../layouts';
import { logger } from '../utils';
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
          identityProvidersPath: 'sso/list',
        },
      }
    : {};

export class MainRouterConfig extends FoundationRouterConfiguration<LoginSettings> {
  constructor(
    @Auth private auth: Auth,
    @Session private session: Session,
    @optional(LoginConfig)
    private loginConfig: LoginConfig = { ...defaultLoginConfig, autoAuth: true, autoConnect: true },
  ) {
    super();
  }

  async configure() {
    this.configureAnalytics();
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
          const { configure, define } = await import(
            /* webpackChunkName: "foundation-login" */
            '@genesislcap/foundation-login'
          );
          configure(this.container, {
            hostPath: 'login',
            autoConnect: true,
            defaultRedirectUrl: 'home',
            ...ssoSettings,
          });
          return define({
            name: `uiexamples-root-login`,
            /**
             * You can augment the template and styles here when needed.
             */
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

    /**
     * Example of a FallbackRouteDefinition
     */
    this.routes.fallback(() =>
      this.auth.isLoggedIn ? { redirect: 'not-found' } : { redirect: authPath },
    );

    /**
     * Example of a NavigationContributor
     */
    this.contributors.push({
      navigate: async (phase) => {
        const settings = phase.route.settings;

        /**
         * If public route don't block
         */
        if (settings && settings.public) {
          return;
        }

        /**
         * If logged in don't block
         */
        if (this.auth.isLoggedIn) {
          this.redirectIfNotPermitted(settings, phase);
          return;
        }

        /**
         * If allowAutoAuth and session is valid try to connect+auto-login
         */
        if (this.loginConfig.autoAuth && (await this.reAuthFromSession(settings, phase))) {
          return;
        }

        /**
         * Otherwise route them somewhere, like to a login
         */
        phase.cancel(() => {
          this.session.captureReturnUrl();
          Route.name.replace(phase.router, authPath);
        });
      },
    });
  }

  private async reAuthFromSession(settings: LoginSettings, phase: NavigationPhase) {
    return this.auth.reAuthFromSession().then((authenticated) => {
      logger.info(`reAuthFromSession. authenticated: ${authenticated}`);
      if (authenticated) {
        this.redirectIfNotPermitted(settings, phase);
      }
      return authenticated;
    });
  }

  private redirectIfNotPermitted(settings: LoginSettings, phase: NavigationPhase) {
    const { path } = phase.route.endpoint;
    if (settings?.isPermitted && !settings.isPermitted()) {
      logger.warn(`Not permitted - Redirecting URL from ${path} to ${defaultNotPermittedRoute}.`);
      phase.cancel(() => {
        Route.name.replace(phase.router, defaultNotPermittedRoute);
      });
    }
  }
}
