import { H3, H4, P } from '../../TypographyWrappers';
import A from '../../Link';
import CodeBox from '../../CodeBox';
import { ExampleWrapper } from '../../ExampleWrapper';
import ValidationExample from './ValidationExample';

export default function ValidationErrors() {
  return (
    <>
      <H3 id="validation-errors">Validation errors</H3>
      <P>
        The MUI Country Code Selector (MCCS) validates phone number inputs
        according to the following rules. A telephone number consists of a three
        digit country code, which starts with a plus sign (&apos;+&apos;), an
        area code or a mobile prefix (and possibly{' '}
        <A href="https://en.wikipedia.org/wiki/E.123" newTab>
          other
        </A>{' '}
        <A href="https://en.wikipedia.org/wiki/E.164" newTab>
          prefexis
        </A>
        ), and a local number. MCCS detects the country code from the input, but
        does not validate area codes or other prefixes. Different parts can be
        separated for better readability with space (&apos; &apos;) or hyphen
        (&apos;-&apos;) characters, and only one separator character is allowed
        between digits. Plus sign can be used only as the first character of the
        input, and input cannot start with a separator character.
      </P>
      <P>
        When rules are violated, MCCS will by default indicate the error using
        the component&apos;s state (MUI TextField <code>error</code> prop) and
        an error message. How the component reacts to these validation errors
        can, however, be customized using the <code>errorMessageDisplay</code>,{' '}
        <code>errorMessageDelay</code> and <code>onError</code> props.
      </P>
      <H4>Setting how the errors are displayed</H4>
      <P>
        How the errors are displayed can be set using the{' '}
        <code>errorMessageDisplay</code> prop. The prop accepts the following
        values: <code>none</code>, <code>message</code>, <code>status</code>,{' '}
        and <code>both</code>. These should be quite self explanatory. With{' '}
        <code>none</code> the errors are not displayed in any way, while with{' '}
        <code>message</code> only the error messages are displayed and with{' '}
        <code>status</code> only the component&apos;s error status is displaying
        the errors. When <code>errorMessageDisplay</code> is set to{' '}
        <code>both</code>, both display methods are used, which is the default
        behavior.
      </P>
      <CodeBox tsPath="Validation/DisplaySnippet" />
      <P>
        The error message is implemented as a MUI{' '}
        <A href="https://mui.com/material-ui/api/form-helper-text/" newTab>
          FormHelperText
        </A>{' '}
        component. It can be customized by passing it props using the{' '}
        <code>errorProps</code> prop.
      </P>
      <H4>Error display duration</H4>
      <P>
        The duration of the error display can be set with the{' '}
        <code>errorMessageDelay</code> prop. The prop accepts the time in
        seconds.
      </P>
      <CodeBox tsPath="Validation/DurationSnippet" />
      <H4>Custom error handler</H4>
      <p>
        The component can also be given a custom error handler function with{' '}
        <code>onError</code> prop. The function receives the error message
        string as a parameter.
      </p>
      <H4>Example</H4>
      <ExampleWrapper tsCodePath="Validation/ValidationExample">
        <ValidationExample />
      </ExampleWrapper>
    </>
  );
}
