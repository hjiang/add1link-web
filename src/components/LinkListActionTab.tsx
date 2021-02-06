import React, { useState } from 'react';
import { Input, Button, Select, Container, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { LinkRecord } from '../types';

// Naive way to check URL, but sufficient for our purpose.
const isWebUrl = (s: string): boolean =>
  s.startsWith('http://') || s.startsWith('https://');

const SAVE_LINK_MUTATION = gql`
  mutation SaveLinkMutation($url: String!, $title: String) {
    saveLink(url: $url, title: $title) {
      id
      title
      url
      createdAt
    }
  }
`;

interface LinkListActionTabProps {
  afterAddLink: (link: LinkRecord) => void;
  onSearch: (term: string) => void;
}

const LinkListActionTab: React.FC<LinkListActionTabProps> = ({
  afterAddLink,
  onSearch
}) => {
  const [userInput, setUserInput] = useState('');
  const [action, setAction] = useState('add');
  const [saveLink, { loading, error }] = useMutation(SAVE_LINK_MUTATION, {
    onCompleted: (data) => {
      setUserInput('');
      afterAddLink(data.saveLink);
    }
  });

  // TODO: turn this input a form and handle submit instead
  const handleSubmit = () => {
    const input = userInput;
    if (input.length === 0) return;

    if (action === 'search') {
      return onSearch(userInput);
    } else {
      saveLink({
        variables: { url: input }
      });
    }
  };

  const options = [
    { key: 'add', text: 'Add', value: 'add' },
    { key: 'search', text: 'Search', value: 'search' }
  ];
  return (
    <Container>
      <Input
        type="text"
        loading={loading}
        name="userInput"
        onChange={(e, { value }) => {
          setUserInput(value);
          if (isWebUrl(value) && action !== 'add') {
            setAction('add');
          } else if (!isWebUrl(value) && action !== 'search') {
            setAction('search');
          }
        }}
        value={userInput}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        placeholder="URL to add or words to search."
        action
        fluid
      >
        <Select
          name="action"
          options={options}
          onChange={(e, { value }) => setAction(value as string)}
          value={action}
          style={{ width: '6em', minWidth: '6em' }}
        />
        {
          // TODO: what is this for?
        }
        <input />{' '}
        <Button type="submit" onClick={handleSubmit}>
          Go
        </Button>
      </Input>
      {error && <Message error content={error} />}
    </Container>
  );
};

export default LinkListActionTab;
