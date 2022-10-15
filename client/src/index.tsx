import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Index from './pages/index/index.page';
import Create from './pages/create/index.page';

import { Header } from './components/header';
import { HeaderLogoProps } from './components/header/headerLogo';
import { MenuElement } from './components/menu';

import './index.css';

const URL_LIST: Array<MenuElement> = [
  { value: 'MenuOne', url: '/' },
  { value: 'MenuTwo', url: '/create' },
];
const LOGO: HeaderLogoProps = {
  value: 'TestLogo',
  url: '/',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header logo={LOGO} menuElement={URL_LIST} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
