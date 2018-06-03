import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Feed } from 'semantic-ui-react';
import Link from './Link';
import ReactHoverObserver from 'react-hover-observer';

class LinkList extends Component {
  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>;
    }
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>{this.props.feedQuery.error}</div>;
    }

    let linksToRender = this.props.newLinks.concat(this.props.feedQuery.feed.links);
    return (
      <Feed>{linksToRender.map(link =>
        <ReactHoverObserver key={link.id}>
          <Link link={link} />
        </ReactHoverObserver>)}</Feed>
    );
  }
}

LinkList.propTypes = {
  feedQuery: PropTypes.object.isRequired,
  newLinks: PropTypes.array.isRequired
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
