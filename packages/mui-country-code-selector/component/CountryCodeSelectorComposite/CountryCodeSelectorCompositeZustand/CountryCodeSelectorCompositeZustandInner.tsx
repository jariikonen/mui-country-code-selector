/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useContext, useEffect, useRef } from 'react';
import { TextField, FormHelperText } from '@mui/material';
import CountryCodeSelector from '../../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../../store/useCountryCodeStore';
import CCSelectorCompositeProps from '../../types/CCSelectorCompositeProps';
import Wrapper from '../Wrapper/index';
import { defaultIsOptionEqualToValue } from '../common';
import CountryCodeStoreContext from '../../store/CountryCodeStoreContext';

/**
 * A utility type that makes all properties of the base type optional without
 * stripping undefined from them (like Required does).
 * @see {@link https://stackoverflow.com/a/76847313}
 */
type RequiredWithUndefined<T> = {
  [K in keyof Required<T>]: T[K];
};

/** A type interface for the composite selector's inner component's props. */
interface CCSelectorCompositeInnerProps
  extends RequiredWithUndefined<
    Omit<CCSelectorCompositeProps, 'errorMessageDelay' | 'defaultValue'>
  > {
  errorMessageDelay: number;
  defaultValue: string;
}

/**
 * Inner component implementing the composite country code selector. The outer
 * component wraps this inner component into a CountryCodeStoreProvider that
 * provides the component-specific Zustand store for the inner component.
 */
function CountryCodeSelectorCompositeInner({
  id,
  name,
  value,
  onChange,
  inputRef,
  countryCodeLabel,
  phoneNumberLabel,
  errorMessageDelay,
  errorMessageDisplay,
  onError,
  defaultValue,
  layout,
  formGroupProps,
  gridLegacyContainerProps,
  gridLegacyItemProps,
  gridLegacySelectorProps,
  gridLegacyInputProps,
  gridLegacyErrorProps,
  gridContainerProps,
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  gridErrorProps,
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
  selectorRenderCountRef,
  inputRenderCountRef,
}: Required<CCSelectorCompositeInnerProps>) {
  const {
    phoneNumStr,
    errorMsg,
    phoneNumberInput,
    setRefs,
    initialize,
    handlePhoneNumberChange,
    handleValueChange,
    placeInputSelection,
  } = useCountryCodeStore();

  // Subscribe to countries state and set countriesSetRef, when country data
  // has been fetched.
  const countriesSetRef = useRef(false);
  const store = useContext(CountryCodeStoreContext);
  store?.subscribe((state) => {
    if (state.countries.length > 0) {
      countriesSetRef.current = true;
    }
  });

  const valueToUse = value ?? phoneNumStr;

  const errorStatusProp =
    errorMessageDisplay === 'both' || errorMessageDisplay === 'status'
      ? { error: true }
      : { error: false };

  useEffect(
    () => initialize(errorMessageDelay, onError, onChange),
    [errorMessageDelay, initialize, onChange, onError]
  );

  useEffect(() => {
    let isCancelled = false;

    // A function for checking that the country data has been initialized.
    // Country data is fetched asynchronously, so it might not be ready right
    // after the component is mounted.
    const waitForCountries = async (maxAttempts = 20, interval = 100) => {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (isCancelled) return;

        if (countriesSetRef.current) {
          handleValueChange(value);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, interval));
      }

      /* eslint-disable-next-line no-console */
      console.error(
        'Country code selector: Countries were not set after max attempts.'
      );
    };
    waitForCountries();

    return () => {
      isCancelled = true; // Cleanup if component unmounts
    };
  }, [handleValueChange, value]);

  // Preventing the input value from changing as the change event suggests,
  // makes React loose track of the correct position of the cursor, and the
  // cursor jumps to the end of the input. This happens, for example, when a
  // forbidden character is inputted into the phone number input. This can be
  // fixed by keeping track of the cursor position (more specifically the end
  // and start indices of the selected text within the input element) in the
  // state and setting those values again on every render. The
  // placeInputSelection() store - function sets the selection range based on
  // values stored in the store.
  useEffect(() => {
    placeInputSelection();
    if (inputRenderCountRef) {
      inputRenderCountRef.current += 1;
    }
  });

  const onInputRefChange = useCallback(
    (element: HTMLInputElement | null) => {
      setRefs(element, inputRef, defaultValue);
    },
    [defaultValue, inputRef, setRefs]
  );

  const defaultTextFieldShrink =
    document.activeElement === phoneNumberInput || phoneNumberInput?.value
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
      gridContainerProps={gridContainerProps}
      gridItemProps={gridItemProps}
      gridSelectorProps={gridSelectorProps}
      gridInputProps={gridInputProps}
      gridErrorProps={gridErrorProps}
      stackProps={stackProps}
      selectorSize={selectorSize}
      inputSize={inputSize}
      errorSize={errorSize}
    >
      <CountryCodeSelector
        filterOptions={filterOptions}
        label={countryCodeLabel}
        shrink={shrink}
        variant={variant}
        fullWidth
        isOptionEqualToValue={defaultIsOptionEqualToValue}
        renderCountRef={selectorRenderCountRef}
        {...selectorProps}
      />
      <TextField
        id={id}
        name={name}
        error={
          errorMsg !== null &&
          (errorMessageDisplay === 'status' || errorMessageDisplay === 'both')
        }
        fullWidth
        inputRef={onInputRefChange}
        InputLabelProps={{
          shrink: shrink ?? defaultTextFieldShrink,
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
          <FormHelperText {...errorStatusProp} {...errorProps}>
            {errorMsg}
          </FormHelperText>
        )}
    </Wrapper>
  );
}

export default CountryCodeSelectorCompositeInner;
