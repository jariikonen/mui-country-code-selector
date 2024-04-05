import { H4, P } from '../../../TypographyWrappers';
import A from '../../../Link';
import CodeBox from '../../../CodeBox';
import UncontrolledFormExample from './UncontrolledFormExample';
import { ExampleWrapper } from '../../../ExampleWrapper';

export default function AsAnUncontrolledComponent() {
  return (
    <>
      <H4>As an ucontrolled component</H4>
      <P>
        When the component is used as an uncontrolled component, it is be passed
        a React{' '}
        <A href="https://react.dev/learn/referencing-values-with-refs" newTab>
          ref
        </A>
        , which is then set to point to the phone number input element of the
        combined component. The value of the component can then be accessed
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
    </>
  );
}
