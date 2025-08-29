/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  Box,
  createFilterOptions,
  TextField,
  TextFieldVariants,
} from '@mui/material';
import { CountryType } from '../lib/countryCodeData';
import CCSelectorProps from '../types/CCSelectorProps';
import {
  DEFAULT_COUNTRY_CODE_LABEL,
  DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION,
  DEFAULT_SLOT_PROPS,
  SELECTOR_RESPONSIVE_BREAKPOINT_WIDTH,
} from './constants';

/**
 * Creates a default filter options function for the `CountryCodeSelector`'s
 * underlying `Autocomplete` component. See
 * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-filterOptions}
 * and {@link https://mui.com/material-ui/react-autocomplete/#custom-filter}
 * for more information about custom filtering.
 * @alpha
 */
function createDefaultFilterOptions() {
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
function defaultRenderOption(
  props: React.HTMLAttributes<HTMLLIElement> & { key: string | number },
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
 * @param margin - The `TextField` component's margin.
 * @param error - If `true`, the `TextField` component is displayed in an error
 *    state.
 * @returns A function for rendering the input component of the
 *    `CountryCodeSelector`'s `Autocomplete` component.
 * @alpha
 */
function createDefaultRenderInput(
  label: string,
  elementWidth: number,
  shrink?: boolean,
  variant?: TextFieldVariants,
  margin?: 'none' | 'dense' | 'normal',
  error?: boolean
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
        slotProps={{
          htmlInput: {
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          },
          inputLabel: { shrink },
        }}
        variant={variant}
        margin={margin}
        error={error}
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
function defaultGetOptionKey(option: CountryType) {
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
function createDefaultGetOptionLabel(elementWidth: number) {
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

/**
 * Props for the version of the CountryCodeSelector that uses React's
 * `useState` for the state.
 * @internal
 */
export interface CCSelectorPropsReact extends CCSelectorProps {
  /**
   * Value of the country code selector element. Provide this when you wish to
   * use the component as a controlled component.
   */
  value: CountryType | null | undefined;

  /**
   * CountryCodeSelector's onChange event handler. Sets the component's value.
   * Provide this when you wish to use the component as a controlled
   * component.
   */
  onChange: (
    _e: unknown,
    value: CountryType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CountryType>
  ) => void;

  /** The calling codes and names of the countries of the world. */
  countries: readonly CountryType[];
}

/**
 * Autocomplete component to select the country code of a phone number from a
 * a list of countries. Based on the MUI `Autocomplete` component
 * ({@link https://mui.com/material-ui/react-autocomplete}). Can be used in
 * conjunction with a text input field and common state between the
 * subcomponents to create a complete phone number input component.
 * @alpha
 */
export default function CountryCodeSelector({
  autoHighlight = true,
  autoSelect = true,
  filterOptions = undefined,
  getOptionKey = undefined,
  getOptionLabel = undefined,
  handleHomeEndKeys = false,
  label = DEFAULT_COUNTRY_CODE_LABEL,
  onChange,
  renderOption = defaultRenderOption,
  renderInput,
  shrink,
  slotProps,
  value,
  variant,
  renderCountRef,
  countries,
  size,
  margin,
  error,
  disabled,
  ...rest
}: CCSelectorPropsReact) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [elementWidth, setElementWidth] = useState(160);

  if (!filterOptions) {
    filterOptions = createDefaultFilterOptions();
  }

  useEffect(() => {
    if (!elementRef.current) return undefined;
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentBoxSize) {
        setElementWidth(entries[0].contentBoxSize[0].inlineSize);
      }
    });
    resizeObserver.observe(elementRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const onRefChange = useCallback((element: HTMLInputElement | null) => {
    elementRef.current = element;
  }, []);

  const renderInputToUse =
    renderInput ??
    createDefaultRenderInput(
      label,
      elementWidth,
      shrink,
      variant,
      margin,
      error
    );

  const getOptionKeyToUse = getOptionKey ?? defaultGetOptionKey;

  const getOptionLabelToUse =
    getOptionLabel ?? createDefaultGetOptionLabel(elementWidth);

  const slotPropsToUse = {
    ...DEFAULT_SLOT_PROPS,
    ...slotProps,
  };

  useEffect(() => {
    if (renderCountRef) {
      renderCountRef.current += 1;
    }
  });

  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      filterOptions={filterOptions}
      getOptionKey={getOptionKeyToUse}
      getOptionLabel={getOptionLabelToUse}
      handleHomeEndKeys={handleHomeEndKeys}
      onChange={onChange}
      options={countries}
      renderOption={renderOption}
      renderInput={renderInputToUse}
      slotProps={slotPropsToUse}
      value={value}
      size={size}
      disabled={disabled}
      ref={onRefChange}
      {...rest}
    />
  );
}
