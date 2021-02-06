import { Menu } from 'semantic-ui-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts';

interface HeaderNavProps {
  onLogout: () => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ onLogout }) => {
  const pathMatch = (path: string) => window.location.pathname === path;
  const auth = useContext(AuthContext);

  return (
    <Menu pointing secondary fluid style={{ width: '100%', margin: 0 }}>
      <Menu.Item name="landing" active={pathMatch('/')}>
        <Link to="/">+1 link</Link>
      </Menu.Item>
      <Menu.Item name="links" active={pathMatch('/links')}>
        <Link to="/links">Links</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        {auth.user && <Menu.Item>{auth.user.email}</Menu.Item>}
        {auth.user ? (
          <Menu.Item
            name="logout"
            content="Logout"
            active={pathMatch('/logout')}
            onClick={onLogout}
          />
        ) : (
          <Menu.Item name="login" active={pathMatch('/login')}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default HeaderNav;
