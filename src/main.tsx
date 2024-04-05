// import React from 'react';
import ReactDOM from 'react-dom/client';
// import DemoForm from './demo/DemoForm';
// import DemoForm from './demo/DemoFormCustomFilter';
// import CountryCodeStoreProvider from './store/CountryCodeStoreProvider';
// import TestForm from './demo/components/CombinedComponentsSection/TestFormReact';
// import TestForm from './demo/components/CombinedComponentsSection/TestFormUncontrolledReact';
// import TestForm from './demo/components/CombinedComponentsSection/TestFormReactOptionFlags';
// import TestForm from './demo/TestFormReactOptionFlagsGrid2';
// import TestForm from './demo/TestFormReactSimple';
// import TestForm from './demo/TestFormReactRenderCount';
// import TestForm from './demo/components/CombinedComponentsSection/TestFormZustand';
// import TestForm from './demo/components/CombinedComponentsSection/TestFormUncontrolledZustand';
// import TestForm from './demo/TestFormZustandCustomFilter';
// import TestForm from './demo/TestFormZustandOptionFlags';
// import TestForm from './demo/TestFormZustandOptionFlagsGrid2';
// import TestForm from './demo/TestFormZustandSimple';
// import TestForm from './demo/components/CombinedComponentsSection/TestFormZustandRenderCount';
// import RenderCountDisplay from './demo/RenderCountDisplay';
// import DemoPage from './demo/components/CombinedComponentsSection/AsAControlledComponent/ControlledFormExample';
// import DemoPage from './demo/components/CustomComponentsSection/DemoForm';
import DemoPage from './demo/DemoPage';

/* const data = [
  { label: 'Home phone number selector', value: 10 },
  { label: 'Home phone number input', value: 10 },
  { label: 'Work phone number selector', value: 5 },
  { label: 'Work phone number input', value: 5 },
]; */

ReactDOM.createRoot(document.getElementById('root')!).render(<DemoPage />);

/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <CountryCodeStoreProvider>
    <DemoPage />
  </CountryCodeStoreProvider>
); */
