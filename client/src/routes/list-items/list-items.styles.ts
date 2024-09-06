import { css } from '@genesislcap/web-core';

export const listItemStyles = css`
  .content {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 10px;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    margin: 20px;
  }

  .list-item-value {
    margin-bottom: 20px;

    label {
      text-transform: uppercase;
      margin-bottom: 10px;
      font-size: 10px;
    }
  }

  rapid-card {
    flex: 1;
    padding: 20px;
    width: 200px;
    min-width: 200px;
    max-width: 200px;
  }
`;
