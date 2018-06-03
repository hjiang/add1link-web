import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import LinkList from './LinkList';
import LinkListActionTab from './LinkListActionTab';

class LinksPage extends Component {
  state = {
    newLinks: []
  }

  afterAddLink = link => {
    this.setState(prevState => {
      const preNewLinks = prevState.newLinks;
      const newLinks = [link, ...preNewLinks];
      return { ...prevState, newLinks };
    });
  }

  render = () => {
    return (
      <Container text style={{ paddingTop: '1em' }} >
        <LinkListActionTab afterAddLink={this.afterAddLink} />
        <LinkList newLinks={this.state.newLinks}/>
      </Container>
    );
  }
}

export default LinksPage;
