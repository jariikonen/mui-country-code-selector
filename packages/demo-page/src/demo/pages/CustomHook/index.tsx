import { H2, H3, P } from '../../components/TypographyWrappers';
import A from '../../components/Link';
import { ExampleWrapper } from '../../components/ExampleWrapper';
import CustomCountryCodeSelectorExample from './CustomCountryCodeSelectorExample';

export default function CustomComponentsSection() {
  return (
    <>
      <H2 id="custom-hook">
        Implementing a custom component with the state hook
      </H2>
      <P>
        The package also exports a custom hook,{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.usecountrycodeselectorstate.html"
          newTab
        >
          <code>useCountryCodeSelectorState()</code>
        </A>
        , which encapsulates the core funcionality and the state needed to
        combine the country code selector and a phone number input. It takes a
        lot of the same props as the ready-made composite component, and returns
        props that can be passed to the country code selector and phone number
        input components. This allows creating a custom composite component that
        uses different subcomponents than the ready-made one, or lays them out
        in a different way.
      </P>

      <H3>Example</H3>
      <P>
        Here is a full working example demonstrating how{' '}
        <code>useCountryCodeSelectorState()</code> can be used for creating a
        custom phone number input composit component:
      </P>
      <ExampleWrapper tsCodePath="CustomHook/CustomCountryCodeSelectorExample">
        <CustomCountryCodeSelectorExample />
      </ExampleWrapper>
    </>
  );
}
