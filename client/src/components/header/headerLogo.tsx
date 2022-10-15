import React from 'react';
import { Link } from 'react-router-dom';

import './headerLogo.css';

export interface HeaderLogoProps {
	value: string,
	url: string
}

export function HeaderLogo(props: HeaderLogoProps) {
  const { value, url } = props;

  return (
    <div className="Header_logo">
      <Link to={url}>{value}</Link>
    </div>
  );
}
