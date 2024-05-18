/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { countries } from '../lib/countryCodeData';
import useCountryCodeStore from '../store/useCountryCodeStore';
import CCSelectorProps from '../types/CCSelectorProps';
import {
  createDefaultRenderInput,
  createDefaultFilterOptions,
  defaultRenderOption,
  defaultGetOptionLabel,
} from './common';

/**
 * Autocomplete component to select the country code of a phone number from a
 * list of countries. Based on the MUI `Autocomplete` component
 * ({@link https://mui.com/material-ui/react-autocomplete}). Can be used in
 * conjunction with a text input field and common state between the
 * subcomponents to create a complete phone number input component.
 * @alpha
 */
function CountryCodeSelector({
  autoHighlight = true,
  autoSelect = true,
  filterOptions = createDefaultFilterOptions(),
  getOptionLabel = defaultGetOptionLabel,
  handleHomeEndKeys = false,
  label = 'Country code',
  renderOption = defaultRenderOption,
  renderInput,
  shrink,
  variant,
  renderCountRef,
  ...rest
}: CCSelectorProps) {
  const { handleCountryCodeChange, countryCodeValue } = useCountryCodeStore();

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
      onChange={handleCountryCodeChange}
      options={countries}
      renderOption={renderOption}
      renderInput={renderInputToUse}
      value={countryCodeValue}
      {...rest}
    />
  );
}

export default CountryCodeSelector;
