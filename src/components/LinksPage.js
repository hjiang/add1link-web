import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import LinkList from './LinkList';
import LinkListActionTab from './LinkListActionTab';
import SearchResults from './SearchResults';

class LinksPage extends Component {
  state = {
    newLinks: [],
    queryString: ''
  }

  afterAddLink = link => {
    this.setState(prevState => {
      const preNewLinks = prevState.newLinks;
      const newLinks = [link, ...preNewLinks];
      return { ...prevState, newLinks, queryString: '' };
    });
  }

  onSearch = queryString => {
    this.setState({ queryString, newLinks: [] });
  }

  onCancelSearch = () => {
    this.setState({ queryString: '', newLinks: [] });
  }

  render = () => {
    return (
      <Container text style={{ paddingTop: '1em' }} >
        <LinkListActionTab afterAddLink={this.afterAddLink} onSearch={this.onSearch} />
        {
          this.state.queryString ?
            <SearchResults queryString={this.state.queryString} onCancel={this.onCancelSearch} /> :
            <LinkList newLinks={this.state.newLinks} />
        }
      </Container>
    );
  }
}

export default LinksPage;
