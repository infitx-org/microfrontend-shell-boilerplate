import React, { FC } from 'react';
import { Icon, Tooltip } from 'components';

type NavbarProps = {
  username: string;
};

const Navbar: FC<NavbarProps> = ({ username }) => (
  <div className="layout__navbar">
    <div className="layout__navbar__controls">
      <a className="layout__navbar__link" href="/">
        Sheel Application Container
      </a>
    </div>
    <div className="layout__navbar__user">
      <div className="layout__navbar__user__icon">
        <Icon name="user-small" fill="#fff" />
      </div>
      <div className="layout__navbar__user__name">
        <Tooltip label="logout">{username || '-'}</Tooltip>
      </div>
    </div>
  </div>
);

export default Navbar;
