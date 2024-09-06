import { customElement, FoundationElement, observable } from '@genesislcap/web-core';
import { chartsTemplate as template } from './charts.template';
import { chartsStyles as styles } from './charts.styles';
import { Connect } from '@genesislcap/foundation-comms';
import { chartsGradients } from '@genesislcap/g2plot-chart';
import {
  CriteriaBuilder,
  Expression,
  ExpressionBuilder,
  Serialiser,
  Serialisers
} from '@genesislcap/foundation-criteria';
import { Form, UiSchema } from '@genesislcap/foundation-forms';

export const criteriaBuilder = (): CriteriaBuilder => new CriteriaBuilder();

export const expressionBuilder = (
  field: string,
  value: unknown,
  serialiser: Serialiser
): Expression => {
  return new ExpressionBuilder()
    .withField(field)
    .withValue(value)
    .withSerialiser(serialiser)
    .build();
};

// Helper function to convert timestamp to 'YYYY-MM-DD' format
export const formatDateShort = (params) => {
  const date = new Date(params);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day
  return `${year}-${month}-${day}`;
}

@customElement({
  name: 'charts-how-to',
  template,
  styles
})
export class Charts extends FoundationElement {
  @Connect connect: Connect;
  @observable stockData: any = [];

  instrumentUISchema: UiSchema = {
    type: 'Control',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/instrumentId',
        label: 'Instrument',
        options: {
          allOptionsResourceName: 'ALL_INSTRUMENTS',
          valueField: 'INSTRUMENT_ID',
          labelField: 'INSTRUMENT_ID',
        }
      },
    ]
  }

  instrumentJsonSchema = {
    type: 'object',
    properties: {
      instrumentId: {
        type: 'string',
      },
    },
  }

  instrumentFormData = {
    instrumentId: 'VOD'
  }

  indexUISchema: UiSchema = {
    type: 'Control',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/index',
        label: 'Index',
        options: {
          allOptionsResourceName: 'ALL_INDICES',
          valueField: 'INDEX_NAME',
          labelField: 'INDEX_NAME',
        }
      },
    ]
  }

  indexJsonSchema = {
    type: 'object',
    properties: {
      instrumentId: {
        type: 'string',
      },
    },
  }

  indexFormData = {
    index: 'RPI'
  }

  @observable lineChartFilterCriteria: string;

  lineChartConfiguration = {
    padding: 'auto',
    seriesField: 'instrument_id',
    xField: 'date',
    yField: 'rate',
    xAxis: {
      type: 'time',
      tickCount: 10,
    },
    color: [chartsGradients.rapidGreen, chartsGradients.rapidRed, chartsGradients.rapidBlue, chartsGradients.rapidIce],
  };

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

  stockChartConfiguration = {
    xField: 'MARKET_DATE',
    yField: ['OPEN_PRICE', 'CLOSE_PRICE', 'HIGH_PRICE', 'LOW_PRICE'],
  };

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

  async connectedCallback() {
    super.connectedCallback();

    this.setLineChartFilter(this.indexFormData.index)
    this.setAreaChartFilter(this.instrumentFormData.instrumentId);
    await this.setHlocChartFilter(this.instrumentFormData.instrumentId);
  }

  handleAreaInstrumentChanged(event: CustomEvent): void {
    const form = event.target as Form;
    this.setAreaChartFilter(form.data.instrumentId);
  }

  handleLineIndexChanged(event: CustomEvent): void {
    const form = event.target as Form;
    this.setLineChartFilter(form.data.index);
  }

  async handleHlocInstrumentChanged(event: CustomEvent): Promise<void> {
    const form = event.target as Form;
    await this.setHlocChartFilter(form.data.instrumentId);
  }

  private setLineChartFilter(index: string): void {
    this.lineChartFilterCriteria = criteriaBuilder()
      .withExpression(
        expressionBuilder('INDEX', index, Serialisers.EQ)
      )
      .build();
  }

  private setAreaChartFilter(instrumentId: string): void {
    this.areaChartFilterCriteria = criteriaBuilder()
      .withExpression(
        expressionBuilder('INSTRUMENT_ID', instrumentId, Serialisers.EQ)
      )
      .build();
  }

  private async setHlocChartFilter(instrumentId: string) {

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
  }
}
