/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';

const A = styled.div`
  .place {
    font-weight: bold;
  }

  .country {
    margin-left:10px;
  }

  .container {
    overflow: hidden;
  }

  .right {
    float: right;
    overflow: hidden;
  }

  .left {
    float: none;
    width: auto;
    overflow: hidden;
  }

  button {
    margin-left: 10px;
    display: inline-block;
    box-sizing: border-box;
    padding: 0.2em 2em;
    text-decoration: none;
    border-radius: 4px;
    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    outline: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 10px;
    border: 2px solid #FF4500;
    color: #FF4500;
  }
`;

export default A;
