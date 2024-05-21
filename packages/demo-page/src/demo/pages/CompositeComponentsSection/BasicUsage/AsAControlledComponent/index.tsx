import { H4, P } from '../../../../components/TypographyWrappers';
import A from '../../../../components/Link';
import CodeBox from '../../../../components/CodeBox';
import ControlledFormExample from './ControlledFormExample';
import { ExampleWrapper } from '../../../../components/ExampleWrapper';

export default function AsAControlledComponent() {
  return (
    <>
      <H4>As a controlled component</H4>
      <P>
        Composite country code selector components can be used as{' '}
        <A
          href="https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components"
          newTab
        >
          controlled or uncontrolled
        </A>{' '}
        components. When the component is used as a controlled component, it is
        passed a <i>value</i> and a <i>change handler</i> as props. In the code
        below, the <code>phoneNumValue</code> is a state variable that is passed
        to the component as the component&lsquo;s value, and the{' '}
        <code>phoneOnChange</code> is a change event handler, i.e., a function
        that changes the value when a change event is triggered.
      </P>
      <CodeBox tsPath="AsAControlledComponent/controlledFormSnippet.txt" />
      <P>
        Composite components have a few different{' '}
        <A href="#layout-wrappers">layout wrappers</A>, which define how the
        selector and phone number input are laid out in the HTML. The wrapper
        can be selected with the{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.ccselectorcompositeprops.layout.html"
          newTab
        >
          <code>layout</code>
        </A>{' '}
        prop (see also its{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.layoutprop.html"
          newTab
        >
          type
        </A>
        ). If the component is placed on a form that is already laid out with a
        MUI{' '}
        <A href="https://mui.com/material-ui/react-grid/" newTab>
          Grid
        </A>
        , the easiest way to add the composite component is probably to use the{' '}
        <code>gridItems</code> option, like in the examples above and below.
        This wraps the subcomponents in Grid <i>item</i> elements.
      </P>
      <ExampleWrapper tsCodePath="AsAControlledComponent/ControlledFormExample.tsx">
        <ControlledFormExample />
      </ExampleWrapper>
    </>
  );
}
