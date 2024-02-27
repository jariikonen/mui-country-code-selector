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
 * Creates a default filter options function for the CountryCodeSelector (see
 * the documentation for Autocomplete component's filterOptions prop).
 * @see {@link https://mui.com/material-ui/api/autocomplete/#props}
 */
export function createDefaultFilterOptions() {
  return createFilterOptions({
    matchFrom: 'any',
    stringify: (option: CountryType) =>
      `${option.country} ${option.iso} +${option.code}`,
  });
}

/**
 * Default function for rendering the options in CountryCodeSelector (see the
 * documentation for Autocomplete component's renderOption prop )
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

export function defaultGetOptionLabel(option: CountryType) {
  return `${option.country} (${option.iso})`;
}
