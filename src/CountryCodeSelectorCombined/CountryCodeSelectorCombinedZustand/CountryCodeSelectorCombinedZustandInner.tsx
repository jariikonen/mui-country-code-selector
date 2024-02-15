import { MutableRefObject, useCallback, useEffect } from 'react';
import {
  TextField,
  FormControl,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import CountryCodeSelector from '../../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../../store/useCountryCodeStore';

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
      setRefs(element, inputRef);
    },
    [inputRef, setRefs]
  );

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
              document.activeElement === phoneNumberInput ||
              (phoneNumberInput?.value && phoneNumberInput.value.length > 0)
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
