import React from 'react';
import { Table, TableProps } from '../../../components/table';

import './main.css';

export interface MainProps extends TableProps {
    endElemens: boolean;
}

export function Main(props: MainProps) {
  return (
    <main>
      <div className="container">
        <Table {...props} />
        {props.endElemens && <span style={{ textAlign: 'center', display: 'block' }}>Книги закончились(((</span>}
      </div>
    </main>
  );
}
