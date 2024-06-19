/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Autocomplete, useTheme } from '@mui/material';
import useCountryCodeStore from '../store/useCountryCodeStore';
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
  getOptionKey = undefined,
  getOptionLabel = undefined,
  handleHomeEndKeys = false,
  label = DEFAULT_COUNTRY_CODE_LABEL,
  renderOption = defaultRenderOption,
  renderInput,
  shrink,
  slotProps,
  variant,
  renderCountRef,
  ...rest
}: CCSelectorProps) {
  const { handleCountryCodeChange, countryCodeValue, countries } =
    useCountryCodeStore();

  useEffect(() => {
    if (renderCountRef) {
      renderCountRef.current += 1; // eslint-disable-line no-param-reassign
    }
  });

  const theme = useTheme();

  let renderInputToUse = renderInput;
  if (!renderInputToUse) {
    renderInputToUse = createDefaultRenderInput(label, theme, shrink, variant);
  }

  const getOptionKeyToUse = getOptionKey ?? defaultGetOptionKey;

  let getOptionLabelToUse = getOptionLabel;
  if (!getOptionLabelToUse) {
    getOptionLabelToUse = createDefaultGetOptionLabel(theme);
  }

  const slotPropsToUse = {
    ...DEFAULT_SLOT_PROPS,
    ...slotProps,
  };

  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      filterOptions={filterOptions}
      getOptionKey={getOptionKeyToUse}
      getOptionLabel={getOptionLabelToUse}
      handleHomeEndKeys={handleHomeEndKeys}
      onChange={handleCountryCodeChange}
      options={countries}
      renderOption={renderOption}
      renderInput={renderInputToUse}
      slotProps={slotPropsToUse}
      value={countryCodeValue}
      {...rest}
    />
  );
}

export default CountryCodeSelector;
