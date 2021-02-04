import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Message, Header } from 'semantic-ui-react';
import { gql, useMutation } from '@graphql/client';
import { AuthState } from '../contexts';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

interface LoginPageProps {
  onLogin: (authState: AuthState) => AuthState;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      onLogin(data);
      history.push('/links');
    }
  });
  handleSubmit = () => {
    login({ variables: { email, password } });
  };

  return (
    <Container
      style={{ marginTop: '5em', paddingLeft: '2em', paddingRight: '2em' }}
    >
      <Header as="h1">Login</Header>
      <Form onSubmit={handleSubmit} error={!!error}>
        <Form.Input
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Message error content={error} />}
        <Form.Button primary loading={loading} type="submit">
          Submit
        </Form.Button>
      </Form>
      <p>
        Need an account? <Link to="/sign-up">Sign up</Link>.
      </p>
    </Container>
  );
};

export default LoginPage;
