import React from 'react';
import { Link } from 'react-router-dom';

import './menu.css';

export interface MenuElement {
    value: string,
    url: string
}

export interface MenuProps {
    elements: Array<MenuElement>
}

export function HeaderMenu(props: MenuProps) {
  const { elements } = props;

  return (
    <ul className="Menu">
      {elements.map((el: MenuElement, index: number) =>
        <li key={index}><Link to={el.url}>{el.value}</Link></li>,
      )}
    </ul>
  );
}
