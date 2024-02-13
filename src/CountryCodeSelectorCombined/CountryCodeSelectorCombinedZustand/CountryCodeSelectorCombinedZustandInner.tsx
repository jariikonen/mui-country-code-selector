import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import {
  TextField,
  FormControl,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import CountryCodeSelector from '../../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../../store/useCountryCodeStore';
import {
  removeResetHandler,
  setResetHandler,
  setUncontrolledRefs,
} from '../common';

interface CountryCodeSelectorCombinedInnerProps {
  /**
   * Variable holding the value of the phone number input field. Provide this
   * when you wish to use the component as a controlled component.
   */
  value: string | null | undefined;

  /**
   * Phone number input's onChange event handler. Sets the value prop.
   * Provide this when you wish to use the component as a controlled
   * component.
   */
  onChange: ((e: { target: { value: string } }) => void) | undefined;

  /**
   * A React Ref that will be set to point to the phone number input element.
   * Provide this to access the component's value when using the component as
   * an uncontrolled component.
   */
  inputRef: MutableRefObject<HTMLInputElement | null> | undefined;

  /** Label for the country code selector input element. */
  countryCodeLabel: string;

  /** Label for the phone number input element. */
  phoneNumberLabel: string;

  /** Defines how long the error message is displayed in seconds. */
  errorMessageDelay: number;
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
}: CountryCodeSelectorCombinedInnerProps) {
  const {
    errorMsg,
    setPhoneInputRef,
    setErrorMsgDelay,
    setChangeHandler,
    handlePhoneNumberChange,
    handleValueChange,
  } = useCountryCodeStore();

  /** A React ref to the phone number input element. */
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (onChange) {
      setChangeHandler(onChange);
    }
  }, [onChange, setChangeHandler]);

  useEffect(() => {
    setPhoneInputRef(phoneInputRef);
  }, [setPhoneInputRef]);

  useEffect(() => {
    setErrorMsgDelay(errorMessageDelay);
  }, [errorMessageDelay, setErrorMsgDelay]);

  useEffect(() => {
    handleValueChange(value);
  }, [handleValueChange, value]);

  /**
   * A React ref to the form element that is parent to this component. Needed
   * for catching and handling the reset events.
   */
  const formRef = useRef<HTMLElement | null>(null);

  /** Sets the phoneInputRef, inputRef and the formRef. */
  const onInputRefChange = useCallback(
    (el: HTMLInputElement | null) => {
      setUncontrolledRefs(el, formRef, phoneInputRef, inputRef);
    },
    [inputRef]
  );

  useEffect(() => {
    const currentFormElement = formRef.current;
    setResetHandler(currentFormElement, phoneInputRef, handlePhoneNumberChange);
    return removeResetHandler(
      currentFormElement,
      phoneInputRef,
      handlePhoneNumberChange
    );
  }, [handlePhoneNumberChange]);

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
            shrink:
              document.activeElement === phoneInputRef.current ||
              (phoneInputRef.current?.value &&
                phoneInputRef.current.value.length > 0)
                ? true
                : undefined,
          }}
        />
        {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
      </FormGroup>
    </FormControl>
  );
}

export default CountryCodeSelectorCombinedInner;
