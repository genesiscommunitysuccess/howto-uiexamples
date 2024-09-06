import {ListItemDetail} from '../../src/routes/list-item-detail/list-item-detail'
import {assert, createComponentSuite, Registration, sinon} from "@genesislcap/foundation-testing";
import {Connect, Message} from '@genesislcap/foundation-comms';
import {DOM} from "@genesislcap/web-core";

ListItemDetail; // reference to avoid tree shaking.

const rowMockData = {
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
};

const mockData = {
  "ROWS_COUNT": 100,
  "MESSAGE_TYPE": "QUERY_UPDATE",
  "ROW": [
    rowMockData
  ],
  "MORE_ROWS": false,
  "SOURCE_REF": "700dc5c1-b0eb-4a16-abb3-ce8b64ffaa3c",
  "SEQUENCE_ID": 1
}

const emptyMockData = {
  "ROWS_COUNT": 100,
  "MESSAGE_TYPE": "QUERY_UPDATE",
  "ROW": [],
  "MORE_ROWS": false,
  "SOURCE_REF": "700dc5c1-b0eb-4a16-abb3-ce8b64ffaa3c",
  "SEQUENCE_ID": 1
}

const connectMock = {
  snapshot: (): Promise<Message> => Promise.resolve(mockData)
};

const mocks = [
  Registration.instance(Connect, connectMock),
];

const Suite = createComponentSuite<ListItemDetail>('ListItemDetail', 'list-item-detail', undefined, mocks);

Suite('Can be created in the DOM.', async ({element}) => {
  assert.ok(element);
});

Suite('Starts with loading spinner.', async ({element}) => {
  assert.ok(element.shadowRoot?.querySelector('rapid-progress-ring'));
});

Suite('After init loading spinner no longer visible.', async ({element}) => {
  await DOM.nextUpdate();
  assert.equal(element.loaded, true);
  assert.not.ok(element.shadowRoot?.querySelector('rapid-progress-ring'));
});

Suite('Displays Trade ID in header correctly.', async ({element}) => {
  element.tradeId = rowMockData.TRADE_ID;
  await DOM.nextUpdate();

  // check that there is a <h1> tag that starts with 'Trade ID' and contains the value of element.tradeId
  const h1 = element.shadowRoot?.querySelector('h1');
  assert.ok(h1);
  assert.ok(h1.textContent);
  assert.equal(h1.textContent?.indexOf("Trade ID"), 0);
  assert.equal(h1.textContent?.indexOf(rowMockData["TRADE_ID"]) > 0, true);
});

Suite('Displays analysis side data correctly.', async ({element}) => {
  element.tradeId = rowMockData.TRADE_ID;
  await DOM.nextUpdate();

  // check side card data analysis items
  const card = element.shadowRoot?.querySelector('rapid-card.analysis-side');
  assert.ok(card && card.textContent);
  assert.equal(card.querySelectorAll('div.analysis-item').length, element.cardItems.length);

  for (let i = 0; i < element.cardItems.length; i++) {
    assert.equal(card.textContent.indexOf(`${element.cardItems[i].label}`) > 0, true);
    assert.equal(card.textContent.indexOf(`${element.cardItems[i].value}`) > 0, true);
    console.debug(`side-card contains ${element.cardItems[i].label} : ${element.cardItems[i].value}`)
  }
});

Suite('Displays score data correctly.', async ({element}) => {
  element.tradeId = rowMockData.TRADE_ID;
  await DOM.nextUpdate();

  // check side card data analysis items
  const card = element.shadowRoot?.querySelector('div.score-card');
  assert.ok(card && card.textContent);
  assert.equal(card.querySelectorAll('div.score-card-item').length, element.scoreItems.length);

  for (let i = 0; i < element.scoreItems.length; i++) {
    assert.equal(card.textContent.indexOf(`${element.scoreItems[i].label}`) > 0, true);
    assert.equal(card.textContent.indexOf(`${element.scoreItems[i].value}`) > 0, true);
    console.debug(`score-card contains ${element.scoreItems[i].label} : ${element.scoreItems[i].value}`)
  }
});

Suite('Displays warning message correctly when response is empty.', async ({element}) => {
  element.tradeId = rowMockData.TRADE_ID;
  const snapshotStub = sinon.stub(element.connect, 'snapshot').callsFake((): Promise<Message> => Promise.resolve(emptyMockData));
  await element.connectedCallback();
  await DOM.nextUpdate();
  assert.is(snapshotStub.calledOnce, true);

  assert.not.ok(element.entity);
  assert.ok(element.loaded);
  const warning = element.shadowRoot?.querySelector('p.warning');
  assert.ok(warning && warning.textContent);
  assert.ok(warning.textContent.indexOf(`No analysis found for`) > 0);
  assert.ok(warning.textContent.indexOf(`${element.tradeId}`) > 0);
  snapshotStub.restore();
});

Suite.run();
