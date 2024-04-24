import { H2, P } from '../../components/TypographyWrappers';
import BasicUsage from './BasicUsage';
import LayoutWrappers from './LayoutWrappers';
import Variants from './Variants';
import ValidationErrors from './Validation';
import Customization from './Customization';
import CodeBox from '../../components/CodeBox';
import Labels from './Labels';

export default function CombinedComponentsSection() {
  return (
    <>
      <H2 id="combined-components">Combined components</H2>
      <P>
        There are currently two variants of the components:{' '}
        <code>CountryCodeSelectorCombinedZustand</code> and{' '}
        <code>CountryCodeSelectorCombinedReact</code>. These differ in terms of
        the state-management solution used. The former uses Zustand to keep the
        state, while the latter uses React&lsquo;s own state-management
        utilities. Both variants provide the same API, so in principle either
        one can be used. However, currently the default import is the Zustand
        version, whose code is easier to manage, and unnecessary versions are
        planned to be deprecated after evaluating their pros and cons. It is
        probably safest to use the default version, which can be imported like
        this.
      </P>
      <CodeBox tsPath="CombinedComponentsSection/defaultImportSnippet" />
      <P>The specific versions can be imported like this.</P>
      <CodeBox tsPath="CombinedComponentsSection/specificImportsSnippet" />
      <P>
        The project started as an experiment in React state management, and as
        an attempt to learn to use the Zustand library. That is why the
        implementations are currently heavily based on the way a Zustand store
        is used. While Zustand is a great library, I&apos;m sure not everyone
        wants to import another library just to be able to use a phone number
        input component. Because of this, the likely future direction is to
        develop a more readable version of the{' '}
        <code>CountryCodeSelectorCombinedReact</code> using React&apos;s{' '}
        <code>useReducer</code> and <code>useContext</code> hooks, and make it
        the primary (and perhaps the only) version.
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
