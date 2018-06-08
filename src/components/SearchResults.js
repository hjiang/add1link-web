import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Feed, Button, Container, Message, Icon } from 'semantic-ui-react';
import Link from './Link';

const SEARCH_QUERY = gql`
  query SearchQuery($query: String!, $limit: Int, $sid: String) {
    search(query: $query, limit: $limit, sid: $sid) {
      links {
        id
        url
        title
        createdAt
      }
      sid
      hasMore
    }
  }
`;

const LINKS_PER_PAGE = 20;

class SearchResults extends Component {
  state = {}

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <Query
        query={SEARCH_QUERY}
        variables={{ query: this.props.queryString, limit: LINKS_PER_PAGE }}
        fetchPolicy='cache-and-network'>
        {
          ({ loading, data, error, fetchMore }) => {
            if (!loading && data.search && data.search.links.length === 0) {
              return <Message content="🤔 You don't have any link matching the query." />;
            }
            return (
              <Container>
                <div>Search query: {this.props.queryString} <Icon name='cancel' onClick={this.onCancel} /></div>
                <Feed>
                  {data.search && data.search.links.map(link => <Link link={link} key={link.id} />)}
                </Feed>
                <Button
                  attached='bottom'
                  content={loading ? 'Loading ...' : 'Load more'}
                  loading={loading}
                  onClick={() => {
                    fetchMore({
                      variables: {
                        query: this.props.queryString,
                        limit: LINKS_PER_PAGE,
                        sid: data.search.sid
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        if (fetchMoreResult.search.links.length === 0) {
                          return prev;
                        }
                        return Object.assign({}, prev, {
                          search: Object.assign({}, prev.search, {
                            links: [
                              ...prev.search.links,
                              ...fetchMoreResult.search.links
                            ],
                            sid: fetchMoreResult.search.sid,
                            hasMore: fetchMoreResult.search.hasMore
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

SearchResults.propTypes = {
  queryString: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default SearchResults;
