# mui-country-code-selector

<p align="center">
   <img src="./public/MCCS.gif" width="60%" alt="Gif animation showing the mui-country-code-selector in action." />
</p>

The MUI Country Code Selector (MCCS) is the best way to add a phone number input with a country code selector to your [MUI](https://mui.com/material-ui/) form. It is built on MUI's Autocomplete and TextField components, and it can be customized either by passing props to the underlying components or by implementing a custom component using the provided [Zustand](https://github.com/pmndrs/zustand) store. The API tries to follow MUI's API style, and to fit well together with other MUI components. The MCCS can be used as a controlled or an uncontrolled component. It validates the input accepting only numbers and visual separator characters as a phone number, and the display of the validation errors can be customized. As the MCCS consists of two separate input elements (country code selector and phone number input), it provides props that can be used for wrapping the subcomponents in different ways to fit the layout. By default the filtering of options is done using the MUI Autocomplete's filtering function, but it can be improved with external libraries, for example, [match-sorter](https://github.com/kentcdodds/match-sorter).

See the interactive [demo-page]() and the [API documentation]() for more detailed information.

## Installation

```
npm install mui-country-code-selector
```

## Combined components

There are currently two ways to use the MCCS. The easiest way is to use the ready-made [`CountryCodeSelectorCombined`]() component. As the name suggests it _combines_ a [`CountryCodeSelector`]() component with a MUI [`TextField`]() component. The latter functions as the actual phone number input, while the former implements the country code selector. The combining `CountryCodeSelectorCombined` component adds the state between these subcomponents that glues them together. The other way to use the MCCS, is to implement a custom component with the provided Zustand store that contains the state variables and actions required to implement custom phone number inputs.

There are currently two variants of the combined component: [`CountryCodeSelectorCombinedZustand`]() and [`CountryCodeSelectorCombinedReact`](). These differ in terms of the state-management solution used. The former uses Zustand to keep the state, while the latter uses React's own state-management utilities. Both variants provide the same [API](), so in principle either one can be used. However, currently the default import is the Zustand version, and unnecessary versions are planned to be deprecated after evaluating their pros and cons. It is probably safest to use the default version, which can be imported like this:

```
import { CountryCodeSelectorCombined } from 'mui-country-code-selector';
```

The specific versions can be imported like this:

```
import { CountryCodeSelectorCombinedReact } from 'mui-country-code-selector';

// or

import { CountryCodeSelectorCombinedZustand } from 'mui-country-code-selector';
```

The project started as an experiment in React state management, and as an attempt to learn to use the Zustand library. That is why the implementations are currently heavily based on the way a Zustand store is used. While Zustand is a great library, I am sure not everyone wants to import another library just to be able to use a phone number input component. Because of this, the likely future direction is to develop a more manageable version of the `CountryCodeSelectorCombinedReact` using React's `useReducer` and `useContext` hooks, and make it the primary (and perhaps the only) version.

### Basic usage

#### As a controlled component

Combined country code selector components can be used as [controlled or uncontrolled](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) components. When the component is used as a controlled component, it is
passed a _value_ and a _change handler_ as props. In the code below, the `phoneNumValue` is a state variable that is passed to the component as the component's value which represents the phone numnber (including the country code), and the `phoneOnChange` is a change event handler, i.e., a
function that changes the value when a change event is triggered.

```
<CountryCodeSelectorCombined
  value={phoneNumValue}
  onChange={phoneOnChange}
  layout="gridItems"
/>
```

#### Layout wrappers

Combined components have a few different [layout-wrappers](#layout-wrappers), which define how the selector and phone number input are laid out in the HTML. The wrapper can be selected with the `layout` prop. If the component is placed on a form that is already laid out with a MUI [Grid](https://mui.com/material-ui/react-grid/), the easiest way to add the combined component is probably to use the `gridItems` wrapper, which wraps the subcomponents in Grid `item` elements.

Please see the interactive [demo and documentation page]() and [API documentation]() for more information about the layout wrappers.

#### As an uncontrolled component

When the component is used as an uncontrolled component, it is be passed a React [ref](https://react.dev/learn/referencing-values-with-refs), which is then set to point to the phone number input element of the combined component. The value of the component can then be accessed through this ref.

```
<CountryCodeSelectorCombined
  inputRef={homePhoneNumRef}
  layout="gridItems"
/>
```

#### Default value

When the component is used as a controlled component, its default value can be set just by setting the initial value of the state variable, that is controlling the component's value. The default value of an uncontrolled component, however, is set using the `defaultValue` prop.

### Setting the labels and other tweaks

The combined component [API]() provides many props that allow you to customize the appearance and functionality of these components. For example, the labels of the country code selector and phone number input subcomponents can be set with `countryCodeLabel` and `phoneNumberLabel` props. Since MUI components are quite flexibly customizable using props, all subcomponents and layout components can be customized by passing props to them using [`CountryCodeSelectorCombined`'s props](). It is possible, for example, to customize rendering of the selector autocomplete's input component and option list, or the way the options are filtered. Combined components have also some convenience props that allow, for example, the changing of the variant of both the country code selector's and phone number input's underlying TextField component in one go.

Please see the [documentation page](), [API documentation](), and also the documentation of MUI's [`Autocomplete`]() and [`TextField`]() components for more information about customization of the MCCS.

## Implementing a custom component

The implementation of the component relies currently heavily on a Zustand store that contains the state variables and actions required to create a combined MCCS component. Using the store with suitable selector and text input components it is possible to implement custom MCCS components. See the [documentation page]() for more information about how to implement custom MCCS components.

However, since the MUI components are very customizable using their props, and Zustand basically creates an unnecessary dependency for the MCCS, the likely future direction is to deprecate the Zustand store, meaning that this kind of customizability probably is not possible with future versions of the component.

## Future development

As stated above, the probable future direction is to develop a new, more manageable version of the combined component without the use of external state-management libraries and possibly also to switch to use the combined component as the only way of using the component. This would lead to deprecation of the Zustand store and e.g., `CountryCodeSelector` from the public API. At the same time, the intention is to keep the API as stable as possible. However, before tackling the new implementation, there are a few things to add. The API is still missing some props, such as [form attributes](https://mui.com/material-ui/react-text-field/#form-props) and MUI's TextField component's [size](https://mui.com/material-ui/api/text-field/#text-field-prop-size) and [margin](https://mui.com/material-ui/api/text-field/#text-field-prop-margin) props. It should also be possible to use selector's and input component's [`onChange`](https://mui.com/material-ui/api/text-field/#text-field-prop-onChange) and [`value`](https://mui.com/material-ui/api/text-field/#text-field-prop-value) props through `selectorProps` and `inputProps`. Some tests must also be added, e.g., to test the reset handler. The country data must be checked and brought into compliance with the ISO 3166 standard, and the component should be localizable to different languages.
