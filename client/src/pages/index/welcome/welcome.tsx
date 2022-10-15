import React from 'react';
import { Search, SearchProps } from '../../../components/search';

import './welcome.css';

export function Welcome(props: SearchProps) {
  return (
    <div className="Welcome">
      <div className="container">
        <h1>Library</h1>
        <Search {...props} />
      </div>
    </div>
  );
}
