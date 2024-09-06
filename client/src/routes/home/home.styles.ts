import { css } from '@genesislcap/web-core';
import { stylesFontFaces, stylesTemplateTutorials } from '../../styles';

export const HomeStyles = css`
  ${stylesFontFaces}
  ${stylesTemplateTutorials}

  .content {
    display: flex;
    height: 100%;
    flex-flow: row wrap;
    align-content: flex-start;
    overflow-y: auto;
    place-content: flex-start center;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .title h2,
  .title .big-icon {
    padding-right: 10px;
  }

  .title .big-icon {
    font-size: 30px;
  }

  .subtitle {
    margin-left: 10px;
    margin-top: 0;
  }

  rapid-card {
    margin: 10px;
    padding: 10px;
    width: 350px;
    height: 350px;
  }

  rapid-card:hover {
    background-color: rgb(0 0 0 / 40%);
    background-blend-mode: darken;
  }

  rapid-card h3 {
    margin: 0;
    padding: 0;
    font-weight: 500;
  }

  rapid-card p {
    margin: 5px;
    margin-left: 0;
    font-weight: 300;
  }

  .tutorial-container {
    display: flex;
    height: 150px;
    background-color: rgb(0 0 0 / 100%);
    background-repeat: no-repeat, repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 5px;
  }

  .buttons {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-bottom: 5px;
  }

  .filters {
    text-align: center;
  }
`;
