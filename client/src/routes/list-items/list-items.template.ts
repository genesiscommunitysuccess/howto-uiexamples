import { ExecutionContext, html, repeat } from '@genesislcap/web-core';
import { createCardConfig } from '../../utils/list-item.utils';
import { CardItem } from '../list-item-detail/list-item-detail';
import { ListItems } from './list-items';

export const listItemTemplate = html<ListItems>`
  <tutorial-container :route="${() => 'list-items'}">
    <div class="content">
      ${repeat(
        (x) => x.entities,
        html`
        <div class="list-item">
          <rapid-card>
            ${repeat(
              (x) => createCardConfig(x, ['NOTIONAL', 'SIDE', 'STATUS']),
              html<CardItem>`
                <div class="list-item-value">
                  <label>${(x) => x.label}</label>
                  <div>${(x) => x.value}</div>
                </div>
              `,
            )}
            <div>
              <rapid-anchor @click=${(x, c: ExecutionContext<ListItems>) => c.parent.navigateToListItem(x.TRADE_ID)}">
                View detail
              </rapid-anchor>
            </div>
          </rapid-card>
        </div>
      `,
      )}
    </div>
  </tutorial-container>
`;
