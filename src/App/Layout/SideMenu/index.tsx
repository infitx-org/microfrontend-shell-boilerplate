import React, { FC } from 'react';
import { Menu, MenuItem, MenuSection } from 'components';
import { useHistory, useLocation } from 'react-router-dom';

const SideMenu: FC<unknown> = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="layout__side-menu">
      <Menu path="/" pathname={location.pathname} onChange={history.push}>
        <MenuSection label="Apps">
          <MenuItem path="/child" label="Child App microfrontend" partial />
        </MenuSection>
      </Menu>
    </div>
  );
};

export default SideMenu;
