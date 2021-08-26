import React from 'react';
import { Menu } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from 'utils/loader';
import { MenuItemElement } from '@modusbox/react-components/lib/components/Menu/types';
import microfrontends from 'microfrontends';

function getMenuItems(pathname: string, onChange: (path: string) => void) {
  return microfrontends.map(({ path, label, menuComponent, url, appName }) => {
    return (
      <Menu.Item key={path} path={path} label={label} partial>
        <Menu.Item path="/" label="back to main menu" back />
        <Loader
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

function MainMenu() {
  const history = useHistory();
  const location = useLocation();
  const menuProps = {
    path: '/',
    pathname: location.pathname,
    onChange: history.push,
  };

  const menuItems = (getMenuItems(location.pathname, history.push) as unknown) as MenuItemElement;

  const menu = (
    <Menu {...menuProps}>
      <Menu.Section label="Apps">
        {menuItems}
        <Menu.Item path="/other" label="Child App 2 microfrontend" />
      </Menu.Section>
    </Menu>
  );

  return <div className="layout__side-menu">{menu}</div>;
}

export default MainMenu;
