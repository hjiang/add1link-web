import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import LinkList from './LinkList';
import LinkListActionTab from './LinkListActionTab';

class LinksPage extends Component {

  afterAddLink = () => {
    // FIXME
  }

  render = () => {
    return (
      <Container text style={{ paddingTop: '1em' }} >
        <LinkListActionTab afterAddLink={this.afterAddLink} />
        <LinkList />
      </Container>
    );
  }
}

export default LinksPage;
