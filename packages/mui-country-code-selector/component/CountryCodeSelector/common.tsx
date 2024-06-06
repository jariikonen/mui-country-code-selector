/* eslint-disable react/jsx-props-no-spreading */
import {
  AutocompleteRenderInputParams,
  Box,
  TextField,
  TextFieldVariants,
  Theme,
  createFilterOptions,
} from '@mui/material';
import type { Property } from 'csstype';
import { CountryType } from '../lib/countryCodeData';

/**
 * Default label text for the `CountryCodeSelector` component.
 */
export const DEFAULT_COUNTRY_CODE_LABEL = 'Country code';

/**
 * Default abbreviation for the label text. Used when `window.innerWidth` is
 * smaller than `theme.breakpoints.values.sm` (i.e. the viewport width is
 * smaller than the smallest breakpoint in the MUI theme that the component
 * uses). See {@link https://mui.com/material-ui/customization/breakpoints/}
 * for more information about the breakpoints and
 * {@link https://mui.com/material-ui/customization/theming/} for more
 * information about the MUI's themes.
 * @alpha
 */
export const DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION = 'Ctry.';

/**
 * Default width for the `CountryCodeSelector`'s option list (i.e., default
 * `width` of the `paper` subcomponent of the underlying `Autocomplete`
 * component).
 * @alpha
 */
export const DEFAULT_OPTION_LIST_WIDTH: Property.Width = '20rem';

/**
 * Default `max-width` for the `CountryCodeSelector`'s option list (i.e.,
 * default `max-width` of the `paper` subcomponent of the underlying
 * `Autocomplete` component).
 * @alpha
 */
export const DEFAULT_OPTION_LIST_MAX_WIDTH: Property.Width = '90vw';

/**
 * Default slot props object for `CountryCodeSelector`'s underlying
 * `Autocomplete` component. Sets the default `min-width` for the `paper`
 * component that implements the dropdown option list.
 * @alpha
 */
export const DEFAULT_SLOT_PROPS = {
  paper: {
    sx: {
      width: DEFAULT_OPTION_LIST_WIDTH,
      maxWidth: DEFAULT_OPTION_LIST_MAX_WIDTH,
    },
  },
};

/**
 * Creates a default filter options function for the `CountryCodeSelector`'s
 * underlying `Autocomplete` component. See
 * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-filterOptions}
 * and {@link https://mui.com/material-ui/react-autocomplete/#custom-filter}
 * for more information about custom filtering.
 * @alpha
 */
export function createDefaultFilterOptions() {
  return createFilterOptions({
    matchFrom: 'any',
    stringify: (option: CountryType) =>
      `${option.country} ${option.iso} +${option.code}`,
  });
}

/**
 * Default function for rendering the options in the `CountryCodeSelector`'s
 * underlying `Autocomplete` component. See
 * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-renderOption}
 * for more information about the `renderOption` prop.
 * @param props - The props to apply on the `li` element.
 * @param option - The option to render.
 * @returns The option element.
 * @alpha
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
 * `CountryCodeSelector`'s underlying `Autocomplete` component. See
 * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-renderInput}
 * for more information about the `renderInput` prop.
 * @param label - CountryCodeSelector component's label passed to the input
 *    component.
 * @param theme - The MUI `Theme` object that the component uses.
 * @param shrink - Indicates whether to shrink the label or not.
 * @param variant - Variant of the `TextField` component to use.
 * @returns A function for rendering the input component of the
 *    `CountryCodeSelector`'s `Autocomplete` component.
 * @alpha
 */
export function createDefaultRenderInput(
  label: string,
  theme: Theme,
  shrink?: boolean,
  variant?: TextFieldVariants
) {
  return function defaultRenderInput(params: AutocompleteRenderInputParams) {
    let labelToUse = label;
    if (window.innerWidth < theme.breakpoints.values.sm) {
      labelToUse = DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION;
    }
    return (
      <TextField
        {...params}
        label={labelToUse}
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
 * Creates a default function for getting the option label string in the
 * `CountryCodeSelector`'s underlying `Autocomplete` component.
 * See {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-getOptionLabel}
 * for more information about the `getOptionLabel` prop.
 * @param theme - The theme object being used.
 * @returns A function for getting the option label string.
 * @alpha
 */
export function createDefaultGetOptionLabel(theme: Theme) {
  return function defaultGetOptionLabel(option: CountryType) {
    const breakpoint = theme.breakpoints.values.sm;
    if (window.innerWidth < breakpoint) {
      return `${option.iso}`;
    }
    return `${option.country} (${option.iso})`;
  };
}
