/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset';

import LinksPage from './LinksPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import HeaderNav from './HeaderNav';
import LandingPage from './LandingPage';

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state => state.auth.user !== null &&
    state.auth.token !== null,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
});

class App extends React.Component {

  constructor(props) {
    super(props);
    const httpLink = new HttpLink({ uri: 'https://links-api.avosapps.us/graphql/' });

    const middlewareAuthLink = new ApolloLink((operation, forward) => {
      const token = this.props.auth.token;
      operation.setContext({
        headers: {
          authorization: token
        }
      });
      return forward(operation);
    });
    const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);
    this.apolloClient = new ApolloClient({
      link: httpLinkWithAuthToken,
      cache: new InMemoryCache()
    });
  }


  render() {
    return (
      <ApolloProvider client={this.apolloClient}>
        <Container style={{ width: '100%', margin: 0 }}>
          <HeaderNav />
          <Container style={{ width: '100%', margin: 0, minHeight: '20em' }}>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path="/links" component={userIsAuthenticated(LinksPage)} />
              <Route path="/sign-up" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Container>
          <Container text style={{ marginTop: '5em', textAlign: 'center' }}>
            <p>Copied with ❤️ from StackOverflow.
            Hosted on <a href="https://leancloud.cn">LeanCloud</a>.</p>
            <p>Browser extensions: <a href="https://chrome.google.com/webstore/detail/add-1-link-extension/npjhpkhnhdkcglekeailemkebeceigka" target="_blanck" rel="noopener noreferrer">Chrome</a></p>
          </Container>
        </Container>
      </ApolloProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  auth: PropTypes.object,
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(App));
