import { H3, P } from '../../../components/TypographyWrappers';
import A from '../../../components/Link';
import CodeBox from '../../../components/CodeBox';

export default function Labels() {
  return (
    <>
      <H3 id="setting-the-labels">Setting the labels</H3>
      <P>
        The labels of the country code selector and phone number input
        subcomponents can be set with{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.ccselectorcompositeprops.countrycodelabel.html"
          newTab
        >
          <code>countryCodeLabel</code>
        </A>{' '}
        and{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.ccselectorcompositeprops.phonenumberlabel.html"
          newTab
        >
          <code>phoneNumberLabel</code>
        </A>{' '}
        props of the composite component.
      </P>
      <CodeBox tsPath="Labels/LabelSnippet" />
    </>
  );
}
