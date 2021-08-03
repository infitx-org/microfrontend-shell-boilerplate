import React from 'react';
import { Menu } from 'components';
import { useHistory, useLocation } from 'react-router-dom';

function MainMenu() {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="layout__side-menu">
      <Menu path="/" pathname={location.pathname} onChange={history.push}>
        <Menu.Section label="Apps">
          <Menu.Item path="/child" label="Child App 1 microfrontend" partial />
          <Menu.Item path="/other" label="Child App 2 microfrontend" partial />
        </Menu.Section>
      </Menu>
    </div>
  );
}

export default MainMenu;
