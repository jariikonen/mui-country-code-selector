/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react';
import { TextField, FormHelperText, Grid } from '@mui/material';
import {
  CCSelectorCompositeProps,
  CountryCodeSelector,
  useCountryCodeSelectorState,
  DEFAULT_PHONE_NUMBER_LABEL,
  DEFAULT_ERROR_MESSAGE_DELAY,
  DEFAULT_ERROR_MESSAGE_DISPLAY,
} from 'mui-country-code-selector';

export default function CustomCountryCodeSelectorComposite({
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
  filterOptions,
  shrink,
  variant,
  selectorProps,
  inputProps,
  errorProps,
}: CCSelectorCompositeProps) {
  selectorProps ??= {};
  inputProps ??= {};
  errorProps ??= {};

  // manage the input ref internally if not provided from outside
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
    <Grid
      container
      columnSpacing={{ xs: 1 }}
      rowSpacing={{ xs: 1 }}
      sx={{ mb: { xs: 1 } }}
    >
      <Grid>
        <CountryCodeSelector
          filterOptions={filterOptions}
          fullWidth
          sx={{ minWidth: 120 }}
          label={countryCodeLabel}
          onChange={handleCountryCodeChange}
          shrink={shrink}
          value={countryCodeValue}
          variant={variant}
          countries={countries}
          {...selectorProps}
        />
      </Grid>
      <Grid>
        <TextField
          id={id}
          name={name}
          error={
            errorMsg !== null &&
            (errorMessageDisplay === 'status' || errorMessageDisplay === 'both')
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
          {...inputProps}
        />
        {errorMsg &&
          (errorMessageDisplay === 'message' ||
            errorMessageDisplay === 'both') && (
            <FormHelperText error {...errorProps}>
              {errorMsg}
            </FormHelperText>
          )}
      </Grid>
    </Grid>
  );
}
