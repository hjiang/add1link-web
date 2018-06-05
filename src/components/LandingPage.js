import { Container, Header, Button, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gotoUrl } from '../actions/miscActions';
import { bindActionCreators } from 'redux';

class LandingPage extends Component {
  render() {
    if (this.props.auth.user) {
      this.props.actions.gotoUrl('/links');
      return <div>You are already logged in. Redirecting to links page...</div>;
    }
    return (
      <Container text style={{textAlign: 'center'}}>
        <Header
          as='h1'
          content='Add-1-link'
          style={{
            fontSize: '3em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '2em',
          }}
        />
        <Header
          as='h2'
          content='The easiest way to save and manage links.'
          style={{
            fontSize: '1.5em',
            fontWeight: 'normal',
            marginTop: '2em',
          }}
        />
        <Link to='/sign-up'>
          <Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
          </Button>
        </Link>
      </Container>
    );
  }
}

LandingPage.propTypes = {
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ gotoUrl }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
