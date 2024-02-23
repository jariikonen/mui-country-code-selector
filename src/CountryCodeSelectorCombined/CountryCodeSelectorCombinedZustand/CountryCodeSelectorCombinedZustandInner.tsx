/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect } from 'react';
import { TextField, FormHelperText } from '@mui/material';
import CountryCodeSelector from '../../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../../store/useCountryCodeStore';
import CCSelectorCombinedProps from '../../types/CCSelectorCombinedProps';
import Wrapper from '../Wrapper';

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

  // only props that are not null are applied to the AutoComplete component
  const variantIfNotNull = {
    ...(variant === null ? null : { variant }),
  };

  const defaultShrink =
    document.activeElement === phoneNumberInput ||
    (phoneNumberInput?.value && phoneNumberInput.value.length > 0)
      ? true
      : undefined;

  return (
    <Wrapper group={group}>
      <CountryCodeSelector
        label={countryCodeLabel}
        filterOptions={filterOptions}
        shrink={shrink}
        variant={variant}
        sx={{
          width: '35%',
          paddingRight: '0.2rem',
          boxSizing: 'border-box',
          WebkitBoxSizing: 'border-box',
        }}
        {...selectorProps}
      />
      <TextField
        error={errorMsg !== null}
        label={phoneNumberLabel}
        value={value}
        type="text"
        inputRef={onInputRefChange}
        sx={{
          width: '65%',
          paddingLeft: '0.2rem',
          boxSizing: 'border-box',
          webkitBoxSizing: 'border-box',
        }}
        onChange={handlePhoneNumberChange}
        InputLabelProps={{
          shrink: shrink !== null ? shrink : defaultShrink,
        }}
        {...variantIfNotNull}
        {...inputProps}
      />
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </Wrapper>
  );
}

export default CountryCodeSelectorCombinedInner;
