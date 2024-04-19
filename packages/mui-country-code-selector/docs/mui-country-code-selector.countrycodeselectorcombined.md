<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mui-country-code-selector](./mui-country-code-selector.md) &gt; [CountryCodeSelectorCombined](./mui-country-code-selector.countrycodeselectorcombined.md)

## CountryCodeSelectorCombined() function

> This API is provided as an alpha preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

A complete phone number input React component with a country code selector autocomplete field. Based on MUI's `Autocomplete` ( [https://mui.com/material-ui/react-autocomplete/](https://mui.com/material-ui/react-autocomplete/)<!-- -->) and `TextField` ( [https://mui.com/material-ui/react-text-field/](https://mui.com/material-ui/react-text-field/)<!-- -->) components. These subcomponents are combined using a common state that is implemented differently in specific variants of the component.

This component variant uses the provided Zustand store as the common state between the subcomponents. See the documentation for `CCSelectorState` and `useCountryCodeStore` for more information about the store.

**Signature:**

```typescript
declare function CountryCodeSelectorCombined({ id, name, value, onChange, inputRef, countryCodeLabel, phoneNumberLabel, errorMessageDelay, errorMessageDisplay, onError, defaultValue, layout, formGroupProps, gridContainerProps, gridItemProps, gridSelectorProps, gridInputProps, gridErrorProps, grid2ContainerProps, grid2ItemProps, grid2SelectorProps, grid2InputProps, grid2ErrorProps, stackProps, selectorSize, inputSize, errorSize, filterOptions, shrink, variant, selectorProps, inputProps, errorProps, selectorRenderCountRef, inputRenderCountRef, }: CCSelectorCombinedProps): import("react/jsx-runtime").JSX.Element;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

{ id, name, value, onChange, inputRef, countryCodeLabel, phoneNumberLabel, errorMessageDelay, errorMessageDisplay, onError, defaultValue, layout, formGroupProps, gridContainerProps, gridItemProps, gridSelectorProps, gridInputProps, gridErrorProps, grid2ContainerProps, grid2ItemProps, grid2SelectorProps, grid2InputProps, grid2ErrorProps, stackProps, selectorSize, inputSize, errorSize, filterOptions, shrink, variant, selectorProps, inputProps, errorProps, selectorRenderCountRef, inputRenderCountRef, }


</td><td>

[CCSelectorCombinedProps](./mui-country-code-selector.ccselectorcombinedprops.md)


</td><td>


</td></tr>
</tbody></table>
**Returns:**

import("react/jsx-runtime").JSX.Element

A complete phone number input React component with a country code selector autocomplete field.
