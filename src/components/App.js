/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
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
    const activeStyle = { color: 'blue' };
    return (
      <ApolloProvider client={this.apolloClient}>
        <Container style={{ width: '100%', margin: 0 }}>
          <Menu stackable fluid style={{ width: '100%', margin: 0 }}>
            <Menu.Item><NavLink exact to="/" activeStyle={activeStyle}>+1 link</NavLink></Menu.Item>
          </Menu>
          <Container style={{ width: '100%', margin: 0 }}>
            <Switch>
              <Route exact path="/links" component={userIsAuthenticated(LinksPage)} />
              <Route path="/sign-up" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
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
