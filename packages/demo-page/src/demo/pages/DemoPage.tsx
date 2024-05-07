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
      <H1>MUI Country Code Selector</H1>
      <P>
        The MUI Country Code Selector (MCCS) is the best way to add a phone
        number input with a country code selector to your{' '}
        <A href="https://mui.com/material-ui/" newTab>
          MUI
        </A>{' '}
        form. It is built on MUI&apos;s{' '}
        <A href="https://mui.com/material-ui/react-autocomplete/" newTab>
          Autocomplete
        </A>{' '}
        and{' '}
        <A href="https://mui.com/material-ui/react-text-field/" newTab>
          TextField
        </A>{' '}
        components. Since these MUI components are quite flexibly customizable
        using props, the component can also be comprehensively customized by
        passing props to the subcomponents. The API tries to follow MUI&apos;s
        API style, and to fit well together with other MUI components. The MCCS
        can be used as a controlled or an uncontrolled component. It validates
        the input accepting only numbers and visual separator characters as a
        phone number, and the display of the validation errors can be
        customized. As the MCCS consists of two separate input elements (country
        code selector and phone number input), it provides props that can be
        used for wrapping the subcomponents in different ways to fit the layout.
        By default the filtering of options is done using the MUI
        Autocomplete&apos;s filtering function, but it can be improved with
        external libraries, for example,{' '}
        <A href="https://github.com/kentcdodds/match-sorter" newTab>
          match-sorter
        </A>
        .
      </P>
      <P>
        There are currently two ways to use the MCCS. The easiest way is to use
        the ready-made combined component, which, as the name suggests,{' '}
        <i>combines</i> a <code>CountryCodeSelector</code> component with a MUI{' '}
        <code>TextField</code> component. The latter functions as the actual
        phone number input, while the former implements the country code
        selector. The combining <code>CountryCodeSelectorComposite</code>{' '}
        component adds the state between these subcomponents that glues them
        together. The other way to use the MCCS, is to implement a custom
        component with the provided Zustand store that contains the state
        variables and actions required to implement custom phone number inputs.
      </P>
      <CompositeComponentsSection />
      <CustomComponentsSection />
      <Footer />
    </Container>
  );
}
