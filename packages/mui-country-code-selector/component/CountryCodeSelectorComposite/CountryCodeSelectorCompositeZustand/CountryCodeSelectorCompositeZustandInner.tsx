/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect } from 'react';
import { TextField, FormHelperText } from '@mui/material';
import CountryCodeSelector from '../../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../../store/useCountryCodeStore';
import CCSelectorCompositeProps from '../../types/CCSelectorCompositeProps';
import Wrapper from '../Wrapper/index';
import { defaultIsOptionEqualToValue } from '../common';

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
    handleValueChange(value);
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
