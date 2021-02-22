import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Feed, Button, Container, Message, Icon } from 'semantic-ui-react';
import Link from './Link';

// TODO: hasMore is probably useless
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

interface SearchResultsProps {
  queryString: string;
  onCancel: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  queryString,
  onCancel
}) => {
  const [sid, setSid] = useState<string | undefined>(undefined);
  const { data, loading, error, fetchMore } = useQuery(SEARCH_QUERY, {
    variables: { query: queryString, limit: LINKS_PER_PAGE },
    onCompleted: (data: any) => {
      console.log(data);
      setSid(data.search.sid);
    }
  });
  if (
    !loading &&
    !error &&
    data &&
    data.search &&
    data.search.links &&
    data.search.links.length === 0
  ) {
    return (
      <Container>
        <div>
          Search query: {queryString} <Icon name="cancel" onClick={onCancel} />
        </div>
        <Message content="🤔 You don't have any link matching the query." />
      </Container>
    );
  }
  return (
    <Container>
      <div>
        Search query: {queryString} <Icon name="cancel" onClick={onCancel} />
      </div>
      <Feed>
        {data &&
          data.search &&
          data.search.links &&
          data.search.links.map((link: any) => (
            <Link link={link} key={link.id} />
          ))}
      </Feed>
      <Button
        attached="bottom"
        content={loading ? 'Loading ...' : 'Load more'}
        loading={loading}
        disabled={loading}
        onClick={() => fetchMore({ variables: { sid } })}
      />
      {error && <Message error content={error} />}
    </Container>
  );
};

export default SearchResults;
