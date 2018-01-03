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

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import CountryEditorPage from '../../Admin/CountryEditorPage'
import CountryListPage from '../../Admin/CountriesListPage'
import AdsCreatePage from '../../AdsCreatePage'
import AdsListPage from '../../AdsListPage'
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

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({uri:'https://api.graph.cool/simple/v1/cjb646u2r08sq0159u7r9hvu6'}),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
    
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Trip hub - find your friend to travel"
          defaultTitle="Trip hub - find your friend to travel"
        >
          <meta name="description" content="Trip hub - find your friend to travel" />
        </Helmet>
        <Header />
        <PageWrapper>
        <Switch>
          <Route exact path="/" component={AdsListPage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="/admin/countries/:id" component={CountryEditorPage} />
          <Route exact path="/admin/countries" component={CountryListPage} />
          <Route exact path="/ads/create" component={AdsCreatePage} />
          <Route exact path="/ads/edit/:id" component={AdsCreatePage} />
          <Route exact path="/ads/editor" render={routeProps => <AdsListPage {...routeProps} showEditButton={true}/>} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        </PageWrapper>
        <Footer />
      </AppWrapper>
    </ApolloProvider>
  );
}
