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
  padding-top: 0px;
`;

const PageWrapper = styled.div`
  max-width: calc(1140px + 16px * 2);
  margin: 0 auto;
  padding: 0 16px;
  text-align:center;
`;

const Left = styled.div`
  float:left;width:200px;
  overflow:hidden;
`;
const Right = styled.div`
  float:right;
  width:200px;
`;
const Center = styled.div`
  padding-top:0px;
  margin:0 auto;
  width:400px;
  font-size: 1.15em;
`;

const H1 = styled.h1`
  width:200px;
  padding-top:4px;
  margin:0px;
  font-size: 1.45em;
`;

const H2 = styled.h2`
  font-style:italic;
  margin:0px;
  padding:10px;
  font-size: 1em;
`;

const ButtonCreate = styled(Link)`
  float:right;
  width: 180px;
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
  font-size: 15px;
  border: 2px solid white;
  color: white;
  margin: 5px;
  &:active {
    background: white ;
    color: #ff4500;
  }
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
          /*
          <PageWrapper>
          <ButtonCreate to="/ads/create">
            <FormattedMessage {...messages.create} />
          </ButtonCreate>
          <I>The place to find your travel budy</I>
          <H1>
            <A to="/">
              www.triphub.cz
            </A>
          </H1>
        </PageWrapper>*/
class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <HeaderWrapper>
        <PageWrapper>
          <Left>
            <H1>
              <A to="/">
                www.triphub.cz
              </A>
            </H1>
          </Left>
          <Right>
            <ButtonCreate to="/ads/create">
              <FormattedMessage {...messages.create} />
            </ButtonCreate>
          </Right>
          <Center>
            <H2>„The place to find your travel budy”</H2>
          </Center>
        </PageWrapper>
      </HeaderWrapper>
    );
  }
}

export default Header;
