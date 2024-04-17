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
 * MUI AutoComplete component that provides a selection of countries and their
 * international phone number country codes. Needs also another input element
 * for inputting the phone number. Creates a Zustand store object for keeping
 * the state between these inputs. Store object is identified by the given id
 * string.
 * @see CountryCodeSelectorProps
 * @see CCodeState
 * @see useCountryCodeStore
 * @see {@link https://mui.com/material-ui/react-autocomplete}
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
