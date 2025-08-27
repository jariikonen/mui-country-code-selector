import { H3, P } from '../../../components/TypographyWrappers';
import A from '../../../components/Link';
import CodeBox from '../../../components/CodeBox';
import ControlledFormExample from './ControlledFormExample';
import { ExampleWrapper } from '../../../components/ExampleWrapper';

export default function AsAControlledComponent() {
  return (
    <>
      <H3>Use it as a controlled component</H3>
      <P>
        The component can be used as a controlled component by passing it a
        value and a change handler like this:
      </P>
      <CodeBox tsPath="AsAControlledComponent/controlledFormSnippet.txt" />
      <P>
        Since the component is a composite of two elements, there are many ways
        to lay it out in the HTML. To make this easy, there are different{' '}
        <A href="#layout-wrappers">layout wrappers</A> that can be selected with
        the{' '}
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
        This wraps the subcomponents in Grid <i>item</i> elements. There&lsquo;s
        a full working example of this below.
      </P>
      <ExampleWrapper tsCodePath="AsAControlledComponent/ControlledFormExample.tsx">
        <ControlledFormExample />
      </ExampleWrapper>
    </>
  );
}
