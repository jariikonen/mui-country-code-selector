import { H3, H4, H5, P } from '../../../components/TypographyWrappers';
import A from '../../../components/Link';
import CodeBox from '../../../components/CodeBox';
import { ExampleWrapper } from '../../../components/ExampleWrapper';
import PropsExample from './PropsExample';
import RenderInputExample from './RenderInputExample';
import CustomizationExample from './CustomizationExample';

export default function Customization() {
  return (
    <>
      <H3 id="customization">Customization</H3>
      <H4 id="passing-props-to-selector-and-input-components">
        Passing props to selector and input components
      </H4>
      <P>
        The composite country code selector components can be customized by
        passing props to the underlying country code selector and phone number
        input subcomponents. This can be done with the{' '}
        <code>selectorProps</code> and <code>inputProps</code> props of the
        composite components. The <code>selectorProps</code> accepts all of the
        MUI{' '}
        <A href="https://mui.com/material-ui/react-autocomplete/" newTab>
          Autocomplete&apos;s
        </A>{' '}
        props, except <code>onChange</code>, <code>options</code> and{' '}
        <code>value</code>. These properties are controlled by the composite
        component and cannot be customized this way. In addition to these
        Autocomplete props there are a few props that can be passed to the
        selector component: <code>label</code>, <code>shrink</code>,{' '}
        <code>variant</code> and <code>renderCountRef</code>. The complete
        details of these props can be found from the <A href="#">API pages</A>,
        and the complete list of Autocomplete props can be found from{' '}
        <A href="https://mui.com/material-ui/api/autocomplete/" newTab>
          MUI&apos;s documentation
        </A>
        . A few examples of how these can be used are given below.
      </P>
      <P>
        The <code>inputProps</code> prop accepts all of the MUI{' '}
        <A href="https://mui.com/material-ui/react-text-field/" newTab>
          TextField&apos;s
        </A>{' '}
        props. Again the full list of the props with details can be found from{' '}
        <A href="https://mui.com/material-ui/api/text-field/" newTab>
          MUI&apos;s documentation
        </A>
        . The props must be given in an object, as in the example below.
      </P>
      <CodeBox tsPath="Customization/propsSnippet.txt" />
      <ExampleWrapper tsCodePath="Customization/PropsExample.tsx">
        <PropsExample />
      </ExampleWrapper>
      <H4>Customizing the selector</H4>
      <P>
        See the MUI&apos;s{' '}
        <A href="https://mui.com/material-ui/api/autocomplete/" newTab>
          documentation
        </A>{' '}
        for full details about Autocomplete props. Here are some examples of
        props that might be useful.
      </P>
      <H5>
        Customizing the selector&apos;s input component with{' '}
        <code>renderInput</code>
      </H5>
      <P>
        The <code>renderInput</code> prop allows customization of the input
        component used with the Autocomplete. MUI&apos;s{' '}
        <A
          href="
          https:newTab //mui.com/material-ui/react-autocomplete/#custom-input"
        >
          documentation
        </A>{' '}
        has an example of the usage of the prop, and here is how it can be
        applied to a <code>CountryCodeSelectorComposite</code> component.
      </P>
      <ExampleWrapper tsCodePath="Customization/RenderInputExample">
        <RenderInputExample />
      </ExampleWrapper>
      <H5>Customizing the text of the selected option</H5>
      <P>
        The <code>getOptionLabel</code> prop allows customizing the text, that
        is displayed in the input after an option has been selected. The options
        are <code>CountryType</code> objects and have the following string
        properties: <code>country</code>, <code>code</code>, and{' '}
        <code>iso</code>. The <code>country</code> property contains the name of
        the country, while <code>code</code> contains the country calling code
        (without the plus sign, but with separating hyphens in some codes), and{' '}
        <code>iso</code> contains the two letter{' '}
        <A
          href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
          newTab
        >
          ISO 3166
        </A>{' '}
        country codes.
      </P>
      <CodeBox tsPath="Customization/getOptionLabelSnippet" />
      <H5>Customizing the way the options are rendered</H5>
      <P>
        The way the options are rendered in the dropdown list can be customized
        using the <code>renderOption</code> prop. It is, for example, possible
        to add the country&apos;s flag to the option, like this.
      </P>
      <CodeBox tsPath="Customization/renderOptionSnippet" />
      <H5>Customizing the way the options are filtered</H5>
      <P>
        The options are filtered by default using a function that is created
        using Autocomplete&apos;s <code>createFilterOptions</code> factory
        function like below. The options are searched from strings that contain
        the name, ISO code, and calling code of the country.
      </P>
      <CodeBox tsPath="Customization/defaultFilteringSnippet" />
      <P>
        The <code>filterOptions</code> prop can be used for changing the
        filtering. More information can be found from MUI&apos;s documentation{' '}
        <A
          href="https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-filterOptions"
          newTab
        >
          here
        </A>{' '}
        ,{' '}
        <A
          href="https://mui.com/material-ui/react-autocomplete/#custom-filter"
          newTab
        >
          here
        </A>
        , and{' '}
        <A
          href="https://mui.com/material-ui/react-autocomplete/#advanced"
          newTab
        >
          here
        </A>
        . Below is an example of how to use a package called{' '}
        <A href="https://github.com/kentcdodds/match-sorter" newTab>
          match-sorter
        </A>{' '}
        to filter the options. Match-sorter is much better, for example, in how
        it takes ISO codes into account in filtering. It also does not require
        all characters to be consecutive, so it is possible to search for
        example &apos;Turks and Caicos Islands&apos; by typing
        &apos;tucai&apos;.
      </P>
      <CodeBox tsPath="Customization/filterOptionsSnippet" />
      <H5>Changing the width of the dropdown menu</H5>
      <P>
        Sometimes the dropdown menu should be of different width than the input
        component. This can be achieved with Autocomplete&apos;s{' '}
        <code>slotProps</code> prop.
      </P>
      <CodeBox tsPath="Customization/slotPropsSnippet" />
      <H5>Advanced example: using a flag as a start adornment in the input</H5>
      <P>
        There are countless ways to customize the components. One cool way is to
        add the flag also to the selector&apos;s input field as a start
        adornment. To do this, you must store the <code>CountryType</code>{' '}
        object representing the selected option to the state. We can access the
        options in <code>getOptionLabel</code> function, but at that point we
        don&apos;t know if the option is the one that is selected. So we must
        store the currently handled option to one state variable and set another
        state variable when an option gets selected.
      </P>
      <CodeBox tsPath="Customization/countriesRefsSnippet" />
      <P>
        The <code>onChange</code> event handler is triggered when the value of
        the selector changes, i.e., an option is selected. So it is a good place
        to set the state variable containing the object representing the
        selected country.
      </P>
      <CodeBox tsPath="Customization/setCountriesRefsSnippet" />
      <P>
        Finally, the start adornment can be added in the{' '}
        <code>renderInput</code> function.
      </P>
      <CodeBox tsPath="Customization/addStartAdornment" />
      <H5>Complete example</H5>
      <ExampleWrapper tsCodePath="Customization/CustomizationExample">
        <CustomizationExample />
      </ExampleWrapper>
      <H4>Customizing the phone number input</H4>
      <P>
        The phone number input uses MUI{' '}
        <A href="https://mui.com/material-ui/react-text-field" newTab>
          TextField
        </A>{' '}
        as its basis. It can be customized using the <code>inputProps</code>{' '}
        prop, which accepts all of the MUI TextField&apos;s{' '}
        <A href="https://mui.com/material-ui/api/text-field/" newTab>
          props
        </A>
        , except <code>onChange</code>, <code>select</code>,{' '}
        <code>SelectProps</code> and <code>value</code>. As shown{' '}
        <A href="#passing-props-to-selector-and-input-components">before</A>,
        you can, for example, change the label text, the shrinking of the label,
        and variant of the input component, but there is more. Please, see the
        MUI&apos;s documentation for the full details of the TextField props.
      </P>
    </>
  );
}
