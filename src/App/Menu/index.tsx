import React from 'react';
import { Menu } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
import { MenuOne } from 'App/Microfrontends';

function MainMenu() {
  const history = useHistory();
  const location = useLocation();
  const menuProps = {
    path: '/',
    pathname: location.pathname,
    onChange: history.push,
  };

  const menu = (
    <Menu {...menuProps}>
      <Menu.Section label="Apps">
        <Menu.Item path="/child" label="Child App 1 microfrontend" />
        <Menu.Item path="/other" label="Child App 2 microfrontend" />
      </Menu.Section>
    </Menu>
  );

  // if (location.pathname.startsWith('/child')) {
  //   menu = ;
  // }

  return (
    <div className="layout__side-menu">
      {menu}
      <MenuOne path="/child" pathname={location.pathname} onChange={history.push} />
    </div>
  );
}

export default MainMenu;
