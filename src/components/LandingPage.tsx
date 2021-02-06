import { Container, Header, Button, Icon } from 'semantic-ui-react';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts';

const LandingPage: React.FC = () => {
  const authState = useContext(AuthContext);
  const history = useHistory();

  if (authState.user) {
    history.push('/links');
    return <div>You are already logged in. Redirecting to links page...</div>;
  }
  return (
    <Container text style={{ textAlign: 'center' }}>
      <Header
        as="h1"
        content="+1 link"
        style={{
          fontSize: '3em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '2em'
        }}
      />
      <Header
        as="h2"
        content="The easiest way to save and manage links."
        style={{
          fontSize: '1.5em',
          fontWeight: 'normal',
          marginTop: '2em'
        }}
      />
      <Link to="/sign-up">
        <Button primary size="huge">
          Get Started
          <Icon name="arrow right" />
        </Button>
      </Link>
    </Container>
  );
};

export default LandingPage;
