import { H4, P } from '../../../../components/TypographyWrappers';
import A from '../../../../components/Link';
import CodeBox from '../../../../components/CodeBox';

export default function DefaultValue() {
  return (
    <>
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
      <CodeBox tsPath="DefaultValue/defaultValueSnippet.txt" />
    </>
  );
}
