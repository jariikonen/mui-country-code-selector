import { Container, CssBaseline } from '@mui/material';
import { H1, P } from './components/TypographyWrappers';
import A from './components/Link';
import Footer from './components/Footer';
import './demoPage.css';
import CombinedComponentsSection from './components/CombinedComponentsSection';
import CustomComponentsSection from './components/CustomComponentsSection';

export default function DemoPage() {
  return (
    <Container>
      <CssBaseline />
      <H1>MUI Country Code Selector</H1>
      <P>
        The MUI Country Code Selector (MCCS) is the best way to add a phone
        number input with a country code selector to your{' '}
        <A href="https://mui.com/material-ui/" newTab>
          MUI
        </A>{' '}
        form. It is built on MUI&apos;s Autocomplete and TextField components,
        and it can be customized either by passing props to the underlying MUI
        components or by implementing a custom component using the provided{' '}
        <A href="https://github.com/pmndrs/zustand" newTab>
          Zustand
        </A>{' '}
        store. The API tries to follow MUI&apos;s API style, and to fit well
        together with other MUI components. The components can be used as
        controlled or uncontrolled. They validate the input accepting only
        numbers and visual separator characters as a phone number, and the
        display of the validation errors can be customized. As the components
        consist of two separate input elements (country code selector and phone
        number input), the components provide props that can be used for
        wrapping the subcomponents in different ways to fit the layout. By
        default the filtering of options is done using the MUI
        Autocomplete&apos;s filtering function, but it can be improved with
        external libraries, for example,{' '}
        <A href="https://github.com/kentcdodds/match-sorter" newTab>
          match-sorter
        </A>
        . The easiest way to use the MCCS is with ready-made{' '}
        <code>CountryCodeSelectorCombined</code> components.
      </P>
      <CombinedComponentsSection />
      <CustomComponentsSection />
      <Footer />
    </Container>
  );
}
