import React, { Dispatch } from 'react';

import './search.css';

export declare type SearchParam = string | undefined;

export interface SearchProps {
  param: SearchParam,
  onChangeParam: Dispatch<React.SetStateAction<SearchParam>>
}

export function Search(props: SearchProps) {
  const { param, onChangeParam } = props;

  return (
    <div>
      <input className="search" type="text" value={param} onChange={(event) => onChangeParam(event.target.value)} /> { /* eslint-disable-line */ }
    </div>
  );
}
