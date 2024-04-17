/* eslint-disable react/jsx-props-no-spreading */
import {
  AutocompleteRenderInputParams,
  Box,
  TextField,
  createFilterOptions,
} from '@mui/material';
import { CountryType } from '../lib/countryCodeData';
import Variant from '../types/Variant';

/**
 * Creates a default filter options function for the CountryCodeSelector's
 * Autocomplete component.
 * @see {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-filterOptions}
 * @see {@link https://mui.com/material-ui/react-autocomplete/#custom-filter}
 */
export function createDefaultFilterOptions() {
  return createFilterOptions({
    matchFrom: 'any',
    stringify: (option: CountryType) =>
      `${option.country} ${option.iso} +${option.code}`,
  });
}

/**
 * Default function for rendering the options in the CountryCodeSelector's
 * Autocomplete component.
 * @param props The props to apply on the li element.
 * @param option The option to render.
 * @returns The option element.
 * @see {@link https://mui.com/material-ui/api/autocomplete/#props}
 */
export function defaultRenderOption(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: CountryType
): React.ReactNode {
  return (
    <Box component="li" {...props}>
      {option.country} {option.iso} +{option.code}
    </Box>
  );
}

/**
 * Returns a default function for rendering the input component of the
 * CountryCodeSelector's Autocomplete component.
 * @param label CountryCodeSelector component's label passed to the input
 *    component.
 * @param shrink Indicates whether to shrink the label or not.
 * @param variant Variant of the TextField component to use.
 * @see {@link https://mui.com/material-ui/api/autocomplete/#props}
 */
export function createDefaultRenderInput(
  label: string,
  shrink?: boolean,
  variant?: Variant
) {
  return function defaultRenderInput(params: AutocompleteRenderInputParams) {
    return (
      <TextField
        {...params}
        label={label}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password', // disable autocomplete and autofill
        }}
        variant={variant}
        InputLabelProps={{ shrink }}
      />
    );
  };
}

/**
 * A default function for getting the option label string in the
 * CountryCodeSelector's Autocomplete component.
 * @param option The option for which the string is to be formed.
 * @see {@link https://mui.com/material-ui/api/autocomplete/#props}
 */
export function defaultGetOptionLabel(option: CountryType) {
  return `${option.country} (${option.iso})`;
}
