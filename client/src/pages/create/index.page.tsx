import React, { useCallback, useEffect, useState } from 'react';
import { TableElement } from '../../components/table';
import { sendRequest } from '../../libs/actionData';
import { Main } from '../index/main';
import { Form } from './form';

function Create() {
  const [actionButton, setActionButton] = useState<string>('Добавить');
  const [actionType, setActionType] = useState<string | undefined>();
  const [data, setData] = useState<any>([]);
  const [form, setForm] = useState<TableElement>({
    id: '',
    title: '',
    author: '',
    year: '',
    file: '',
  });

  const actionTable = useCallback((event: any) => {
    const target = event.target;
    const dataElements = target.parentElement.parentElement.querySelectorAll('td');
    const dataArray = Array(...dataElements || []);
    const dataValue = [...dataArray.slice(0, 4).map((el) => el.innerHTML), dataArray[4].querySelector('a').getAttribute('href')];

    setForm({
      id: dataValue[0],
      title: dataValue[1],
      author: dataValue[2],
      year: dataValue[3],
      file: dataValue[4],
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    setActionButton('Изменить');
    setActionType('update');
  }, [setForm, setActionButton]);

  const deleteElement = useCallback(async (event: any) => {
    const target = event.target;
    const dataElements = target.parentElement.parentElement.querySelectorAll('td');
    const dataArray = Array(...dataElements || []);
    const dataValue = [...dataArray.slice(0, 4).map((el) => el.innerHTML), dataArray[4].querySelector('a').getAttribute('href')];

    const url = 'http://127.0.0.1:3001/api/delete_book';
    await sendRequest(url, 'POST', { id: dataValue[0] });
    window.location.reload();
  }, []);

  useEffect(() => {
    (async () => {
      const url = 'http://127.0.0.1:3001/api/get_all_books';
      await sendRequest(url, 'GET', []).then((response) => setData(response.map((el: any) => {
        return {
          id: el[0],
          title: el[1],
          author: el[2],
          year: el[3],
          file: el[4],
        };
      })));
    })();
  }, []);

  return (
    <div>
      <Form
        formAction={{ form, setForm }}
        action={actionButton}
        actionType={actionType}
        setAction={setActionButton}
        setActionType={setActionType}
      />
      <Main
        elements={data}
        action={{ isAction: Boolean(true), editAction: actionTable, deleteAction: deleteElement }}
        endElemens={Boolean(false)}
      />
    </div>
  );
}

export default Create;
