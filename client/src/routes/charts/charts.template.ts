import { Charts } from './charts';
import { html } from '@genesislcap/web-core';
import { when } from '@microsoft/fast-element';
import { customEvent } from '@genesislcap/foundation-events';

export const chartsTemplate = html<Charts>`
  <rapid-tabs>
    <rapid-tab>Pie chart</rapid-tab>
    <rapid-tab>Line chart</rapid-tab>
    <rapid-tab>Area chart</rapid-tab>
    <rapid-tab>
      HLOC (aka 'candle') Chart
    </rapid-tab>
    <rapid-tab-panel>
      <rapid-g2plot-chart type="donut" :config=${(x) => x.donutChartConfiguration}>
        <chart-datasource
          resourceName="ALL_TRADES"
          server-fields="TARGET_CURRENCY NOTIONAL"
          chart-fields="groupBy targetCurrency"
        ></chart-datasource>
      </rapid-g2plot-chart>
    </rapid-tab-panel>
    <rapid-tab-panel>
      <div class="chart-container">
        <foundation-form 
          :data="${x => x.indexFormData}" 
          @change="${(x, ctx) => x.handleLineIndexChanged(customEvent(ctx))}}" 
          hide-submit-button="true" 
          :uischema="${x => x.indexUISchema}" 
          :jsonSchema="${x => x.indexJsonSchema}"
        >
        </foundation-form>
        <div class="chart-container-chart">
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
        </div>
      </div>
    </rapid-tab-panel>
    <rapid-tab-panel>
      <div class="chart-container">
        <foundation-form 
          :data="${x => x.instrumentFormData}" 
          @change="${(x, ctx) => x.handleAreaInstrumentChanged(customEvent(ctx))}}" 
          hide-submit-button="true" :uischema="${x => x.instrumentUISchema}" 
          :jsonSchema="${x => x.instrumentJsonSchema}"
        >
        </foundation-form>
        <div class="chart-container-chart">
          <rapid-g2plot-chart type="area" :config=${(x) => x.areaChartConfiguration}>
            <chart-datasource
              resourceName="ALL_INSTRUMENT_PRICE_HISTORY"
              server-fields="MARKET_DATE OPEN_PRICE INSTRUMENT_ID"
              chart-fields="date open instrumentId"
              isSnapshot="false"
              maxRows="1000"
              orderBy="MARKET_DATE"
              criteria=${(x) => x.areaChartFilterCriteria}
            ></chart-datasource>
          </rapid-g2plot-chart>
        </div>
      </div>
    </rapid-tab-panel>
    <rapid-tab-panel>
      ${when(x => !!x.stockData?.length, html<Charts>`
        <div class="chart-container">
          <foundation-form 
            :data="${x => x.instrumentFormData}" 
            @change="${(x, ctx) => x.handleHlocInstrumentChanged(customEvent(ctx))}}" 
            hide-submit-button="true" :uischema="${x => x.instrumentUISchema}" 
            :jsonSchema="${x => x.instrumentJsonSchema}"
          >
          </foundation-form>
          <div class="chart-container-chart">
            <rapid-g2plot-chart
              type="stock"
              :config=${x => x.stockChartConfiguration}
              :data=${x => x.stockData}>
            </rapid-g2plot-chart>
          </div>
        </div>
      `)}
    </rapid-tab-panel>
  </rapid-tabs>

`
