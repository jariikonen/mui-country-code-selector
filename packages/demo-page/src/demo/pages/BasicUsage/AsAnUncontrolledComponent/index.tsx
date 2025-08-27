import { H3, H4, P } from '../../../components/TypographyWrappers';
import A from '../../../components/Link';
import CodeBox from '../../../components/CodeBox';
import UncontrolledFormExample from './UncontrolledFormExample';
import { ExampleWrapper } from '../../../components/ExampleWrapper';

export default function AsAnUncontrolledComponent() {
  return (
    <>
      <H3>...or as an ucontrolled component</H3>
      <P>
        You can use the component as an uncontrolled component by passing it a{' '}
        <A href="https://react.dev/learn/referencing-values-with-refs" newTab>
          ref
        </A>
        , which is then set to point to the phone number input element of the
        composite component. The value of the component can then be accessed
        through this ref.
      </P>
      <CodeBox tsPath="AsAnUncontrolledComponent/uncontrolledFormSnippet.txt" />
      <P>
        As the example below demonstrates, the component can be cleared with a
        simple reset button, when it is used as an uncontrolled component.
      </P>
      <ExampleWrapper tsCodePath="AsAnUncontrolledComponent/UncontrolledFormExample">
        <UncontrolledFormExample />
      </ExampleWrapper>
      <H4>Default value</H4>
      <P>
        When the component is used as a controlled component, its default value
        can be set just by setting the initial value of the state variable which
        controls the component&lsquo;s value. The default value of an
        uncontrolled component, however, is set using the{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.ccselectorcompositeprops.defaultvalue.html"
          newTab
        >
          <code>defaultValue</code>
        </A>{' '}
        prop.
      </P>
      <CodeBox tsPath="AsAnUncontrolledComponent/defaultValueSnippet.txt" />
    </>
  );
}
