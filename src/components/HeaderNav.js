import { Menu } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/authActions';
import { gotoUrl } from '../actions/miscActions';

class HeaderNav extends Component {
  handleItemClick = (e, { name }) => {
    const destUrls = {
      login: '/login',
      landing: '/',
      logout: '/',
      links: '/links'
    };
    if (name === 'logout') {
      this.props.actions.logout();
    }
    this.props.actions.gotoUrl(destUrls[name]);
  };

  pathMatch = (path) => this.props.location.pathname === path

  render() {
    return (
      <Menu pointing secondary fluid style={{ width: '100%', margin: 0 }}>
        <Menu.Item name='landing' active={this.pathMatch('/')} onClick={this.handleItemClick}>+1 link</Menu.Item>
        <Menu.Item name='links' active={this.pathMatch('/links')} onClick={this.handleItemClick}>Links</Menu.Item>
        <Menu.Menu position='right'>
          {this.props.auth.user && <Menu.Item>{this.props.auth.user.email}</Menu.Item>}
          {this.props.auth.user ?
            <Menu.Item name='logout'
              active={this.pathMatch('/logout')}
              onClick={this.handleItemClick} /> :
            <Menu.Item name='login'
              active={this.pathMatch('/login')}
              onClick={this.handleItemClick} />}
        </Menu.Menu>
      </Menu>
    );
  }
}

HeaderNav.propTypes = {
  auth: PropTypes.object,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ logout, gotoUrl }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderNav));
