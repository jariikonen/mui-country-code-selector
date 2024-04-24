import { H3, P } from '../../../components/TypographyWrappers';
import CodeBox from '../../../components/CodeBox';

export default function Labels() {
  return (
    <>
      <H3 id="setting-the-labels">Setting the labels</H3>
      <P>
        The labels of the country code selector and phone number input
        subcomponents can be set with <code>countryCodeLabel</code> and{' '}
        <code>phoneNumberLabel</code> props of the combined component.
      </P>
      <CodeBox tsPath="Labels/LabelSnippet" />
    </>
  );
}
