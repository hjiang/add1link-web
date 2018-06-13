import React, { Component } from 'react';
import { Input, Button, Select, Container, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

// Naive way to check URL, but sufficient for our purpose.
const isWebUrl = s => s.startsWith('http://') || s.startsWith('https://');

class LinkListActionTab extends Component {
  state = {
    requestInFlight: false,
    errorReason: null,
    userInput: '',
    action: 'add'
  }

  constructor(props) {
    super(props);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    if (name === 'userInput') {
      if (isWebUrl(value) && this.state.action !== 'add') {
        this.setState({ action: 'add' });
      } else if (!isWebUrl(value) && this.state.action !== 'search') {
        this.setState({action: 'search'});
      }
    }
  };

  handleSubmit = () => {
    const input = this.state.userInput;
    if (input.length === 0) return;

    if (this.state.action === 'search') {
      this.setState({ errorReason: null });
      return this.props.onSearch(this.state.userInput);
    }

    this.setState({ requestInFlight: true });
    this.props.saveLinkMutation({
      variables: { url: input }
    }).then(result => {
      const { url, title, id, createdAt } = result.data.saveLink;
      this.setState({ requestInFlight: false, userInput: '', errorReason: null });
      this.props.afterAddLink({ url, title, id, createdAt });
    }).catch(err => {
      this.setState({
        requestInFlight: false,
        errorReason: err.message  // FIXME: make friendly
      });
    });
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  onDismissError = () => {
    this.setState({ errorReason: null });
  }

  render() {
    const options = [
      { key: 'add', text: 'Add', value: 'add' },
      { key: 'search', text: 'Search', value: 'search' }
    ];
    return (
      <Container>
        <Input type='text' loading={this.state.requestInFlight}
          name='userInput' onChange={this.handleChange} value={this.state.userInput}
          onKeyPress={this.onKeyPress} placeholder='URL to add or words to search.'
          action fluid>
          <Select name='action' options={options} onChange={this.handleChange}
            value={this.state.action} style={{ width: '6em', minWidth: '6em' }} />
          <input />
          <Button type='submit' onClick={this.handleSubmit}>Go</Button>
        </Input>
        {this.state.errorReason && <Message error content={this.state.errorReason}
          onDismiss={this.onDismissError} />}
      </Container>
    );
  }
}

LinkListActionTab.propTypes = {
  saveLinkMutation: PropTypes.func.isRequired,
  afterAddLink: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

const SAVE_LINK_MUTATION = gql`
  mutation SaveLinkMutation($url: String!, $title: String) {
    saveLink(url: $url, title: $title) {
      id
      title
      url
      createdAt
    }
  }
`;

export default graphql(SAVE_LINK_MUTATION, { name: 'saveLinkMutation' })(LinkListActionTab);
