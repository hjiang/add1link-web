import React, { Component } from 'react';
import { Button, Select, Input, Container, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

class LinkListActionTab extends Component {
  state = {
    requestInFlight: false,
    errorReason: null
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.setState({ requestInFlight: true });
    const input = this.state.userInput;

    this.props.saveLinkMutation({
      variables: { url: input }
    }).then(result => {
      const { url, title, id } = result.data.saveLink;
      this.setState({ requestInFlight: false });
      this.props.afterAddLink({ url, title, id });
    }).catch(err => {
      this.setState({
        requestInFlight: false,
        errorReason: err.message  // FIXME: make friendly
      });
    });
  };

  render() {
    const options = [
      { key: 'add', text: 'Add', value: 'add' },
      { key: 'search', text: 'Search', value: 'search' }
    ];
    return (
      <Container>
        <Input type='text' loading={this.state.requestInFlight}
          name='userInput' onChange={this.handleChange}
          action fluid>
          <input />
          <Select compact options={options} defaultValue='add' />
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

// 3
export default graphql(SAVE_LINK_MUTATION, { name: 'saveLinkMutation' })(LinkListActionTab);
