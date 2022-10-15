import React, { useCallback } from 'react';
import { TableElement } from '../../../components/table';
import { sendRequest } from '../../../libs/actionData';

import './form.css';

interface FormProps {
    action: string,
    actionType?: string,
    setAction?: any,
    setActionType?: any,
    formAction : {
        form: TableElement,
        setForm: any,
    }
}

export function Form(props: FormProps) {
  const { action, actionType, setAction, setActionType, formAction: { form, setForm } } = props;

  const changeHandler = useCallback((key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [key]: event.target.value });
  }, [form, setForm]);

  const createNew = useCallback(async () => {
    const url = 'http://127.0.0.1:3001/api/save_book';
    await sendRequest(url, 'POST', {
      title: form.title,
      author: form.author,
      year: form.year,
      url: form.file,
    }).then((data) => console.log(data));

    setForm({
      id: '',
      title: '',
      author: '',
      year: '',
      file: '',
    });

    window.location.reload();
  }, [form]);

  const updateElement = useCallback(async () => {
    const url = 'http://127.0.0.1:3001/api/edit_book';
    await sendRequest(url, 'POST', {
      id: form.id,
      title: form.title,
      author: form.author,
      year: form.year,
      url: form.file,
    }).then((data) => console.log(data));

    setForm({
      id: '',
      title: '',
      author: '',
      year: '',
      file: '',
    });

    setAction('Добавить');
    setActionType(undefined);

    window.location.reload();
  }, [form]);

  return (
    <div className="createForm">
      <h1>Create new element</h1>
      <input id="idElement" type="hidden" value={form?.id} />
      <input onChange={(event) => changeHandler('title', event)} value={form.title} placeholder="title" type="text" /> { /* eslint-disable-line */ }
      <input onChange={(event) => changeHandler('author', event)} value={form.author} placeholder="author" type="text" /> { /* eslint-disable-line */ }
      <input onChange={(event) => changeHandler('year', event)} value={form.year} placeholder="year" type="text" /> { /* eslint-disable-line */ }
      <input onChange={(event) => changeHandler('file', event)} value={form.file} placeholder="fileLink" type="text" /> { /* eslint-disable-line */ }
      <button onClick={actionType === 'update' ? updateElement : createNew}>{action}</button>
    </div>
  );
}
