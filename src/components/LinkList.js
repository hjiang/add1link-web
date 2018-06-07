import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Feed, Button, Container, Message } from 'semantic-ui-react';
import Link from './Link';

const FEED_QUERY = gql`
  query FeedQuery($beforeTimestamp: String, $limit: Int) {
    feed(beforeTimestamp: $beforeTimestamp, limit: $limit) {
      links {
        id
        url
        title
        createdAt
      }
      nextTimestamp
    }
  }
`;

const LINKS_PER_PAGE = 20;

class LinkList extends Component {
  render() {
    return (
      <Query
        query={FEED_QUERY}
        variables={{ limit: LINKS_PER_PAGE }}
        fetchPolicy='cache-and-network'>
        {
          ({ loading, data, error, fetchMore }) => {
            if (!loading && data.feed && data.feed.links.length === 0 &&
            this.props.newLinks.length === 0) {
              return <Message content="🤔 You don't have any link. Add one above to start! ☝️" />;
            }
            return (
              <Container>
                <Feed>
                  {this.props.newLinks.map(link => <Link link={link} key={link.id} />)}
                  {data.feed && data.feed.links.map(link => <Link link={link} key={link.id} />)}
                </Feed>
                <Button
                  attached='bottom'
                  content={loading ? 'Loading ...' : 'Load more'}
                  loading={loading}
                  onClick={() => {
                    fetchMore({
                      variables: {
                        limit: LINKS_PER_PAGE,
                        beforeTimestamp: data.feed.nextTimestamp
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        if (fetchMoreResult.feed.links.length === 0) {
                          return prev;
                        }
                        return Object.assign({}, prev, {
                          feed: Object.assign({}, prev.feed, {
                            links: [
                              ...prev.feed.links,
                              ...fetchMoreResult.feed.links
                            ],
                            nextTimestamp: fetchMoreResult.feed.nextTimestamp
                          })
                        });
                      }
                    });
                  }}
                />
                {error && <Message error content={error} />}
              </Container>
            );
          }
        }
      </Query>
    );
  }
}

LinkList.propTypes = {
  newLinks: PropTypes.array.isRequired
};

export default LinkList;
