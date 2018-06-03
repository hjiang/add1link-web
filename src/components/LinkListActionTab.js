import React, { Component } from 'react';
import { Input, Button, Select, Container, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

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
  };

  handleSubmit = () => {
    if (this.state.action === 'search') {
      this.setState({ errorReason: 'Search is not implemented yet.' });
      return;
    }
    this.setState({ requestInFlight: true });
    const input = this.state.userInput;

    this.props.saveLinkMutation({
      variables: { url: input }
    }).then(result => {
      const { url, title, id } = result.data.saveLink;
      this.setState({ requestInFlight: false, userInput: '' });
      this.props.afterAddLink({ url, title, id });
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

  render() {
    const options = [
      { key: 'add', text: 'Add', value: 'add' },
      { key: 'search', text: 'Search', value: 'search' }
    ];
    return (
      <Container>
        <Input type='text' loading={this.state.requestInFlight}
          name='userInput' onChange={this.handleChange} value={this.state.userInput}
          onKeyPress={this.onKeyPress}
          action fluid>
          <Select name='action' defaultValue='add' options={options} onChange={this.handleChange}
            style={{ width: '8em', minWidth: '8em' }} />
          <input />
          <Button type='submit' onClick={this.handleSubmit}>Go</Button>
        </Input>
        {this.state.errorReason && <Message error content={this.state.errorReason} />}
      </Container>
    );
  }
}

LinkListActionTab.propTypes = {
  saveLinkMutation: PropTypes.func.isRequired,
  afterAddLink: PropTypes.func.isRequired
};

const SAVE_LINK_MUTATION = gql`
  mutation SaveLinkMutation($url: String!, $title: String) {
    saveLink(url: $url, title: $title) {
      id
      title
      url
    }
  }
`;

export default graphql(SAVE_LINK_MUTATION, { name: 'saveLinkMutation' })(LinkListActionTab);
