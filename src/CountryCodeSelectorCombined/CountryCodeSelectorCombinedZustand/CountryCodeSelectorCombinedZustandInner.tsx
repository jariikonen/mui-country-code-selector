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
  defaultValue,
  group,
  formGroupProps,
  gridContainerProps,
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  grid2ContainerProps,
  grid2ItemProps,
  grid2SelectorProps,
  grid2InputProps,
  selectorSize,
  inputSize,
  filterOptions,
  shrink,
  variant,
  selectorProps,
  inputProps,
}: Required<CCSelectorCombinedInnerProps>) {
  const {
    errorMsg,
    phoneNumberInput,
    initialize,
    handlePhoneNumberChange,
    handleValueChange,
    setRefs,
    setCursor,
  } = useCountryCodeStore();

  useEffect(
    () => initialize(errorMessageDelay, onChange),
    [errorMessageDelay, initialize, onChange]
  );

  useEffect(() => {
    handleValueChange(value);
  }, [handleValueChange, value]);

  // Inputting a forbidden character into the phone number input makes the
  // cursor jump to the end of the field. Until finding a better solution, this
  // can be fixed by storing the cursor position into the state and setting it
  // back in a useEffect hook.
  useEffect(() => {
    setCursor();
  });

  const onInputRefChange = useCallback(
    (element: HTMLInputElement | null) => {
      setRefs(element, inputRef, defaultValue);
    },
    [defaultValue, inputRef, setRefs]
  );

  const defaultTextFieldShrink =
    document.activeElement === phoneNumberInput ||
    (phoneNumberInput?.value && phoneNumberInput.value.length > 0)
      ? true
      : undefined;

  return (
    <Wrapper
      group={group}
      formGroupProps={formGroupProps}
      gridContainerProps={gridContainerProps}
      gridItemProps={gridItemProps}
      gridSelectorProps={gridSelectorProps}
      gridInputProps={gridInputProps}
      grid2ContainerProps={grid2ContainerProps}
      grid2ItemProps={grid2ItemProps}
      grid2SelectorProps={grid2SelectorProps}
      grid2InputProps={grid2InputProps}
      selectorSize={selectorSize}
      inputSize={inputSize}
    >
      <CountryCodeSelector
        filterOptions={filterOptions}
        label={countryCodeLabel}
        shrink={shrink}
        variant={variant}
        fullWidth
        {...selectorProps}
      />
      <TextField
        error={errorMsg !== null}
        fullWidth
        inputRef={onInputRefChange}
        InputLabelProps={{
          shrink: shrink !== null ? shrink : defaultTextFieldShrink,
        }}
        label={phoneNumberLabel}
        onChange={handlePhoneNumberChange}
        type="text"
        value={value}
        variant={variant}
        {...inputProps}
      />
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </Wrapper>
  );
}

export default CountryCodeSelectorCombinedInner;
