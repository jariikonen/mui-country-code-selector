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

interface CCSelectorPropsReact extends CCSelectorProps {
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

export default CountryCodeSelector;
