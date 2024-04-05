import { H4, P } from '../../../TypographyWrappers';
import A from '../../../Link';
import CodeBox from '../../../CodeBox';
import ControlledFormExample from './ControlledFormExample';
import { ExampleWrapper } from '../../../ExampleWrapper';

export default function AsAControlledComponent() {
  return (
    <>
      <H4>As a controlled component</H4>
      <P>
        Combined country code selector components can be used as{' '}
        <A
          href="https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components"
          newTab
        >
          controlled or uncontrolled
        </A>{' '}
        components. When the component is used as a controlled component, it is
        passed a <i>value</i> and a <i>change handler</i> as props. In the code
        below, the <code>homePhoneNumValue</code> is a state variable that is
        passed to the component as the component&lsquo;s value, and the{' '}
        <code>homePhoneOnChange</code> is a change event handler, i.e., a
        function that changes the value when a change event is triggered.
      </P>
      <CodeBox tsPath="AsAControlledComponent/controlledFormSnippet.txt" />
      <P>
        Combined components have a few different{' '}
        <A href="#layout-wrappers">layout wrappers</A>, which define how the
        selector and phone number input are laid out in the HTML. The wrapper
        can be selected with the <code>layout</code> prop. If the component is
        placed on a form that is already laid out with a MUI{' '}
        <A href="https://mui.com/material-ui/react-grid/" newTab>
          Grid
        </A>
        , the easiest way to add the combined component is probably to use the{' '}
        <code>gridItems</code> wrapper, like in the examples above and below.
        This wraps the subcomponents in Grid <i>item</i> elements.
      </P>
      <ExampleWrapper tsCodePath="AsAControlledComponent/ControlledFormExample.tsx">
        <ControlledFormExample />
      </ExampleWrapper>
    </>
  );
}
