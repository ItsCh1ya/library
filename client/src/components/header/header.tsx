import React from 'react';
import { HeaderMenu, MenuElement } from '../menu';
import { HeaderLogo, HeaderLogoProps } from './headerLogo';

import './header.css';

export interface HeaderProps {
	logo: HeaderLogoProps,
	menuElement: Array<MenuElement>
}

export function Header(props: HeaderProps) {
  const { logo, menuElement } = props;

  return (
    <header>
      <div className="Header container">
        { <HeaderLogo {...logo} /> }

        <div className="Header_menu">
          <HeaderMenu elements={menuElement} />
        </div>
      </div>
    </header>
  );
}
