import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Feed, Container } from 'semantic-ui-react';
import Link from './Link';

class LinkList extends Component {
  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>;
    }
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>{this.props.feedQuery.error}</div>;
    }

    const linksToRender = this.props.feedQuery.feed.links;
    return (
      <Container text>
        <Feed>{linksToRender.map(link => <Link key={link.id} link={link} />)}</Feed>
      </Container>
    );
  }
}

LinkList.propTypes = {
  feedQuery: PropTypes.object.isRequired
};

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        url
        title
      }
      nextTimestamp
    }
  }
`;

export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList);
