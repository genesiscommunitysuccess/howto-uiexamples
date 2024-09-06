import { css } from '@genesislcap/web-core';

export const ListItemDetailStyles = css`
  :host {
    height: 100%;
    width: 100%;
    display: block;
    padding: 20px;
    box-sizing: border-box;
  }

  .analysis-side {
    width: 250px;
    flex: 0 0 auto;
  }

  .analysis-main {
    flex-grow: 1;
  }

  .loading-spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .analysis-container {
    display: flex;
  }

  .analysis-item {
    margin-bottom: 20px;
    font-size: 20px;
  }

  .analysis-item label,
  .score-card label {
    margin-bottom: 10px;
    font-size: 12px;
    text-transform: uppercase;
  }

  .score-card {
    display: flex;
    flex-wrap: wrap;
  }

  .score-card-item {
    margin-right: 20px;
    font-size: 20px;
  }

  .instrument-quote rapid-button {
    margin-bottom: 20px;
  }

  rapid-card {
    margin-right: 20px;
    padding: 20px;
    box-sizing: border-box;
  }

  rapid-card:last-child {
    margin-right: 0;
  }
`;
