import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import LinksPage from './LinksPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import HeaderNav from './HeaderNav';
import LandingPage from './LandingPage';
import { AuthContext, initialAuthState } from '../contexts';

const App: React.FC = () => {
  const [authState] = useState(initialAuthState);
  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <Container style={{ width: '100%', margin: 0 }}>
          <HeaderNav />
          <Container style={{ width: '100%', margin: 0, minHeight: '20em' }}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/links" component={LinksPage} />
              <Route path="/sign-up" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
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
    </AuthContext.Provider>
  );
};

export default App;
