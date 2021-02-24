import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
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
  const [nextTimestamp, setNextTimestamp] = useState<Date | undefined>(
    undefined
  );
  const { data, loading, error, fetchMore } = useQuery(FEED_QUERY, {
    variables: { limit: LINKS_PER_PAGE },
    fetchPolicy: 'no-cache',
    onCompleted: (data: any) => {
      setNextTimestamp(data.feed.nextTimestamp);
    }
  });
  if (
    !loading &&
    !error &&
    data &&
    data.feed &&
    data.feed.links &&
    data.feed.links.length === 0 &&
    newLinks &&
    newLinks.length === 0
  ) {
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
        {data &&
          data.feed &&
          data.feed.links.map((link: any) => (
            <Link link={link} key={link.id} />
          ))}
      </Feed>
      <Button
        attached="bottom"
        content={loading ? 'Loading ...' : 'Load more'}
        loading={loading}
        disabled={loading}
        onClick={() => {
          fetchMore({
            variables: { limit: LINKS_PER_PAGE, beforeTimestamp: nextTimestamp }
          }).then((data: any) => {
            setNextTimestamp(data.feed.nextTimestamp);
          });
        }}
      />
      {error && <Message error content={error} />}
    </Container>
  );
};

export default LinkList;
