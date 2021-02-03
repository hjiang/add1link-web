import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts';

const Protected: React.FC = ({ children }) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  if (authContext.user) {
    return children;
  } else {
    history.push('/login');
    return <div>Redirecting ...</div>;
  }
};

export const protect = (c: React.Component): React.Component => {
  return (
    <Protected>
      <c />
    </Protected>
  );
};

export default Protected;
