import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import messages from './messages';

import { compose as composeApollo, graphql } from 'react-apollo'

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

import { 
  makeSelectTrips, 
  makeSelectEmail, 
  makeSelectEmailTokenProcessed,
  makeSelectToken,
} from './selectors';

import { 
  tripsRecaived, 
  emailRecaived,
  emailTokenProcessed,
  tokenRecaived,
} from './actions';

import verifyUserEmailGL from '../../graphql/verifyUserEmail';
import meGL from '../../graphql/me';

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




const Header = (props, dispatch) => { // eslint-disable-line react/prefer-stateless-function

  const setupUser = (user, data) => {
    console.log(user, data);
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user.id', user.id);
    localStorage.setItem('user.email', user.email);
    localStorage.setItem('user.token', user.token);
    localStorage.setItem('user.imageUrl', user.imageUrl);
    localStorage.setItem('user.trips', JSON.stringify(user.trips));
    localStorage.setItem('user.favorites',JSON.stringify(user.favorites));
    localStorage.setItem('user.commented', JSON.stringify(user.commented));
    
    if(user.trips && user.trips.length > 0){
      props.recaivedNewTrips(user.trips);
    } 
    
    if(user.email) {
      props.recaivedEmail(user.email);
    }

    if(user.token){
      props.recaivedToken(user.token);
    }
    
  }

  const trips = props.trips || storedTrips;
  console.log('))))))Header', props.trips);
  // not repeat the action any time
  // when the props are changed
  if(!props.checkEmailTokenProcessed){
    
    if(props.emailToken){
      // take action for stop repeat
      props.emailTokenProcessed(props.emailToken);
      
      props.verifyUserEmail({emailToken: props.emailToken}).then((data) => {
        let user = data.data && data.data.verifyUserEmail ? data.data.verifyUserEmail : null
        
        setupUser(user, data);
      })
    } else if(props.token){
      // take action for stop repeat
      props.emailTokenProcessed(props.token);

      localStorage.setItem('user.token', props.token);

      props.me.refetch({}).then((data) => {
        let user = data.data && data.data.me ? data.data.me : null
        
        setupUser(user, data);
      });
    }
  }
  

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
            <MenuItem primaryText={`${props.email}`} />
            {trips.map(trip => <Link to={`/ads/edit/${trip.id}`} rightIcon={
                                  <FontIcon className="material-icons" style={{color: '#559'}}>settings</FontIcon>
                                }>
                                  <MenuItem primaryText={trip.title} />
                                </Link>)}
          </IconMenu>: null}
        </Right>
        <Center>
          <H2>„The place to find your travel buddy”</H2>
        </Center>
      </PageWrapper>
    </HeaderWrapper>
  );
}

export function mapDispatchToProps(dispatch) {
  // I think is big hack have here
  // the dispatch but it works
  let storedTrips = JSON.parse(localStorage.getItem('user.trips')) || [];
  dispatch(tripsRecaived(storedTrips));
  
  let email = localStorage.getItem('user.email');
  if(email){
    dispatch(emailRecaived(email));
  }

  let token = localStorage.getItem('token');
  if(token){
    dispatch(tokenRecaived(token))
  }

  return {
    recaivedNewTrips(trips){
      dispatch(tripsRecaived(trips));
    },

    recaivedEmail(email){
      dispatch(emailRecaived(email))
    },

    emailTokenProcessed(emailToken){
      dispatch(emailTokenProcessed(emailToken))
    },

    recaivedToken(token){
      dispatch(tokenRecaived(token))
    },
  };
}

const mapStateToProps = createStructuredSelector({
  trips: makeSelectTrips(),
  email: makeSelectEmail(),
  checkEmailTokenProcessed: makeSelectEmailTokenProcessed(),
  token: makeSelectToken(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

const HeaderContainer = compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);


export default composeApollo(
  graphql(verifyUserEmailGL, {name: 'verifyUserEmail', skip1: (ownProps) => {
    return !ownProps.emailToken;
  }}),
  graphql(meGL, {name: 'me', skip1: (ownProps) => {
    return !ownProps.token;
  }})
)(HeaderContainer);