/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';
import { CountryType } from '../lib/countryCodeData';
import CCSelectorProps from '../types/CCSelectorProps';
import {
  DEFAULT_COUNTRY_CODE_LABEL,
  DEFAULT_SLOT_PROPS,
  createDefaultRenderInput,
  createDefaultFilterOptions,
  defaultRenderOption,
  createDefaultGetOptionLabel,
  defaultGetOptionKey,
} from './common';

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
    details?: AutocompleteChangeDetails<CountryType> | undefined
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
 *
 * This version is only meant to be used internally by the
 * `CountryCodeSelectorCombinedReact` component.
 * @internal
 */
export default function CountryCodeSelector({
  autoHighlight = true,
  autoSelect = true,
  filterOptions = createDefaultFilterOptions(),
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
  ...rest
}: CCSelectorPropsReact) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [elementWidth, setElementWidth] = useState(160);

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
    createDefaultRenderInput(label, elementWidth, shrink, variant);

  const getOptionKeyToUse = getOptionKey ?? defaultGetOptionKey;

  const getOptionLabelToUse =
    getOptionLabel ?? createDefaultGetOptionLabel(elementWidth);

  const slotPropsToUse = {
    ...DEFAULT_SLOT_PROPS,
    ...slotProps,
  };

  useEffect(() => {
    if (renderCountRef) {
      renderCountRef.current += 1; // eslint-disable-line no-param-reassign
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
      ref={onRefChange}
      {...rest}
    />
  );
}
