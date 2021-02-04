import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/Client';
import { Feed, Button, Container, Message } from 'semantic-ui-react';
import { LinkRecord } from '../types';
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

interface LinkListsProps {
  newLinks: LinkRecord[];
}

const LinkList: React.FC<LinkListsProps> = ({ newLinks }) => {
  const [linkRecords, setLinkRecords] = useState<LinkRecord[]>([]);
  const [nextTimestamp, setNextTimestamp] = useState<Date | undefined>(
    undefined
  );
  const [loadFeed, { loading, error }] = useQuery(FEED_QUERY, {
    onCompleted: (data) => {
      setLinkRecords([...linkRecords, data.links]);
      setNextTimestamp(data.nextTimestamp);
    }
  });
  useEffect(() => {
    loadFeed({ variables: { limit: LINKS_PER_PAGE } });
  }, []);
  if (!loading && !error && linkRecords.length === 0 && newLinks.length === 0) {
    return (
      <Message content="🤔 You don't have any link. Add one above to start! ☝️" />
    );
  }

  return (
    <Container>
      <Feed>
        {newLinks.map((link) => (
          <Link link={link} key={link.id} />
        ))}
        {linkRecords.map((link) => (
          <Link link={link} key={link.id} />
        ))}
      </Feed>
      <Button
        attached="bottom"
        content={loading ? 'Loading ...' : 'Load more'}
        loading={loading}
        disabled={loading}
        onClick={() => {
          loadFeed({
            variables: { limit: LINKS_PER_PAGE, beforeTimestamp: nextTimestamp }
          });
        }}
      />
      {error && <Message error content={error} />}
    </Container>
  );
};

export default LinkList;
