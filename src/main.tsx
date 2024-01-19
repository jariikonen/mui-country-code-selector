import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoForm from './demo/DemoForm';
import DemoFormCustomFilter from './demo/DemoFormCustomFilter';
import CountryCodeStoreProvider from './store/CountryCodeStoreProvider';
import TestForm from './demo/TestForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CountryCodeStoreProvider>
      <DemoForm />
    </CountryCodeStoreProvider>
    <CountryCodeStoreProvider>
      <DemoFormCustomFilter />
    </CountryCodeStoreProvider>
    <TestForm />
  </React.StrictMode>
);
