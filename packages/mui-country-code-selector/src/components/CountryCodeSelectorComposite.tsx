/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react';
import { TextField, FormHelperText } from '@mui/material';
import CCSelectorCompositeProps from '../types/CCSelectorCompositeProps';
import CountryCodeSelector from './CountryCodeSelector';
import Wrapper from './Wrapper';
import {
  DEFAULT_ERROR_MESSAGE_DELAY,
  DEFAULT_ERROR_MESSAGE_DISPLAY,
  DEFAULT_PHONE_NUMBER_LABEL,
} from './constants';
import useCountryCodeSelectorState from '../lib/useCountryCodeSelectorState';

/**
 * A composite phone number input component consisting of a separate country
 * code selector field and a phone number input field.
 *
 * Based on MUI's `Autocomplete`
 * ({@link https://mui.com/material-ui/react-autocomplete/}) and `TextField`
 * ({@link https://mui.com/material-ui/react-text-field/}) components.
 * @returns A composite phone number input React component with a country code
 *    selector autocomplete field.
 * @alpha
 */
export default function CountryCodeSelectorComposite({
  id,
  name,
  value,
  onChange,
  countryCodeLabel,
  phoneNumberLabel = DEFAULT_PHONE_NUMBER_LABEL,
  errorMessageDelay = DEFAULT_ERROR_MESSAGE_DELAY,
  errorMessageDisplay = DEFAULT_ERROR_MESSAGE_DISPLAY,
  onError = undefined,
  inputRef = undefined,
  defaultValue = '',
  layout = undefined,
  formGroupProps,
  gridLegacyContainerProps,
  gridLegacyItemProps,
  gridLegacySelectorProps,
  gridLegacyInputProps,
  gridLegacyErrorProps,
  gridLegacyHelperTextProps,
  gridContainerProps,
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  gridErrorProps,
  gridHelperTextProps,
  stackProps,
  selectorSize,
  inputSize,
  errorSize,
  filterOptions,
  shrink,
  variant,
  selectorProps,
  inputProps,
  errorProps,
  helperText,
  size,
  margin,
  disabled,
  error,
  ...rest
}: CCSelectorCompositeProps) {
  selectorProps ??= {};
  inputProps ??= {};
  errorProps ??= {};

  let phoneInputRef = useRef<HTMLInputElement | null>(null);
  let inputRefToUse = inputRef;
  if (inputRefToUse === undefined) {
    inputRefToUse = phoneInputRef;
  } else {
    if (typeof inputRefToUse === 'function') {
      inputRefToUse(phoneInputRef.current);
    } else {
      phoneInputRef = inputRefToUse;
    }
  }

  const {
    countryCodeValue,
    errorMsg,
    phoneNumberInputValue: valueToUse,
    handleCountryCodeChange,
    handlePhoneNumberChange,
    onInputRefChange,
    countries,
  } = useCountryCodeSelectorState(
    value,
    defaultValue,
    errorMessageDelay,
    onChange,
    onError,
    inputRef
  );

  const defaultTextFieldShrink =
    document.activeElement === phoneInputRef.current ||
    phoneInputRef.current?.value
      ? true
      : undefined;

  return (
    <Wrapper
      layout={layout}
      formGroupProps={formGroupProps}
      gridLegacyContainerProps={gridLegacyContainerProps}
      gridLegacyItemProps={gridLegacyItemProps}
      gridLegacySelectorProps={gridLegacySelectorProps}
      gridLegacyInputProps={gridLegacyInputProps}
      gridLegacyErrorProps={gridLegacyErrorProps}
      gridLegacyHelperTextProps={gridLegacyHelperTextProps}
      gridContainerProps={gridContainerProps}
      gridItemProps={gridItemProps}
      gridSelectorProps={gridSelectorProps}
      gridInputProps={gridInputProps}
      gridErrorProps={gridErrorProps}
      gridHelperTextProps={gridHelperTextProps}
      stackProps={stackProps}
      selectorSize={selectorSize}
      inputSize={inputSize}
      errorSize={errorSize}
    >
      <CountryCodeSelector
        filterOptions={filterOptions}
        fullWidth
        label={countryCodeLabel}
        onChange={handleCountryCodeChange}
        shrink={shrink}
        value={countryCodeValue}
        variant={variant}
        countries={countries}
        size={size}
        margin={margin}
        error={error}
        disabled={disabled}
        {...selectorProps}
      />
      <TextField
        id={id}
        name={name}
        error={
          (errorMsg !== null &&
            (errorMessageDisplay === 'status' ||
              errorMessageDisplay === 'both')) ||
          error
        }
        fullWidth
        inputRef={onInputRefChange}
        slotProps={{
          inputLabel: {
            shrink: shrink ?? defaultTextFieldShrink,
          },
        }}
        label={phoneNumberLabel}
        onChange={handlePhoneNumberChange}
        type="text"
        value={valueToUse}
        variant={variant}
        size={size}
        margin={margin}
        disabled={disabled}
        {...rest}
        {...inputProps}
      />
      {errorMsg &&
        (errorMessageDisplay === 'message' ||
          errorMessageDisplay === 'both') && (
          <FormHelperText error {...errorProps}>
            {errorMsg}
          </FormHelperText>
        )}
      {helperText && !errorMsg && <FormHelperText>{helperText}</FormHelperText>}
    </Wrapper>
  );
}
