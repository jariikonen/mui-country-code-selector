import { SyntheticEvent, useRef } from 'react';
import { AutocompleteChangeReason } from '@mui/material';
import { createStore } from 'zustand/vanilla';
import { CountryType } from './countryCodeData';
import { CCodeState } from './types';
import setCursor from './lib/setCursor';
import handlePhoneNumberChange from './lib/handlePhoneNumberChange';
import handleCountryCodeChange from './lib/handleCountryCodeChange';

/**
 * Zustand store for establishing a common state between the country
 * code autocomplete field and the external phone number input. Created
 * using Zustand's createStore function that returns a store object.
 * @see CCodeState
 * @see {@link https://github.com/pmndrs/zustand} for more information on
 *   Zustand.
 * @return Zusandt store object
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

/**
 * Type for the Zusand store object used for common state between
 * CountryCodeSelectors and their external input elements.
 * @see CountryCodeSelector, CCodeState, createCountryCodeStore
 */
type CountryCodeStore = ReturnType<typeof createCountryCodeStore>;

/**
 * A record object containing key value pairs of CountryCodeStores used for
 * different CountryCodeSelectors. Each store is identified by a string key.
 * @see CountryCodeSelector
 */
const countryCodeStores: Record<string, CountryCodeStore> = {};

/**
 * Returns CountryCodeStore object corresponding to the key given as parameter.
 * If the key does not correspond to any store, a new store is created.
 * @param key Key that identifies the store object.
 */
const getCountryCodeStore = (key: string) => {
  let cCState = countryCodeStores[key];
  if (!cCState) {
    countryCodeStores[key] = createCountryCodeStore();
    cCState = countryCodeStores[key];
  }
  return cCState;
};

/**
 * Returns a hook to a CountryCodeStore object corresponding to the key. If the
 * key does not correspond to any store, a new store is created.
 * @param key Key that identifies the store object.
 */
const useCountryCodeStore = (key: string) => {
  const ref = useRef(getCountryCodeStore(key));

  return ref.current;
};

export default useCountryCodeStore;
