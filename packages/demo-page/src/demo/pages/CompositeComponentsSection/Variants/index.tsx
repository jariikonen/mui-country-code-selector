import { H3, P } from '../../../components/TypographyWrappers';
import A from '../../../components/Link';
import { ExampleWrapper } from '../../../components/ExampleWrapper';
import VariantExample from './VariantExample';
import CodeBox from '../../../components/CodeBox';

export default function Variants() {
  return (
    <>
      <H3 id="Variants">MUI component variants</H3>
      <P>
        By default the Country Code Selector uses the{' '}
        <A
          href="https://mui.com/material-ui/react-text-field/#basic-textfield"
          newTab
        >
          TextField
        </A>{' '}
        component as basis for its selector and phone number input
        subcomponents. TextFields come in three variants: <i>outlined</i>{' '}
        (default), <i>filled</i> and <i>standard</i>. A variant used for the
        both subcomponents of a composite component can be set with the{' '}
        <code>variant</code> prop.
      </P>
      <CodeBox tsPath="Variants/variantSnippet.txt" />
      <ExampleWrapper tsCodePath="Variants/VariantExample">
        <VariantExample />
      </ExampleWrapper>
      <P>
        The subcomponents can be set to use individual variants by using the{' '}
        <code>selectorProps</code> and <code>inputProps</code> props.
      </P>
    </>
  );
}
