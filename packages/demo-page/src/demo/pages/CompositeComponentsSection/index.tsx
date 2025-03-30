import { H2, P } from '../../components/TypographyWrappers';
import A from '../../components/Link';
import BasicUsage from './BasicUsage';
import LayoutWrappers from './LayoutWrappers';
import Variants from './Variants';
import ValidationErrors from './Validation';
import Customization from './Customization';
import CodeBox from '../../components/CodeBox';
import Labels from './Labels';

export default function CompositeComponentsSection() {
  return (
    <>
      <H2 id="composite-components">Composite components</H2>
      <P>
        There are currently two versions of the composite component:{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.countrycodeselectorcomposite.html"
          newTab
        >
          <code>CountryCodeSelectorCompositeZustand</code>
        </A>{' '}
        and{' '}
        <A
          href="/mui-country-code-selector/docs/mui-country-code-selector.countrycodeselectorcompositereact.html"
          newTab
        >
          <code>CountryCodeSelectorCompositeReact</code>
        </A>
        . These differ in terms of the state-management solution used. The
        former uses Zustand to keep the state, while the latter uses
        React&lsquo;s own state-management utilities. Both versions offer the
        same API, so in principle either may be used. However, currently the
        default import is the Zustand version, and it can be imported like this.
      </P>
      <CodeBox tsPath="CompositeComponentsSection/defaultImportSnippet" />
      <P>The specific versions can be imported like this.</P>
      <CodeBox tsPath="CompositeComponentsSection/specificImportsSnippet" />
      <P>
        The project started as an experiment in React state management, and as
        an attempt to learn to use the{' '}
        <A href="https://github.com/pmndrs/zustand" newTab>
          Zustand
        </A>{' '}
        library. That is why the implementations are currently heavily based on
        the way a Zustand store is used. It is possible that in the future the
        Zustand version is deprecated in favor of the React&apos;s native state
        management utilities.
      </P>
      <BasicUsage />
      <Labels />
      <LayoutWrappers />
      <Variants />
      <ValidationErrors />
      <Customization />
    </>
  );
}
