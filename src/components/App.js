/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, NavLink, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: '/sign-in',
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state => state.auth.user !== null && state.auth.user.sessionToken !== null,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
});

class App extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const activeStyle = { color: 'blue' };
    return (
      <Container style={{width: '100%', margin: 0}}>
        <Menu stackable fluid style={{width: '100%', margin: 0}}>
          <Menu.Item><NavLink exact to="/" activeStyle={activeStyle}>Links</NavLink></Menu.Item>
        </Menu>
        <Container style={{width: '100%', margin: 0}}>
          <Switch>
            {/* TODO: Require auth. */}
            <Route exact path="/" component={HomePage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/numbers/:index/" component={userIsAuthenticated(HomePage)} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </Container>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  auth: PropTypes.object,
};

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default withRouter(connect(mapStateToProps)(App));
