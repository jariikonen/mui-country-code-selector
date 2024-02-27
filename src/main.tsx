// import React from 'react';
import ReactDOM from 'react-dom/client';
// import DemoForm from './demo/DemoForm';
// import DemoForm from './demo/DemoFormCustomFilter';
// import CountryCodeStoreProvider from './store/CountryCodeStoreProvider';
// import TestForm from './demo/TestFormReact';
// import TestForm from './demo/TestFormUncontrolledReact';
// import TestForm from './demo/TestFormReactOptionFlags';
// import TestForm from './demo/TestFormZustand';
// import TestForm from './demo/TestFormUncontrolledZustand';
// import TestForm from './demo/TestFormZustandCustomFilter';
import TestForm from './demo/TestFormZustandOptionFlags';
// import RenderCountDisplay from './demo/RenderCountDisplay';

/* const data = [
  { label: 'Home phone number selector', value: 10 },
  { label: 'Home phone number input', value: 10 },
  { label: 'Work phone number selector', value: 5 },
  { label: 'Work phone number input', value: 5 },
]; */

ReactDOM.createRoot(document.getElementById('root')!).render(<TestForm />);

/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <CountryCodeStoreProvider>
    <DemoForm />
  </CountryCodeStoreProvider>
); */
