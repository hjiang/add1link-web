import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'url-polyfill';
import { Feed, Icon, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { LinkRecord } from '../types';

interface LinkProps {
  link: LinkRecord;
  isHovering: bool;
}

const DELETE_LINK_MUTATION = gql`
  mutation DeleteLinkMutation($id: ID!) {
    deleteLink(id: $id)
  }
`;

const Link: React.FC<LinkProps> = ({ link, isHovering }) => {
  const [deleted, setDeleted] = useState(false);
  const [deleteLink, { error }] = useMutation(DELETE_LINK_MUTATION, {
    variables: { id: link.id },
    onCompleted: () => {
      setDeleted(true);
    }
  });

  const url = new URL(link.url);
  const domain = url.hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  const textStyle = deleted
    ? { textDecoration: 'line-through', color: '#898da0' }
    : {};
  const date = new Date(link.createdAt);
  return (
    <Feed.Event>
      <Feed.Label style={{ width: 'auto', position: 'relative' }}>
        <img
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '16px',
            width: '16px',
            margin: '-8px 0 0 -8px',
            padding: '0'
          }}
          src={faviconUrl}
        />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <a href={link.url} style={textStyle}>
            {link.title}
          </a>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Date style={{ display: 'inline' }}>
            {date.toLocaleDateString()}
          </Feed.Date>
          {!deleted && (
            <Icon
              name="trash"
              onClick={deleteLink}
              style={{ display: 'inline' }}
            />
          )}
          {error && <Message error content={error} />}
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default Link;
