import { Container, CssBaseline } from '@mui/material';
import { H1, P } from '../components/TypographyWrappers';
import A from '../components/Link';
import Footer from '../components/Footer';
import './demoPage.css';
import BasicUsage from './BasicUsage';
import ReadyMadeComponentsSection from './ReadyMadeComponentsSection';
import CustomHook from './CustomHook';

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
        The MUI Country Code Selector is a phone number input with a combined
        country code selector, designed to be used with the React library{' '}
        <A href="https://mui.com/material-ui/" newTab>
          MUI
        </A>
        . It is also a <A href="#custom-hook">custom hook</A> that can be used
        for building such phone number input components.
      </P>
      <P>
        The ready-made component is built on top of the MUI&apos;s{' '}
        <A href="https://mui.com/material-ui/react-autocomplete/" newTab>
          <code>Autocomplete</code>
        </A>{' '}
        and{' '}
        <A href="https://mui.com/material-ui/react-text-field/" newTab>
          <code>TextField</code>
        </A>{' '}
        components, and it can be customized by passing props to the underlying
        components. It <A href="#validation">validates</A> the input accepting
        only numbers and visual separator characters (whitespace and hyphen) as
        a phone number, and the display of the validation errors can be
        customized. The country code can be selected either using the
        autocomplete selector, by picking from the dropdown menu or by typing
        the code straight in to the phone number input. In the last case the
        code is detected and the value of the selector is set accordingly.
      </P>
      <P>
        The ready-made component consists of two separate input elements.
        Threfore, it provides the{' '}
        <A href="#layout-wrappers">
          <code>layout</code>
        </A>{' '}
        prop that can be used for wrapping the subcomponents in different ways
        to fit them to the layout. By default the filtering of options is done
        using the MUI&apos;s <code>Autocomplete</code>&apos;s filtering
        function, but just like MUI&apos;s <code>Autocomplete</code>, it can be
        improved with external libraries, such as{' '}
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
      <BasicUsage />
      <ReadyMadeComponentsSection />
      <CustomHook />
      <Footer />
    </Container>
  );
}
