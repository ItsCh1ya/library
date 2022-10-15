import React, { useCallback, useEffect, useState } from 'react';
import { Welcome } from './welcome';

import './index.css';
import { Main } from './main';
import { TableElementGroup } from '../../components/table';
import { sendRequest } from '../../libs/actionData';

let data: any = [];

function getElement(
  currentElementIndex: number,
  countOutpuElement: number,
  data: TableElementGroup,
) {
  const dataSlice = data.slice(currentElementIndex, currentElementIndex + countOutpuElement);

  return dataSlice.length > 0 ? dataSlice : false;
}

function Index() {
  const [tableElements, setTableElements] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [endList, setEndList] = useState<boolean>(false);

  let currentElementPage = 0;
  let elementOutput = 10;

  const TableHandler = useCallback((isSetted: boolean) => {
    const dataSearch = data.filter((element: any) => element.title.includes(search));

    if (!dataSearch.length) {
      setTableElements(dataSearch);
      setEndList(false);

      return;
    }

    const newData = getElement(
      currentElementPage,
      elementOutput,
      dataSearch,
    );

    if (newData) {
      if (isSetted) {
        setTableElements(newData);
        currentElementPage = elementOutput; // eslint-disable-line
      } else {
        setTableElements((prev: any) => [...prev, ...newData]);
        currentElementPage += elementOutput; // eslint-disable-line
      }

      setEndList(false);
    } else {
      setEndList(true);
    }
  }, [data, search]);

  const scrollHandler = () => {
    const windowScreenY = window.pageYOffset;
    const mainScreenY = document.querySelector('main')?.offsetHeight || 0;

    if (windowScreenY > mainScreenY - 100) {
      TableHandler(false);
    }
  };

  useEffect(() => {
    window.onscroll = scrollHandler;
    TableHandler(true);
  }, [search]);

  useEffect(() => {
    (async () => {
      const url = 'http://127.0.0.1:3001/api/get_all_books';
      await sendRequest(url, 'GET', []).then((response) => data = response.map((el: any) => {
        return {
          title: el[1],
          author: el[2],
          year: el[3],
          file: el[4],
        };
      }));
      TableHandler(false);
    })();
  }, []);

  return (
    <>
      <Welcome param={search} onChangeParam={setSearch} />
      <Main endElemens={endList} elements={tableElements} />
    </>
  );
}

export default Index;
