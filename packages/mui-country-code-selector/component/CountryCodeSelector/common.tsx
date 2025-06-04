/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable react/jsx-props-no-spreading */
import {
  AutocompleteRenderInputParams,
  Box,
  TextField,
  TextFieldVariants,
  createFilterOptions,
} from '@mui/material';
import type { Property } from 'csstype';
import { CountryType } from '../lib/countryCodeData';

/**
 * Default label text for the `CountryCodeSelector` component.
 * @alpha
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
export const DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION = 'Country';

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
 * A responsive breakpoint below which the CountryCodeSelector components use
 * shorter labels.
 * @alpha
 */
export const SELECTOR_RESPONSIVE_BREAKPOINT_WIDTH = 145;

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
    stringify: (option: CountryType) => {
      const country = Array.isArray(option.country)
        ? option.country.join(' ')
        : option.country;
      const displayIso = option.displayIso ? option.displayIso : option.iso;
      return `${country} ${option.iso} ${displayIso} +${option.code}`;
    },
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
  props: React.HTMLAttributes<HTMLLIElement> & { key: any },
  option: CountryType
): React.ReactNode {
  const displayIso = option.displayIso ? option.displayIso : option.iso;

  const { key, ...restOfProps } = props;

  let countryShort = '';
  let countryAdditional = '';
  if (Array.isArray(option.country)) {
    [countryShort, countryAdditional] = option.country;
    if (countryAdditional) {
      countryAdditional = ` (${countryAdditional})`;
    }
  } else {
    countryShort = option.country;
  }
  return (
    <Box component="li" key={key} {...restOfProps}>
      {countryShort}
      {countryAdditional} {displayIso} +{option.code}
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
 * @param elementWidth - The width of the selector element.
 * @param shrink - Indicates whether to shrink the label or not.
 * @param variant - Variant of the `TextField` component to use.
 * @returns A function for rendering the input component of the
 *    `CountryCodeSelector`'s `Autocomplete` component.
 * @alpha
 */
export function createDefaultRenderInput(
  label: string,
  elementWidth: number,
  shrink?: boolean,
  variant?: TextFieldVariants
) {
  return function defaultRenderInput(params: AutocompleteRenderInputParams) {
    let labelToUse = label;
    if (elementWidth < SELECTOR_RESPONSIVE_BREAKPOINT_WIDTH) {
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
 * Default function for getting the option key string in the
 * `CountryCodeSelector`'s underlying `Autocomplete` component.
 * See {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-getOptionKey}
 * for more information about the `getOptionKey` prop.
 * @returns The string to be used as the key of the option.
 * @alpha
 */
export function defaultGetOptionKey(option: CountryType) {
  const countryShort = Array.isArray(option.country)
    ? option.country[0]
    : option.country;
  return `${countryShort}${option.code}${option.iso}`;
}

/**
 * Creates a default function for getting the option label string in the
 * `CountryCodeSelector`'s underlying `Autocomplete` component.
 * See {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-getOptionLabel}
 * for more information about the `getOptionLabel` prop.
 * @param elementWidth - The width of the selector element.
 * @returns A function for getting the option label string.
 * @alpha
 */
export function createDefaultGetOptionLabel(elementWidth: number) {
  return function defaultGetOptionLabel(option: CountryType) {
    const displayIso = option.displayIso
      ? ` ${option.displayIso}`
      : ` ${option.iso}`;

    let countryShort = '';
    let countryAdditional = '';
    if (Array.isArray(option.country)) {
      [countryShort, countryAdditional] = option.country;
      if (countryAdditional) {
        countryAdditional = ` (${countryAdditional})`;
      }
    } else {
      countryShort = option.country;
    }

    if (elementWidth < SELECTOR_RESPONSIVE_BREAKPOINT_WIDTH) {
      return displayIso.trim();
    }
    return `${countryShort}${countryAdditional}${displayIso}`;
  };
}
