# List items

In this example we get a snapshot of `ALL_TRADES` which will give us a list of trades which we will display in list. Each list item will have a link to take the user to a corresponding detail page

## Load the list data

In `ListItems` connected callback we first load the data. We use the async [connect.snapshot](https://docs.genesis.global/docs/develop/client-capabilities/server-communications/comms-connect/) method
and store the `ROW` value from the response in the observable entities property. 

```ts
...

@Connect connect!: Connect;

@observable entities: any[];

public async connectedCallback() {
  super.connectedCallback();
  const data = await this.connect.snapshot(
    'ALL_TRADES',
  );
  this.entities = data.ROW;
}
...
```

## Render list in repeat directive
The list is rendered using a `repeat` directive in the template - each item in the list has a unique link to go to a corresponding detail view composed with the `TRADE_ID`.

```html
${repeat(x => x.entities, html`
  <div class="list-item">
    <rapid-card>
    ...
      <div>
        <rapid-anchor @click=${x => Route.path.push(`list-item-detail/${x.TRADE_ID}`)}">
        View detail
        </rapid-anchor>
      </div>
    </rapid-card>
  </div>
`)}
```

## Redirect to detail page

When the button is clicked the app is redirected to the corresponding detail view.

In the routing in `config.ts`, the `list-item-detail` route is configured to match the value after the slash to `tradeId`.

```ts
this.routes.map(
  ...
    {
      path: 'list-item-detail/{tradeId}',
      element: ListItemDetail,
      title: 'List item detail',
      name: 'list-item-detail',
    },
  ...
)
```

## Load single item of data using filters
The `ListItemDetail` class is initialized with the value from the url for `tradeId`. The class loads the record from the backend with `CRITERIA_MATCH` set in the connect params.

```ts
public async connectedCallback(){
  super.connectedCallback();
  const data = await this.connect.snapshot(
    'ALL_TRADES',
    {CRITERIA_MATCH: `TRADE_ID == "${this.tradeId}"`}
  );
  this.entity = data.ROW && data.ROW[0];
}
```

This single record is then rendered in the component template.

## When to use?

In this example we are using the `ALL_TRADES` end point for both the list and item detail. In a real world environment you might have severable endpoints where you want to view data filtered by the trade id in some way.
