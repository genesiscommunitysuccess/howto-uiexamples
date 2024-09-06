import {assert, createComponentSuite, Registration} from "@genesislcap/foundation-testing";
import {Connect, Message} from "@genesislcap/foundation-comms";
import {DOM} from "@genesislcap/web-core";
import {ListItems} from "../../src/routes/list-items/list-items";

ListItems; // reference to avoid tree shaking.

const rowData = [
  {
    "ENTRY_DATETIME": 1721692800000,
    "TRADE_ID": "000000000000100TRLO1",
    "VERSION": 1,
    "STATUS": "New",
    "SIDE": "Sell",
    "TARGET_CURRENCY": "INR",
    "SOURCE_CURRENCY": "GBP",
    "NOTIONAL": 2100000,
    "RATE": 99.3,
    "SETTLEMENT_DATE": 1721865600000,
    "CLIENT_NAME": "Vodafone Group",
    "ENTITY_NAME": "New York Trading",
    "SOURCE_NOTIONAL": -21148.036253776434,
    "DETAILS": {
      "OPERATION": "INSERT",
      "ROW_REF": "7229157835592961118"
    }
  },
  {
    "ENTRY_DATETIME": 1721692800000,
    "TRADE_ID": "000000000000099TRLO1",
    "VERSION": 1,
    "STATUS": "New",
    "SIDE": "Buy",
    "TARGET_CURRENCY": "INR",
    "SOURCE_CURRENCY": "GBP",
    "NOTIONAL": 2310000,
    "RATE": 102,
    "SETTLEMENT_DATE": 1721865600000,
    "CLIENT_NAME": "Rolls-Royce Holdings",
    "ENTITY_NAME": "New York Trading",
    "SOURCE_NOTIONAL": -22647.058823529413,
    "DETAILS": {
      "OPERATION": "INSERT",
      "ROW_REF": "7229157835592961117"
    }
  }
];

const mockData = {
  "ROWS_COUNT": 100,
  "MESSAGE_TYPE": "QUERY_UPDATE",
  "ROW": rowData,
  "MORE_ROWS": false,
  "SOURCE_REF": "f5ebbfcd-7753-41d0-a1ec-eda8ffc307a3",
  "SEQUENCE_ID": 1
}

// partial mock of the Connect service so that snapshots return our mock data during these tests
const connectMock = {
  snapshot: (): Promise<Message> => Promise.resolve(mockData)
};

const mocks = [
  Registration.instance(Connect, connectMock),
];

const Suite = createComponentSuite<ListItems>('ListItems', 'list-items-container', undefined, mocks);

Suite('Can be created in the DOM.', async ({element}) => {
  assert.ok(element);
});

Suite('Displays a list item for every row.', async ({element}) => {
  await DOM.nextUpdate();
  const content = element.shadowRoot?.querySelector('div.content');
  const listItems = content.querySelectorAll('rapid-card');
  assert.equal(listItems.length, element.entities.length);
});

Suite('Can navigate to details from a list item', async ({element}) => {
  await DOM.nextUpdate();
  const content = element.shadowRoot?.querySelector('div.content');
  const firstListItem = content.querySelectorAll('rapid-card')[0];
  const anchor = firstListItem.querySelector('rapid-anchor');
  assert.ok(anchor);
  // only works if running in browser
  // await (anchor as HTMLElement)?.click();
  // assert.equal(window?.location?.pathname, `/list-item-detail/${element.entities[0].TRADE_ID}`);
});

Suite.run();
