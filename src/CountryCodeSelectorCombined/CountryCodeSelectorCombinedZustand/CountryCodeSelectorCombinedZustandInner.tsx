/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect } from 'react';
import { TextField, FormHelperText } from '@mui/material';
import CountryCodeSelector from '../../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../../store/useCountryCodeStore';
import CCSelectorCombinedProps from '../../types/CCSelectorCombinedProps';
import Wrapper from '../Wrapper.ts';

/**
 * A utility type that makes all properties of the base type optional without
 * stripping undefined from them (like Required does).
 * @see {@link https://stackoverflow.com/a/76847313}
 */
type RequiredWithUndefined<T> = {
  [K in keyof Required<T>]: T[K];
};

/** A type interface for the combined selector's inner component's props. */
interface CCSelectorCombinedInnerProps
  extends RequiredWithUndefined<
    Omit<CCSelectorCombinedProps, 'errorMessageDelay' | 'defaultValue'>
  > {
  errorMessageDelay: number;
  defaultValue: string;
}

/**
 * Inner component implementing the combined country code selector. The outer
 * component wraps this inner component into a CountryCodeStoreProvider that
 * provides the component-specific Zustand store for the inner component.
 */
function CountryCodeSelectorCombinedInner({
  value,
  onChange,
  inputRef,
  countryCodeLabel,
  phoneNumberLabel,
  errorMessageDelay,
  errorMessageDisplay,
  errorHandler,
  defaultValue,
  group,
  formGroupProps,
  gridContainerProps,
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  gridErrorProps,
  grid2ContainerProps,
  grid2ItemProps,
  grid2SelectorProps,
  grid2InputProps,
  grid2ErrorProps,
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
}: Required<CCSelectorCombinedInnerProps>) {
  const {
    errorMsg,
    phoneNumberInput,
    initialize,
    handlePhoneNumberChange,
    handleValueChange,
    setRefs,
    placeInputSelection,
    clearedRerender,
  } = useCountryCodeStore();

  useEffect(
    () => initialize(errorMessageDelay, onChange),
    [errorMessageDelay, initialize, onChange]
  );

  useEffect(() => {
    handleValueChange(value);
  }, [handleValueChange, value]);

  // Inputting a forbidden character into the phone number input makes the
  // cursor jump to the end of the field. This can be fixed by keeping track of
  // the cursor position (more specifically the end and start indices of the
  // selected text within the input element) in the state and setting those
  // values again on every render. The placeInputSelection() store-function
  // sets the selection range based on values stored in the store.
  useEffect(() => {
    placeInputSelection();
    if (inputRenderCountRef) {
      inputRenderCountRef.current += 1; // eslint-disable-line no-param-reassign
    }
  });

  const onInputRefChange = useCallback(
    (element: HTMLInputElement | null) => {
      setRefs(element, inputRef, defaultValue);
    },
    [defaultValue, inputRef, setRefs]
  );

  let defaultTextFieldShrink =
    document.activeElement === phoneNumberInput || phoneNumberInput?.value
      ? true
      : undefined;

  useEffect(() => {
    if (clearedRerender) {
      defaultTextFieldShrink = false; // eslint-disable-line react-hooks/exhaustive-deps
    }
  }, [clearedRerender]);

  // pass error message to outside error handler if such exists
  useEffect(() => {
    if (errorMsg && errorHandler) {
      errorHandler(errorMsg);
    }
  }, [errorHandler, errorMsg]);

  return (
    <Wrapper
      group={group}
      formGroupProps={formGroupProps}
      gridContainerProps={gridContainerProps}
      gridItemProps={gridItemProps}
      gridSelectorProps={gridSelectorProps}
      gridInputProps={gridInputProps}
      gridErrorProps={gridErrorProps}
      grid2ContainerProps={grid2ContainerProps}
      grid2ItemProps={grid2ItemProps}
      grid2SelectorProps={grid2SelectorProps}
      grid2InputProps={grid2InputProps}
      grid2ErrorProps={grid2ErrorProps}
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
        renderCountRef={selectorRenderCountRef}
        {...selectorProps}
      />
      <TextField
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
        value={value}
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
    </Wrapper>
  );
}

export default CountryCodeSelectorCombinedInner;
