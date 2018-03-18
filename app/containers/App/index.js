/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import * as queryString from 'query-string';

import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import CountryEditorPage from '../../Admin/CountryEditorPage'
import CountryListPage from '../../Admin/CountriesListPage'
import AdsCreatePage from '../../AdsCreatePage'
import AdsListPage from '../../AdsListPage'
import TripDetailPage from '../../TripDetailPage'
import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const PageWrapper = styled.div`
max-width: calc(1140px + 16px * 2);
margin: 0 auto;
display: flex;
min-height: 100%;
padding: 0 16px;
flex-direction: column;
`;

const httpLink = createHttpLink({
  uri:'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('user.token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App(props) {
  const { history } = props;
  
  let search = queryString.parse(window.location.search)
  console.log('let search = queryString.parse(window.location.search)', search);
  let course = false;

  let emailToken = null;

  if(search){
    if(search.edittrip) {
      course = `/ads/edit/${search.edittrip}`;
    } else if(search.trip) {
      course = `/trip/${search.trip}`;
    } else if(search.editor) {
      course = '/ads/editor'
    }
    
    if(search.emailToken){
      emailToken = search.emailToken;
      // window.location.search = '';
    }
  }

  

  if(course) {
    if(window.location.hash){
      course += window.location.hash
    }

    history.push(course);
  }
  //

  return (
    <ApolloProvider client={client}>
    
      <AppWrapper>
        <Helmet
          titleTemplate="%s - www.triphub.cz - the place to find your travel buddy :-)"
          defaultTitle="www.triphub.cz - the place to find your travel buddy :-)"
        >
          <meta name="description" content="www.triphub.cz - the place to find your travel buddy :-)" />
        </Helmet>
        <Header emailToken={emailToken} />
        <PageWrapper>
        <Switch>
          <Route exact path="/" component={AdsListPage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="/admin/countries/:id" component={CountryEditorPage} />
          <Route exact path="/admin/countries" component={CountryListPage} />
          <Route exact path="/ads/create" component={AdsCreatePage} />
          <Route exact path="/ads/edit/:id" component={AdsCreatePage} />
          <Route exact path="/trip/:id" component={TripDetailPage} />
          <Route exact path="/ads/editor" render={routeProps => <AdsListPage {...routeProps} showEditButton={true}/>} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        </PageWrapper>
        <Footer />
      </AppWrapper>
    </ApolloProvider>
  );
}
