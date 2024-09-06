import { html, repeat } from '@genesislcap/web-core';
import { when } from '@genesislcap/web-core';
import { CardItem, ListItemDetail } from './list-item-detail';

export const ListItemDetailTemplate = html<ListItemDetail>`
  <tutorial-container :route="${() => 'list-items'}">
    ${when(
      (x) => !x.loaded,
      html`
        <div class="loading-spinner-container">
          <rapid-progress-ring></rapid-progress-ring>
        </div>
      `,
    )}
    ${when(
      (x) => x.loaded && !x.entity,
      html<ListItemDetail>`
        <p class="warning">
          No analysis found for
          <b>${(x) => x.tradeId}</b>
        </p>
      `,
    )}
    ${when(
      (x) => x.entity,
      html<ListItemDetail>`
        <h1>Trade ID: ${(x) => x.tradeId} - Detail View</h1>
        <div class="analysis-container">
          <rapid-card class="analysis-side">
            ${repeat(
              (x) => x.cardItems,
              html<CardItem>`
                <div class="analysis-item">
                  <label>${(x) => x.label}</label>
                  <div>${(x) => x.value}</div>
                </div>
              `,
            )}
          </rapid-card>
          <div class="analysis-main">
            <rapid-card style="height: auto;">
              <div class="score-card">
                ${repeat(
                  (x) => x.scoreItems,
                  html<CardItem>`
                    <div class="score-card-item">
                      <label>${(x) => x.label}</label>
                      <div>${(x) => x.value}</div>
                    </div>
                  `,
                )}
              </div>
            </rapid-card>
          </div>
        </div>
      `,
    )}
  </tutorial-container>
`;
