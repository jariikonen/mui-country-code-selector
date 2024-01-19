import { MutableRefObject } from 'react';
import { AutocompleteChangeReason } from '@mui/material';
import { CountryType } from './countryCodeData';
import { CCodeState } from '../types';
import { getDigits, resetCountryCode } from './helpers';

/**
 * Implementation of the handler function for the CountryCodeSelector
 * Autocomplete component's onChange events.
 * @see {@link https://mui.com/material-ui/api/autocomplete/#Autocomplete-prop-onChange}
 * @see CCodeState.handleCountryCodeChange
 * @param countryCodeValue Value prop of the onChange event (the value of the
 *                         CountryCodeSelector Autocomplete component).
 * @param phoneInputRef A ref to the phone number input element.
 * @param countryCodeDigits Digits of the currently detected country code
 *                          (an empty string if no country code has yet been
 *                          detected).
 * @param phoneNumStr The whole phone number including the country code (the
 *                    value of the phone number input element).
 * @param reason One of "createOption", "selectOption", "removeOption",
 *               "blur" or "clear".
 * @returns
 */
export default function handleCountryCodeChange(
  countryCodeValue: CountryType | null,
  phoneInputRef: MutableRefObject<HTMLInputElement | null> | null,
  countryCodeDigits: string,
  phoneNumStr: string,
  reason: AutocompleteChangeReason
): Partial<CCodeState> {
  /**
   * Forms a RegExp object that can be used for clearing the country code
   * part of the phone number string.
   * @param cCDigits Digits of the country code to be looked for.
   * @returns RegExp object that will match to the country code part of the
   *   phone number string even if it contains any number of visual separator
   *   characters.
   */
  function getCCRegExp(cCDigits: string) {
    const separators = '(\\s*|-*)';
    return new RegExp(
      `${['\\+', ...cCDigits].join(separators) + separators}0*`
    );
  }

  /**
   * Returns an object that can be used for setting the state to correspond
   * to the new country code. Passing the object to Zusand's set method will
   * replace the old country code with the new one in the state variable
   * phoneNumStr, and set the country code variables and cursor position in
   * the respective state variables.
   * @param value New country code as CountryType object.
   * @param detectedCCDigits The digits of the current country code.
   * @param phoneNum Current phone number string.
   * @returns A partial CCodeState object that can be used for setting the
   *   state to correspond to the new country code.
   */
  function setNewCountryCode(
    _value: CountryType,
    detectedCCDigits: string,
    phoneNum: string
  ): Partial<CCodeState> {
    const newCCPart = `+${_value.code} `;
    const cleanedPhoneNum = phoneNum.startsWith('0')
      ? phoneNum.replace(/^0*/, '')
      : phoneNum.replace(getCCRegExp(detectedCCDigits), '');
    const newPhoneNum = newCCPart + cleanedPhoneNum;
    return {
      countryCodeDigits: getDigits(_value.code),
      countryCodeValue: _value,
      phoneNumStr: newPhoneNum,
      cursorPosition: newPhoneNum.length,
    };
  }

  /**
   * Returns an object that can be used for clearing the country code part of
   * the phone number string in the state object.
   * @param detectedCCDigits The digits of the current country code.
   * @param phoneNum The phone number string to be cleared.
   * @returns An object that can be passed to Zustand's set() function to set
   *   the state.
   */
  function clearCountryCodePart(detectedCCDigits: string, phoneNum: string) {
    const newPhoneNum = phoneNum.replace(getCCRegExp(detectedCCDigits), '');
    return {
      ...resetCountryCode(),
      phoneNumStr: newPhoneNum,
    };
  }

  // user pressed the clear button
  if (reason === 'clear') {
    return {
      ...clearCountryCodePart(countryCodeDigits, phoneNumStr),
    };
  }

  // user selected a new country code value
  if (countryCodeValue?.code) {
    if (phoneInputRef?.current) {
      phoneInputRef.current.focus();
    }

    return {
      ...setNewCountryCode(countryCodeValue, countryCodeDigits, phoneNumStr),
    };
  }

  return {};
}
