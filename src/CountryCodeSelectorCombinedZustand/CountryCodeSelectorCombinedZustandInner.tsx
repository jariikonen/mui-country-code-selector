import React, { useEffect, useRef } from 'react';
import {
  TextField,
  FormControl,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import CountryCodeSelector from '../CountryCodeSelectorZustand';
import useCountryCodeStore from '../store/useCountryCodeStore';
import { CountryType } from '../lib/countryCodeData';

interface CountryCodeSelectorCombinedInnerProps {
  /**
   * A React ref for storing the phone number value outside the
   * CountryCodeSelectorCombined component's state. The value of the ref is
   * updated when the phone number inputted by the user changes.
   */
  phoneNumValueRef: React.MutableRefObject<string>;

  /**
   * A React ref for storing the country code value outside the
   * CountryCodeSelectorCombined component's state. The value of the ref is
   * updated when the phone number inputted by the user changes.
   */
  countryCodeValueRef:
    | React.MutableRefObject<CountryType | null>
    | undefined
    | null;

  /**
   * Label for the country code selector input element.
   */
  countryCodeLabel: string;

  /**
   * Label for the phone number input element.
   */
  phoneNumberLabel: string;
}

/**
 * Inner component implementing the combined country code selector. The outer
 * component wraps this inner component into a CountryCodeStoreProvider that
 * provides the component-specific Zustand store for the inner component.
 */
function CountryCodeSelectorCombinedInner({
  phoneNumValueRef,
  countryCodeValueRef,
  countryCodeLabel,
  phoneNumberLabel,
}: CountryCodeSelectorCombinedInnerProps) {
  const {
    setPhoneInputRef,
    phoneNumStr,
    countryCodeValue,
    errorMsg,
    handlePhoneNumberChange,
    handleCountryCodeChange,
  } = useCountryCodeStore();

  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!phoneNumStr && phoneNumValueRef?.current) {
      handlePhoneNumberChange({ target: { value: phoneNumValueRef.current } });
      if (
        countryCodeValueRef &&
        countryCodeValue !== countryCodeValueRef.current
      ) {
        handleCountryCodeChange(
          {},
          countryCodeValueRef.current,
          'selectOption'
        );
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      phoneNumValueRef.current = phoneNumStr;
      if (countryCodeValueRef) {
        // eslint-disable-next-line no-param-reassign
        countryCodeValueRef.current = countryCodeValue;
      }
    }
  }, [
    phoneNumStr,
    phoneNumValueRef,
    handlePhoneNumberChange,
    countryCodeValue,
    countryCodeValueRef,
    handleCountryCodeChange,
  ]);

  useEffect(() => {
    setPhoneInputRef(phoneInputRef);
  }, [setPhoneInputRef]);

  return (
    <FormControl fullWidth>
      <FormGroup row>
        <CountryCodeSelector
          label={countryCodeLabel}
          sx={{
            width: '35%',
            paddingRight: '0.2rem',
            boxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
          }}
        />
        <TextField
          error={errorMsg !== null}
          label={phoneNumberLabel}
          value={phoneNumStr}
          type="text"
          inputRef={(e) => {
            phoneInputRef.current = e as HTMLInputElement | null;
          }}
          sx={{
            width: '65%',
            paddingLeft: '0.2rem',
            boxSizing: 'border-box',
            webkitBoxSizing: 'border-box',
          }}
          onChange={handlePhoneNumberChange}
        />
        {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
      </FormGroup>
    </FormControl>
  );
}

export default CountryCodeSelectorCombinedInner;
