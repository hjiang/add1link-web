import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Message, Header } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { AuthState } from '../contexts';

const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

interface SignUpPageProps {
  onSignUp: (authState: AuthState) => AuthState;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      onSignUp(data);
      history.push('/links');
    }
  });
  handleSubmit = () => {
    signUp({ variables: { email, password } });
  };

  return (
    <Container
      style={{ marginTop: '5em', paddingLeft: '2em', paddingRight: '2em' }}
    >
      <Header as="h1">Sign Up</Header>
      <Form onSubmit={handleSubmit} error={!!error}>
        <Form.Input
          label="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
        Already have an account? <Link to="/login">Sign in</Link>.
      </p>
    </Container>
  );
};

export default SignUpPage;
