import { sync } from '@genesislcap/foundation-utils';
import { ExecutionContext, html, repeat } from '@genesislcap/web-core';
import { Tutorial } from '../../components/tutorial-container/tutorial';
import type { Home } from './home';

export const HomeTemplate = html<Home>`
  <div class="container">
    <div data-test-id="home-title" class="title">
      <rapid-icon class="big-icon" variant="solid" name="rocket"></rapid-icon>
      <h2>Genesis Playground</h2>
    </div>
    <p class="subtitle">
      A set of components and applications built with Genesis Foundation UI and Genesis Server
      Framework
    </p>
    <div class="filters">
      <rapid-text-field
        placeholder="Search"
        type="text"
        value=${sync((x) => x.searchedTerms)}
        appearance="filled"
        autofocus="true"
        size="80"
      ></rapid-text-field>
    </div>
    <div class="content" data-test-id="content-cards">
      ${repeat(
        (x) => (x.filteredTutorials ? x.filteredTutorials : x.tutorials),
        html<Tutorial>`
          <rapid-card>
            <div
              class="tutorial-container"
              style="background-image: url(${(x) => x.imageUrl})"
            ></div>
            <h3 data-test-id="${(x) => x.title.replace(/\s+/g, '-').toLocaleLowerCase()}-card">
              ${(x) => x.title}
            </h3>
            <p>${(x) => x.description}</p>
            <div class="buttons">
              <rapid-button
                appearance="accent"
                @click=${(x, c: ExecutionContext<Home>) => c.parent.navigateTo(x.route)}
                data-test-id="${(x) => x.title.replace(/\s+/g, '-').toLocaleLowerCase()}-see-app"
              >
                <rapid-icon variant="solid" name="clapperboard"></rapid-icon>
                See App
              </rapid-button>
              <a href="${(x) => x.githubLink}" target="_blank">
                <rapid-button appearance="accent">
                  <rapid-icon variant="solid" name="code"></rapid-icon>
                  Source Code
                </rapid-button>
              </a>
            </div>
          </rapid-card>
        `,
      )}
    </div>
  </div>
`;
