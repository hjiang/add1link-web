import { Container, Header, Button, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <Container text style={{textAlign: 'center'}}>
        <Header
          as='h1'
          content='Add 1 Link'
          style={{
            fontSize: '3em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '2em',
          }}
        />
        <Header
          as='h2'
          content='Literally the easiest way to add a link.'
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

export default LandingPage;
