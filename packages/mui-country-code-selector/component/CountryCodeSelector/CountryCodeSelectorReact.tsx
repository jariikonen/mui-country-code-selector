/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';
import { CountryType, countries } from '../lib/countryCodeData';
import CCSelectorProps from '../types/CCSelectorProps';
import {
  createDefaultRenderInput,
  createDefaultFilterOptions,
  defaultRenderOption,
  defaultGetOptionLabel,
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
}

/**
 * Autocomplete component to select the country code of a phone number from a
 * a list of countries. Based on the MUI Autocomplete component (
 * {@link https://mui.com/material-ui/react-autocomplete}). Can be used in
 * conjunction with a text input field and common state between the
 * subcomponents to create a complete phone number input component.
 *
 * This version is only meant to be used internally by the
 * CountryCodeSelectorCombinedReact component.
 * @internal
 */
export default function CountryCodeSelector({
  autoHighlight = true,
  autoSelect = true,
  filterOptions = createDefaultFilterOptions(),
  getOptionLabel = defaultGetOptionLabel,
  handleHomeEndKeys = false,
  label = 'Country code',
  onChange,
  renderOption = defaultRenderOption,
  renderInput,
  shrink,
  value,
  variant,
  renderCountRef,
  ...rest
}: CCSelectorPropsReact) {
  useEffect(() => {
    if (renderCountRef) {
      renderCountRef.current += 1; // eslint-disable-line no-param-reassign
    }
  });

  let renderInputToUse = renderInput;
  if (!renderInputToUse) {
    renderInputToUse = createDefaultRenderInput(label, shrink, variant);
  }

  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      handleHomeEndKeys={handleHomeEndKeys}
      onChange={onChange}
      options={countries}
      renderOption={renderOption}
      renderInput={renderInputToUse}
      value={value}
      {...rest}
    />
  );
}