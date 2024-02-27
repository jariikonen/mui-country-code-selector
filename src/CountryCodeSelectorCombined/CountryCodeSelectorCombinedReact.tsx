/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  TextField,
  FormHelperText,
  AutocompleteChangeReason,
} from '@mui/material';
import CCSelectorCombinedProps from '../types/CCSelectorCombinedProps';
import CCSelectorReactState from '../types/CCSelectorReactState';
import PossibleCountries from '../types/PossibleCountries';
import { CountryType } from '../lib/countryCodeData';
import libHandlePhoneNumberChange from '../lib/handlePhoneNumberChange';
import libHandleCountryCodeChange from '../lib/handleCountryCodeChange';
import { getForm } from '../lib/helpers';
import CountryCodeSelectorReact from '../CountryCodeSelector/CountryCodeSelectorReact';
import { addResetHandler, removeResetHandler } from './common';
import setCursor from '../lib/setCursor';
import Wrapper from './Wrapper';

/**
 * A React component combining a CountryCodeSelector with a TextField phone
 * number input. Implemented using React's useState for the component's local
 * state.
 *
 * CountryCodeSelectorCombined is essentially a phone number input component
 * with a searchable autocomplete country code selector. The component can be
 * used either as a controlled or an uncontrolled component. The component is
 * uncontrolled when the value prop is left undefined and the value of the
 * phone number input is accessed through a ref (provide a ref using the
 * inputRef prop and it is set to point to the phone number input
 * element). When used as a controlled component the phone number input's value
 * is controlled from the outside of the component using the value and the
 * onChange props.
 * @see CountryCodeSelectorCombinedReactProps
 * @see {@link https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components}
 * @returns jsx
 */
