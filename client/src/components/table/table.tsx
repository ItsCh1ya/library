import React from 'react';

import './table.css';

export interface TableElement {
    id?: string,
    title: string,
    author: string,
    year: string,
    file: string
}

export declare type TableElementGroup = Array<TableElement>;

export interface TableProps {
    elements: TableElementGroup
    action?: {
      isAction: boolean,
      editAction: any,
      deleteAction: any,
    }
}

export function Table(props: TableProps) {
  const { elements, action } = props;

  return (
    <div className="tableBlock">
      {elements.length
        ?
        (
          <table>
            <tr>
              <th>Название</th>
              <th>Автор</th>
              <th>Год выхода</th>
              <th>Файл</th>
              {action?.isAction && <th>Изменить</th>}
            </tr>
            {elements.map((element, index) =>
              (
                <tr key={index}>
                  {action?.isAction && <td className="hiddenElement">{element.id}</td>}
                  <td>{element.title}</td>
                  <td>{element.author}</td>
                  <td>{element.year}</td>
                  <td className="linkFile"><a href={element.file}>link</a></td>
                  {action?.isAction &&
                  <td>
                    <span onClick={action.editAction}>U</span> { /* eslint-disable-line */ }
                    <span onClick={action.deleteAction}>D</span> { /* eslint-disable-line */ }
                  </td>
                  }
                </tr>
              ),
            )}
          </table>
        )
        :
        (
          <div className="emptyTable">Нету книг  :(</div>
        )
      }
    </div>
  );
}
