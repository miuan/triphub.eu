import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

const HeaderWrapper = styled.div`
  color: white;
  background-color: #ff4500;
  padding-left: 15px;
`;

const H1 = styled.h1`
  float:left;
  width:400px;
  margin:10px;
  padding:0px;
  font-size: 1.45em;
`;

const ButtonCreate = styled(Link)`
  float:right;
  width: 160px;
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
  border: 2px solid white;
  color: white;
  margin: 5px;
  &:active {
    background: white ;
    color: #ff4500;
  }

`;
const PageWrapper = styled.div`
  max-width: calc(1140px + 16px * 2);
  margin: 0 auto;
  padding: 0 16px;
  flex-direction: column;
`;

const A = styled(Link)`
  color: white;
  text-decoration:none;
`;
/*
<HeaderLink to="/ads/create">
            <FormattedMessage {...messages.create} />
          </HeaderLink>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/admin/countries">
            <FormattedMessage {...messages.admin} />
          </HeaderLink>
          */
class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <HeaderWrapper>
        <PageWrapper>
          <ButtonCreate to="/ads/create">
            <FormattedMessage {...messages.create} />
          </ButtonCreate>
          <H1>
            <A to="/">
              www.triphub.eu
            </A>
          </H1>
        </PageWrapper>
      </HeaderWrapper>
    );
  }
}

export default Header;
