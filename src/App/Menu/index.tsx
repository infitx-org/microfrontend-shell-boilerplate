import React from 'react';
import { Menu } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from 'utils/loader';
import { MenuItemElement } from '@modusbox/react-components/lib/components/Menu/types';
import { Remote } from 'App/types';
import './Menu.scss';

function getMenuItems(remotes: Remote[], pathname: string, onChange: (path: string) => void) {
  return remotes.map(({ path, label, menuComponent, url, appName }) => {
    return (
      <Menu.Item key={path} path={path} label={label} partial>
        <Menu.Item path="/" label="back to main menu" back />
        <Loader
          main={false}
          url={url}
          appName={appName}
          component={menuComponent}
          pathname={pathname}
          onChange={onChange}
          path={path}
        />
      </Menu.Item>
    );
  });
}

interface MainMenuProps {
  remotes: Remote[];
}
function MainMenu({ remotes }: MainMenuProps) {
  const history = useHistory();
  const location = useLocation();
  const menuProps = {
    path: '/',
    pathname: location.pathname,
    onChange: history.push,
  };

  const menuItems = getMenuItems(
    remotes,
    location.pathname,
    history.push,
  ) as unknown as MenuItemElement;

  const menu = (
    <Menu {...menuProps}>
      <Menu.Section label="Apps">{menuItems}</Menu.Section>
    </Menu>
  );

  return <div className="app__menu">{menu}</div>;
}

export default MainMenu;
