import { Container, CssBaseline } from '@mui/material';
import { H1, P } from '../components/TypographyWrappers';
import A from '../components/Link';
import Footer from '../components/Footer';
import './demoPage.css';
import CompositeComponentsSection from './CompositeComponentsSection';
import CustomComponentsSection from './CustomComponentsSection';

export default function DemoPage() {
  return (
    <Container>
      <CssBaseline />
      <A
        href="/mui-country-code-selector/docs/mui-country-code-selector.html"
        newTab
      >
        API documentation
      </A>{' '}
      <A href="https://github.com/jariikonen/mui-country-code-selector/" newTab>
        Repository
      </A>
      <H1>MUI Country Code Selector</H1>
      <P>
        The MUI Country Code Selector (MCCS) aims to be the best way to add a
        phone number input with a country code selector to your{' '}
        <A href="https://mui.com/material-ui/" newTab>
          MUI
        </A>{' '}
        form. It is built on MUI&apos;s{' '}
        <A href="https://mui.com/material-ui/react-autocomplete/" newTab>
          <code>Autocomplete</code>
        </A>{' '}
        and{' '}
        <A href="https://mui.com/material-ui/react-text-field/" newTab>
          <code>TextField</code>
        </A>{' '}
        components, and it can be customized by passing props to the underlying
        components. It can be used as a controlled or an uncontrolled component.
        It validates the input accepting only numbers and visual separator
        characters (whitespace and hyphen) as a phone number, and the display of
        the validation errors can be customized. The country code can be
        selected either using the autocomplete selector, by picking from the
        dropdown menu or by typing the code straight in to the phone number
        input. In the last case the code is detected and the value of the
        selector is set accordingly.
      </P>
      <P>
        As the MCCS consists of two separate input elements (country code
        selector and phone number input), it provides props that can be used for
        wrapping the subcomponents in different ways to fit them to the layout.
        The selector subcomponent uses responsively shorter label texts when the
        width of the input element is smaller than a customizable threshold
        value. By default the filtering of options is done using the MUI&apos;s{' '}
        <code>Autocomplete</code>&apos;s filtering function, but just like
        MUI&apos;s <code>Autocomplete</code>, it can be improved with external
        libraries, such as{' '}
        <A href="https://github.com/kentcdodds/match-sorter" newTab>
          match-sorter
        </A>
        . The country code data consists of all{' '}
        <A href="https://www.itu.int/pub/T-SP-E.164D" newTab>
          ITU-T E.164
        </A>{' '}
        assigned calling codes and uses{' '}
        <A href="https://www.iso.org/iso-3166-country-codes.html" newTab>
          ISO 3166
        </A>{' '}
        country codes to identify the countries.
      </P>
      <P>
        There are currently two ways to use the MCCS. The easiest way is to use
        the ready-made composite component, which, as the name suggests, is a
        composite of the{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.countrycodeselector.html"
          newTab
        >
          <code>CountryCodeSelector</code>
        </A>{' '}
        component and the <code>TextField</code> component. The latter functions
        as the actual phone number input, while the former implements the
        country code selector. The{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.countrycodeselectorcomposite.html"
          newTab
        >
          <code>CountryCodeSelectorComposite</code>
        </A>{' '}
        component adds the state between these subcomponents that glues them
        together. The other way to use the MCCS, is to implement a custom
        component with the provided{' '}
        <A href="https://github.com/pmndrs/zustand" newTab>
          Zustand
        </A>{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.ccselectorstate.html"
          newTab
        >
          store
        </A>{' '}
        that contains the state variables and actions required to implement
        custom phone number input components.
      </P>
      <CompositeComponentsSection />
      <CustomComponentsSection />
      <Footer />
    </Container>
  );
}
