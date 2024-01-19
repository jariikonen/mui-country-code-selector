import { SyntheticEvent } from 'react';
import { AutocompleteChangeReason } from '@mui/material';
import { createStore } from 'zustand';
import { CountryType } from '../lib/countryCodeData';
import { CCodeState } from '../types';
import setCursor from '../lib/setCursor';
import handlePhoneNumberChange from '../lib/handlePhoneNumberChange';
import handleCountryCodeChange from '../lib/handleCountryCodeChange';

/**
 * Zustand store for establishing a common state between the country
 * code autocomplete component and the external phone number input component.
 * Created using Zustand's createStore function which returns a store object.
 * @see CCodeState
 * @see {@link https://github.com/pmndrs/zustand} for more information on
 *   Zustand.
 * @return Zustand store object
 */
const createCountryCodeStore = () =>
  createStore<CCodeState>(
    (
      set: (
        partial:
          | CCodeState
          | Partial<CCodeState>
          | ((state: CCodeState) => CCodeState | Partial<CCodeState>),
        replace?: boolean | undefined
      ) => void,
      get: () => CCodeState
    ) => ({
      phoneNumStr: '',
      phoneNumSplit: 0,
      significantDigits: '',
      cursorPosition: 0,
      phoneInputRef: null,
      countryCodeDigits: '',
      countryCodeValue: null,
      possibleCountries: null,
      errorMsg: null,
      errorMsgDelay: 3,
      errorMsgTimeoutObj: null,
      setPhoneInputRef(phoneRef) {
        set({ phoneInputRef: phoneRef });
      },
      setErrorMsgDelay(seconds) {
        set({ errorMsgDelay: seconds });
      },
      displayError() {
        const message = get().errorMsg;
        const delay = get().errorMsgDelay;
        const timeoutObj = get().errorMsgTimeoutObj;

        const setErrorMsgClear = (seconds: number) => {
          if (timeoutObj) {
            clearTimeout(timeoutObj);
          }
          const newTimeoutObj = setTimeout(() => {
            set({ errorMsg: null });
            set({ errorMsgTimeoutObj: null });
          }, seconds * 1000);
          set({ errorMsgTimeoutObj: newTimeoutObj });
        };

        if (message) {
          setErrorMsgClear(delay);
        }
      },
      setCursor: () => setCursor(get().phoneInputRef, get().cursorPosition),
      clearErrorMsg() {
        set({ errorMsg: null });
      },
      handlePhoneNumberChange(e: { target: { value: string } }) {
        const {
          phoneInputRef,
          countryCodeDigits,
          possibleCountries,
          significantDigits,
        } = get();
        const result = handlePhoneNumberChange(
          e.target.value,
          phoneInputRef,
          countryCodeDigits,
          possibleCountries,
          significantDigits
        );
        set(result);
        if (Object.keys(result).includes('errorMsg')) {
          get().displayError();
        }
      },
      handleCountryCodeChange(
        _e: SyntheticEvent<Element, Event>,
        value: CountryType | null,
        reason: AutocompleteChangeReason
      ) {
        const { phoneInputRef, countryCodeDigits, phoneNumStr } = get();
        const result = handleCountryCodeChange(
          value,
          phoneInputRef,
          countryCodeDigits,
          phoneNumStr,
          reason
        );
        set(result);
      },
    })
  );

export default createCountryCodeStore;
