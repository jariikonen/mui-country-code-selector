import { H2, H3, H4, H5, P } from '../../components/TypographyWrappers';
import A from '../../components/Link';
import { ExampleWrapper } from '../../components/ExampleWrapper';
import CustomCountryCodeSelectorExample from './CustomCountryCodeSelectorExample';
import CodeBox from '../../components/CodeBox';

export default function CustomComponentsSection() {
  return (
    <>
      <H2>Implementing a custom component</H2>
      <P>
        The provided Zustand store contains the state and actions required to
        implement a custom country code selector component, when used with
        suitable autocomplete and input components. Using these subcomponents it
        is possible to implement a custom country code selector components, that
        change or extend the functionality of the basic MCCS, or the way it is
        rendered.
      </P>
      <P>
        The full details of the country code store API can be found from the{' '}
        <A href="#">API documentation</A> page, but here are some basic
        guidelines. Subscribing to the store values and actions is done using
        the <code>useCountryCodeStore</code> function.
      </P>
      <CodeBox tsPath="CustomComponentsSection/subscribingSnippet" />
      <P>
        These values and actions are especially important. First, the store must
        be initialized with the <code>initialize</code> action. It takes three
        optional parameters: time the error message is displayed in seconds, a
        possible external error handler function, and a possible change event
        handler. Then, if the component is used as a controlled component its
        value can be changed from the outside. This must be handled with the{' '}
        <code>handleValueChange</code> function in a <code>useEffect</code>{' '}
        hook.
      </P>
      <P>
        Preventing the input value from changing as the change event suggests,
        makes React loose track of the correct position of the cursor, and the
        cursor jumps to the end of the input. This happens, for example, when a
        forbidden character is inputted into the phone number input. This can be
        fixed by keeping track of the cursor position (more specifically the end
        and start indices of the selected text within the input element) in the
        state and setting those values again on every render. The{' '}
        <code>placeInputSelection</code> action sets the selection range based
        on values stored in the store.
      </P>
      <CodeBox tsPath="CustomComponentsSection/valuesAndActionsSnippet" />
      <P>
        The input&apos;s type must be <code>text</code> and it must be passed a
        ref using the <code>setRefs</code> action, which sets references to the
        input element in the state, adds some event listeners to the element,
        and also sets the default value of the component when it is used as an
        uncontrolled component. The input is used internally as a controlled
        component and it must be passed either the <code>phoneNumStr</code>{' '}
        state variable, or an external state variable as its value and the{' '}
        <code>handlePhoneNumberChange</code> as a change event handler. If the
        component is used as a controlled component the external change event
        handler must be provided to the state as parameter to the{' '}
        <code>initialize</code> action, so that it can be called when the value
        changes.
      </P>
      <P>
        If the <code>CountryCodeSelector</code> component is used as the
        selector, it subscribes to the required values and actions
        automatically. If, however, some other kind of autocomplete component is
        used, it must be given the <code>countryCodeValue</code> state variable
        as its value, <code>handleCountryCodeChange</code> as change event
        handler, and <code>countries</code> from{' '}
        <code>lib/countryCodeData.ts</code> as options.
      </P>
      <H3>The store provider</H3>
      <P>
        Normally, using a Zustand store does not require use of contexts. This
        is because the store is normally used as the global state. However,
        since each MCCS must have its own state (or every phone number input
        will have the same values), we must wrap our custom component inside a{' '}
        <code>CountryCodeStoreProvider</code> contex provider tags.
      </P>
      <CodeBox tsPath="CustomComponentsSection/contextProviderSnippet" />
      <P>
        This can be done, for example, in a higher order component, which
        abstracts away the need to use the context wrapper. See the{' '}
        <A href="#customcountrycodeselector-index-tsx">source code</A> below.
      </P>
      <H3>Example</H3>
      <ExampleWrapper tsCodePath="CustomComponentsSection/CustomCountryCodeSelectorExample">
        <CustomCountryCodeSelectorExample />
      </ExampleWrapper>
      <H4>Example source files</H4>
      <H5>CustomCountryCodeSelector/CustomCountryCodeSelectorInner.tsx</H5>
      <CodeBox tsPath="CustomCountryCodeSelector/CustomCountryCodeSelectorInner.tsx" />
      <H5 id="customcountrycodeselector-index-tsx">
        CustomCountryCodeSelector/index.tsx
      </H5>
      <CodeBox tsPath="CustomCountryCodeSelector/index.tsx" />
    </>
  );
}
