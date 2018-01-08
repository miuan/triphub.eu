import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { makeSelectTrips } from './selectors';
import { tripsRecaived } from './actions';

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
  float:left;
  width:200px;
  overflow:hidden;
  @media(max-width:600px){
    float:none;
    width: 100%;
  }
`;
const Right = styled.div`
  float:right;
  width:250px;
  @media(max-width:600px){
    width: 100%;
  }
`;
const Center = styled.div`
  padding-top:0px;
  margin:0 auto;
  width:400px;
  font-size: 1.15em;
  @media(max-width:600px){
    width: 100%;
    font-size: 1.0em;
  }
`;

const H1 = styled.h1`
  width:200px;
  padding-top:4px;
  margin:0px;
  font-size: 1.45em;
  @media(max-width:600px){
    width: 100%;
  }
`;

const H2 = styled.h2`
  font-style:italic;
  margin:0px;
  padding:10px;
  font-size: 1em;
`;

const ButtonCreate = styled(Link)`
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

const ButtonMenu = styled.div`
width: 40px;
display: inline-block;
box-sizing: border-box;
padding: 0.10em 0.25em;
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
&:active {
  background: white ;
  color: #ff4500;
}
`;

const A = styled(Link)`
  color: white;
  text-decoration:none;
`;



const Header = (props) => { // eslint-disable-line react/prefer-stateless-function

  const trips = props.trips || storedTrips;
  console.log('))))))Header', props.trips);

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
          {trips && trips.length > 0 ? <IconMenu
            iconButtonElement={<ButtonMenu><MoreVertIcon /></ButtonMenu>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="My trips:" />
            {trips.map(trip => <Link to={`/ads/edit/${trip.id}`} rightIcon={
                                  <FontIcon className="material-icons" style={{color: '#559'}}>settings</FontIcon>
                                }>
                                  <MenuItem primaryText={trip.title} />
                                </Link>)}
          </IconMenu>: null}
        </Right>
        <Center>
          <H2>„The place to find your travel budy”</H2>
        </Center>
      </PageWrapper>
    </HeaderWrapper>
  );
}

export function mapDispatchToProps(dispatch) {
  // I think is big hack have here
  // the dispatch but it works
  let storedTrips = JSON.parse(localStorage.getItem('created-trips')) || [];
  dispatch(tripsRecaived(storedTrips));
  
  return {
  
  };
}

const mapStateToProps = createStructuredSelector({
  trips: makeSelectTrips()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
