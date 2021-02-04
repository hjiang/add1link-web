import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import LinksPage from './LinksPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import HeaderNav from './HeaderNav';
import LandingPage from './LandingPage';
import { protect } from './Protected';
import { AuthContext, initialAuthState, saveAuthState, clearAuthState } from '../contexts';

const App: React.FC = () => {
  const [authState, setAuthState] = useState(initialAuthState);
  const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      authorization: authState.token
    }
  });
  const onLogin = (authState: AuthState): AuthState => {
    setAuthState(authState);
    return saveAuthState(authState);
  };
  const onSignUp = onLogin;
  const onLogout = () => {
    setAuthState(clearAuthState);
  }
  return (
    <AuthContext.Provider value={authState}>
      <ApolloProvider client={client}>
        <Router>
          <Container style={{ width: '100%', margin: 0 }}>
            <HeaderNav onLogout={onLogout} />
            <Container style={{ width: '100%', margin: 0, minHeight: '20em' }}>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/links" component={protect(LinksPage)} />
                <Route
                  path="/sign-up"
                  render={() => <SignUpPage onSignUp={onSignUp} />}
                />
                <Route
                  path="/login"
                  render={() => <LoginPage onLogin={onLogin} />}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Container>
            <Container text style={{ marginTop: '5em', textAlign: 'center' }}>
              <p>
                Copied with ❤️ from StackOverflow. Hosted on{' '}
                <a href="https://leancloud.cn">LeanCloud</a> (US West).
              </p>
              <p>
                Browser extensions:{' '}
                <a
                  href="https://chrome.google.com/webstore/detail/add-1-link-extension/npjhpkhnhdkcglekeailemkebeceigka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chrome
                </a>{' '}
                |{' '}
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/1-link-extension/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firefox
                </a>
              </p>
            </Container>
          </Container>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default App;