function CountryCodeSelectorCombinedReact({
  value,
  onChange,
  countryCodeLabel = 'Country code',
  phoneNumberLabel = 'Phone number',
  errorMessageDelay = 3,
  inputRef = undefined,
  defaultValue = '',
  group = false,
  filterOptions,
  shrink,
  variant,
  selectorProps = {},
  inputProps = {},
}: CCSelectorCombinedProps) {
  /** Value of the country code selector. */
  const [countryCodeValue, setCountryCodeValue] = useState<
    CountryType | null | undefined
  >(null);

  /** Error message to be shown to the user. */
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /** A React ref to the phone number input element. Used internally. */
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  /** A React ref for storing the value of the phone number input. */
  const phoneNumStrRef = useRef('');

  /** An index indicating where the local part of the phone number starts. */
  const phoneNumSplitRef = useRef(0);

  /**
   * The digits of the phone number considered as part of the country code.
   * Does not include any visual separator characters or the plus sign.
   */
  const significantDigitsRef = useRef('');

  /** The digits of the detected country code. */
  const countryCodeDigitsRef = useRef('');

  /** Data on country codes that are possible based on the phoneNumStr. */
  const possibleCountriesRef = useRef<PossibleCountries | null>(null);

  /** Timeout object for timing how long the error message is displayed. */
  const errorMsgTimeoutObjRef = useRef<NodeJS.Timeout | null>(null);

  /** Position index of the cursor in the phone number input field. */
  const cursorPositionRef = useRef(0);

  /** Indicates whether the component is used as a controlled component. */
  const isControlled = value !== undefined;

  /** Sets the React state according to the output from the library functions. */
  const set = useCallback(
    (partialState: CCSelectorReactState | Partial<CCSelectorReactState>) => {
      const keys = Object.keys(partialState);

      keys.forEach((key) => {
        switch (key) {
          case 'countryCodeValue':
            setCountryCodeValue(partialState[key]);
            break;
          case 'errorMsg':
            setErrorMsg(partialState[key]!);
            break;

          case 'phoneNumStr':
            phoneNumStrRef.current = partialState[key]!;
            break;
          case 'phoneNumSplit':
            phoneNumSplitRef.current = partialState[key]!;
            break;
          case 'significantDigits':
            significantDigitsRef.current = partialState[key]!;
            break;
          case 'countryCodeDigits':
            countryCodeDigitsRef.current = partialState[key]!;
            break;
          case 'possibleCountries':
            possibleCountriesRef.current = partialState[key]!;
            break;
          case 'errorMsgTimeoutObj':
            errorMsgTimeoutObjRef.current = partialState[key]!;
            break;
          case 'cursorPosition':
            cursorPositionRef.current = partialState[key]!;
            break;

          default:
            throw new Error(`unknown key ${key}`);
        }
      });
    },
    []
  );

  /** Sets the timeout for the error message display. */
  const displayError = useCallback(() => {
    const seconds = errorMessageDelay;

    if (errorMsgTimeoutObjRef.current) {
      clearTimeout(errorMsgTimeoutObjRef.current);
    }

    const newTimeoutObj = setTimeout(() => {
      setErrorMsg(null);
      if (errorMsgTimeoutObjRef.current) {
        clearTimeout(errorMsgTimeoutObjRef.current);
      }
    }, seconds * 1000);
    errorMsgTimeoutObjRef.current = newTimeoutObj;
  }, [errorMessageDelay]);

  /**
   * Applies phoneNumStr changes to correct variables so that the component's
   * user can access the correct value and a correct value is displayed on
   * screen. Sets also the current value of the phoneInputRef, when used as
   * uncontrolled component.
   *
   * When the component is used as a controlled component the phone number
   * value is accessed using component's 'value' and 'onChange' props. 'Value'
   * is the state variable and 'onChange' is a handler function that changes
   * the value-prop according to the changes to the input element's value. In
   * controlled mode the onChange function is used for applying the phone
   * number value to the value prop.
   *
   * When the component is used as an uncontrolled component, caller accesses
   * the value using a ref to the input element. In this case the function sets
   * the current value of the referenced element.
   */
  const applyStateChanges = useCallback(
    (result: Partial<CCSelectorReactState>) => {
      // controlled
      if (
        onChange &&
        'phoneNumStr' in result &&
        typeof result.phoneNumStr === 'string'
      ) {
        onChange({ target: { value: result.phoneNumStr } });
      }

      // uncontrolled
      else if (!isControlled && phoneInputRef.current) {
        if ('phoneNumStr' in result) {
          phoneInputRef.current.value = result.phoneNumStr!;
        } else {
          phoneInputRef.current.value = phoneNumStrRef.current;
        }
      }
    },
    [isControlled, onChange]
  );

  /** A handler for phone number input element's change events. */
  const handlePhoneNumberChange = useCallback(
    (e: { target: { value: string } }) => {
      const result = libHandlePhoneNumberChange(
        e.target.value,
        phoneInputRef.current,
        countryCodeDigitsRef.current,
        possibleCountriesRef.current,
        significantDigitsRef.current
      );
      set(result);
      applyStateChanges(result);
      if (Object.keys(result).includes('errorMsg')) {
        displayError();
      }
    },
    [applyStateChanges, displayError, set]
  );

  /** A handler for the country code selector's change events. */
  const handleCountryCodeChange = useCallback(
    (
      _e: unknown,
      country: CountryType | null,
      reason: AutocompleteChangeReason
    ) => {
      const result = libHandleCountryCodeChange(
        country,
        phoneInputRef.current,
        countryCodeDigitsRef.current,
        phoneNumStrRef.current,
        reason
      );
      set(result);
      applyStateChanges(result);
    },
    [applyStateChanges, set]
  );

  // When the component is used as a controlled component the value of the
  // phone number input element can be set (is controlled) from the outside.
  // If the value is changed directly (in contrast to changing it in the
  // onChange() handler function), this change must be handled using the
  // handlePhoneNumberChange() function so that the change is also taken into
  // account in the country code selector's value.
  useEffect(() => {
    if (
      isControlled &&
      typeof value === 'string' &&
      value !== phoneNumStrRef.current
    ) {
      handlePhoneNumberChange({ target: { value } });
    }
  }, [handlePhoneNumberChange, isControlled, value]);

  /**
   * A React ref to the form element that is parent to this component. This is
   * needed for catching and handling the reset events.
   */
  const formRef = useRef<HTMLElement | null>(null);

  /** Sets the phoneInputRef, inputRef and the formRef. */
  const onInputRefChange = useCallback(
    (element: HTMLInputElement | null) => {
      const form = getForm(element);
      formRef.current = form!;
      phoneInputRef.current = element;
      if (inputRef !== undefined) {
        inputRef.current = element; // eslint-disable-line no-param-reassign
      }
    },
    [inputRef]
  );

  // Set (and remove when the component is unmounted) reset event handler.
  useEffect(() => {
    addResetHandler(
      formRef.current,
      phoneInputRef.current,
      handlePhoneNumberChange,
      defaultValue
    );
    return () =>
      removeResetHandler(
        formRef.current,
        phoneInputRef.current,
        handlePhoneNumberChange,
        defaultValue
      );
  }, [defaultValue, handlePhoneNumberChange]);

  // set the phone number input to it's default value if such is provided
  useEffect(() => {
    if (defaultValue && phoneInputRef.current?.value === '') {
      phoneInputRef.current.value = defaultValue;
      handlePhoneNumberChange({ target: { value: defaultValue } });
    }
  }, [defaultValue, handlePhoneNumberChange]);

  // Inputting a forbidden character into the phone number input makes the
  // cursor jump to the end of the field. Until finding a better solution, this
  // can be fixed by storing the cursor position into the state and setting it
  // back in a useEffect hook.
  useEffect(() => {
    setCursor(phoneInputRef.current, cursorPositionRef.current);
  });

  const defaultTextFieldShrink =
    document.activeElement === phoneInputRef.current ||
    (phoneInputRef.current?.value && phoneInputRef.current.value.length > 0)
      ? true
      : undefined;

  return (
    <Wrapper group={group}>
      <CountryCodeSelectorReact
        filterOptions={filterOptions}
        label={countryCodeLabel}
        onChange={handleCountryCodeChange}
        shrink={shrink}
        sx={{
          width: '35%',
          paddingRight: '0.2rem',
          boxSizing: 'border-box',
          WebkitBoxSizing: 'border-box',
        }}
        value={countryCodeValue}
        variant={variant}
        {...selectorProps} // eslint-disable-line react/jsx-props-no-spreading
      />
      <TextField
        error={errorMsg !== null}
        inputRef={onInputRefChange}
        InputLabelProps={{
          shrink: shrink ?? defaultTextFieldShrink,
        }}
        label={phoneNumberLabel}
        onChange={handlePhoneNumberChange}
        sx={{
          width: '65%',
          paddingLeft: '0.2rem',
          boxSizing: 'border-box',
          webkitBoxSizing: 'border-box',
        }}
        type="text"
        value={value}
        variant={variant}
        {...inputProps}
      />
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </Wrapper>
  );
}

export default CountryCodeSelectorCombinedReact;
