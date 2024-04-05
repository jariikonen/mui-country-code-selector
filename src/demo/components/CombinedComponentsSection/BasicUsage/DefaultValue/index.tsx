import { H4, P } from '../../../TypographyWrappers';
import CodeBox from '../../../CodeBox';

export default function DefaultValue() {
  return (
    <>
      <H4>Default value</H4>
      <P>
        When the component is used as a controlled component, its default value
        can be set just by setting the initial value of the state variable, that
        is controlling the component&lsquo;s value. The default value of an
        uncontrolled component, however, is set using the{' '}
        <code>defaultValue</code> prop.
      </P>
      <CodeBox tsPath="DefaultValue/defaultValueSnippet.txt" />
    </>
  );
}
