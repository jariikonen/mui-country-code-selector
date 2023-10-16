import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoForm from './demo/DemoForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoForm id="first" />
    <DemoForm id="second" />
  </React.StrictMode>
);
