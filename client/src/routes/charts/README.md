# Foundation Charts How To Guide

The foundation ui library includes the `@genesislcap/g2plot-chart` which allows you to quickly create professional looking data visualisations.

The charts are added by including the `rapid-g2plot-chart` element in your template. You can populate the charts with data from the Genesis backend using the `chart-datasource` element as a child of the chart.

See the [Charts](https://docs.genesis.global/docs/develop/client-capabilities/charts/) on our documentation for more information.

## Foundation Charts - setup
The library is already installed and configured in this project. If you need to install it yourself

```shell
npm install --save @genesislcap/g2plot-chart
```

And in `client/src/components.ts` file ensure the chart components are registered.

```ts
...
import { g2plotChartsComponents } from '@genesislcap/g2plot-chart';
...

export async function registerComponents() {
...  
rapidDesignSystem
  .provideDesignSystem()
  .register(
    ...
    g2plotChartsComponents,
    ...
  );
...
```

## Donut chart

To create a donut chart, set `type="donut"` on the chart component and set the `donutChartConfiguration` on the config attribute. 

```ts
...
<rapid-g2plot-chart 
  type="donut" 
  :config=${(x) => x.donutChartConfiguration}
>
  <chart-datasource
    resourceName="ALL_TRADES"
    server-fields="TARGET_CURRENCY NOTIONAL"
    chart-fields="groupBy targetCurrency"
  ></chart-datasource>
</rapid-g2plot-chart>
...
```

```ts
...
donutChartConfiguration = {
  angleField: 'targetCurrency',
  colorField: 'groupBy',
  statistic: {
    title: false,
    content: {
      style: {
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      content: 'Positions breakdown',
    },
  },
};
...
```

Taking a closer look at `server-fields` - the first value `TARGET_CURRENCY` is used to group values and the second `NOTIONAL` is the value that is aggregated to determine the size of the donut slices.

In the config property, the `targetCurrency` is specified as the angleField and `groupBy` is colorField.

This will get all the rows from the `ALL_TRADES` response and group and sum by `TARGET_CURRENCY`. Each different slice will have it's own color.


## Line chart

To create a line chart, set `type="line"` on the chart component and set the `lineChartConfiguration` on the config attribute.
```html
<foundation-form
  :data="${x => x.indexFormData}"
  @change="${(x, ctx) => x.handleLineIndexChanged(customEvent(ctx))}}"
  hide-submit-button="true"
  :uischema="${x => x.indexUISchema}"
  :jsonSchema="${x => x.indexJsonSchema}"
>
<rapid-g2plot-chart type="line" :config=${(x) => x.lineChartConfiguration}>
  <chart-datasource
    resourceName="ALL_INDEX_RATES"
    server-fields="DATE RATE"
    chart-fields="date rate"
    isSnapshot="false"
    maxRows="1000"
    orderBy="DATE"
    criteria=${(x) => x.lineChartFilterCriteria}
  ></chart-datasource>
</rapid-g2plot-chart>
```

## Area chart

To create an area chart set `type="area"` on the chart component and set the `areaChartConfiguration` on the config attribute.

In this case we only want the price history data for a single instrument. We do this by setting the `criteria` property using the dropdown at the top. You can change this an observe the changes in the chart.

```ts
...
<foundation-form
  :data="${x => x.instrumentFormData}"
  @change="${(x, ctx) => x.handleAreaInstrumentChanged(customEvent(ctx))}}"
  hide-submit-button="true" :uischema="${x => x.instrumentUISchema}"
  :jsonSchema="${x => x.instrumentJsonSchema}"
>
</foundation-form>
<rapid-g2plot-chart 
  type="area" 
  :config=${(x) => x.areaChartConfiguration}
>
  <chart-datasource
    resourceName="ALL_INSTRUMENT_PRICE_HISTORY"
    server-fields="MARKET_DATE OPEN_PRICE INSTRUMENT_ID"
    chart-fields="date open instrumentId"
    isSnapshot="false"
    maxRows="1000"
    orderBy="MARKET_DATE"
    criteria=${(x) => x.areaChartFilterCriteria}
    >
  </chart-datasource>
</rapid-g2plot-chart>
...
```

```ts
...
@observable areaChartFilterCriteria: string;

areaChartConfiguration = {
  padding: 'auto',
  xField: 'date',
  yField: 'open',
  xAxis: {
    type: 'time',
    tickCount: 10,
  },
  slider: {
    start: 0,
    end: 1.0,
  },
};
...

private setAreaChartFilter(instrumentId: string): void {
  this.areaChartFilterCriteria = criteriaBuilder()
    .withExpression(
      expressionBuilder('INSTRUMENT_ID', instrumentId, Serialisers.EQ)
    )
    .build();
}
...
```
The `server-fields="MARKET_DATE OPEN_PRICE INSTRUMENT_ID"` property specifies that 
 - `MARKET_DATE` will be used in the x-axis. 
 - `OPEN` will be used in the y-axis

The `setAreaChartFilter` method takes on parameter - a string with the instrument name - and generates a filter string which is passed into the chart component in the template via the `criteria` attribute. You can select a different instrument and this filter property is re-generated and you can observe the data changes.

## Stock chart

To create a stock chart set `type="stock"` on the chart component and set the `stockChartConfiguration` on the config attribute. This is a custom chart and it does not use the datasource element, instead it gets the data from the backend and parses it on the front end. 

```ts
async setHlocChartFilter(instrumentId: string) {

  const filter = criteriaBuilder()
    .withExpression(
      expressionBuilder('INSTRUMENT_ID', instrumentId, Serialisers.EQ)
    )
    .build();

  const response = await this.connect
    .snapshot('ALL_INSTRUMENT_PRICE_HISTORY', { CRITERIA_MATCH: `${filter}`})

  if (!response.ROW) {
    return;
  }
  this.stockData = response.ROW.map(item => {
    return {
      ...item,
      MARKET_DATE: formatDateShort(item.MARKET_DATE),
    };
  });

  this.areaChartFilterCriteria = criteriaBuilder()
    .withExpression(
      expressionBuilder('INSTRUMENT_ID', instrumentId, Serialisers.EQ)
    )
    .build();
}
```
