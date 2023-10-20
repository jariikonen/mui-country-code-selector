import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoForm from './demo/DemoForm';
import DemoFormCustomFilter from './demo/DemoFormCustomFilter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoForm id="first" />
    <DemoFormCustomFilter id="second" />
  </React.StrictMode>
);
