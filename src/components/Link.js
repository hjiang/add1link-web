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
    let date = new Date(this.props.link.createdAt);
    return (
      <Feed.Event>
        <Feed.Label style={{ width: 'auto', position: 'relative' }}>
          <img style={{
            position: 'absolute', top: '50%', left: '50%', height: '16px',
            width: '16px', margin: '-8px 0 0 -8px', padding: '0'
          }} src={faviconUrl} />
        </Feed.Label>
        <Feed.Content>

          <Feed.Summary>
            <a href={this.props.link.url} style={textStyle}>{this.props.link.title}</a>

          </Feed.Summary>
          <Feed.Meta>
            <Feed.Date style={{ display: 'inline' }}>{date.toLocaleDateString()}</Feed.Date>
            {!this.state.deleted && <Icon name='trash' onClick={this.onDelete} style={{ display: 'inline' }} />}
            {this.state.errorReason && <Message error content={this.state.errorReason} />}
          </Feed.Meta>
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
