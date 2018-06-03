import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'url-polyfill';
import { Feed, Icon, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Link extends Component {
  state = {
    deleted: false,
    errorReason: ''
  }

  onDelete = () => {
    this.props.deleteLinkMutation({
      variables: { id: this.props.link.id }
    }).then(() => {
      this.setState({ deleted: true });
    }).catch(err => {
      this.setState({
        errorReason: err.message
      });
    });
  }

  render() {
    const url = new URL(this.props.link.url);
    const domain = url.hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
    let textStyle = this.state.deleted ? { textDecoration: 'line-through' } : {};
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <img style={{ width: 'auto', height: 'auto', marginRight: '0.5em' }} src={faviconUrl} /><a href={this.props.link.url} style={textStyle}>{this.props.link.title}</a>
            {this.props.isHovering && !this.state.deleted && <Icon name='trash' size='small' onClick={this.onDelete} />}
            <Feed.Meta>
              {this.state.errorReason && <Message error content={this.state.errorReason} />}
            </Feed.Meta>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

Link.propTypes = {
  link: PropTypes.object.isRequired,
  isHovering: PropTypes.bool,
  deleteLinkMutation: PropTypes.func.isRequired
};

const DELETE_LINK_MUTATION = gql`
  mutation DeleteLinkMutation($id: ID!) {
    deleteLink(id: $id)
  }
`;

export default graphql(DELETE_LINK_MUTATION, { name: 'deleteLinkMutation' })(Link);
