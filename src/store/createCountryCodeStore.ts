import { AutocompleteChangeReason } from '@mui/material';
import { createStore } from 'zustand';
import { CountryType } from '../lib/countryCodeData';
import CCSelectorState from '../types/CCSelectorState';
import setCursor from '../lib/setCursor';
import libHandlePhoneNumberChange from '../lib/handlePhoneNumberChange';
import libHandleCountryCodeChange from '../lib/handleCountryCodeChange';

/**
 * Zustand store for establishing a common state between the country
 * code autocomplete component and the external phone number input component.
 * The store is created using Zustand's createStore function which returns a
 * store object instead of a hook because passing a hook through a context
 * could allow violating the rules of hooks.
 * @see CCSelectorState
 * @see {@link https://github.com/pmndrs/zustand} for more information on
 *   Zustand.
 * @see {@link https://github.com/pmndrs/zustand/discussions/1975} for more
 *   on createStore vs. create.
 * @return Zustand store object
 */
const createCountryCodeStore = () =>
  createStore<CCSelectorState>(
    (
      set: (
        partial:
          | CCSelectorState
          | Partial<CCSelectorState>
          | ((
              state: CCSelectorState
            ) => CCSelectorState | Partial<CCSelectorState>),
        replace?: boolean | undefined
      ) => void,
      get: () => CCSelectorState
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
      changeHandler: undefined,
      setPhoneInputRef(phoneRef) {
        set({ phoneInputRef: phoneRef });
      },
      setErrorMsgDelay(seconds) {
        set({ errorMsgDelay: seconds });
      },
      displayError() {
        const {
          errorMsg: message,
          errorMsgDelay: delay,
          errorMsgTimeoutObj: timeoutObj,
        } = get();

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
      clearErrorMsg() {
        set({ errorMsg: null });
      },
      setCursor: () => setCursor(get().phoneInputRef, get().cursorPosition),
      setChangeHandler(handler) {
        set({ changeHandler: handler });
      },
      handlePhoneNumberChange(event) {
        const {
          phoneInputRef,
          countryCodeDigits,
          possibleCountries,
          significantDigits,
          applyStateChanges,
          changeHandler,
        } = get();
        const result = libHandlePhoneNumberChange(
          event.target.value,
          phoneInputRef,
          countryCodeDigits,
          possibleCountries,
          significantDigits
        );
        set(result);
        applyStateChanges(result);
        if (changeHandler && result.phoneNumStr) {
          changeHandler({ target: { value: result.phoneNumStr } });
        }
        if (Object.keys(result).includes('errorMsg')) {
          get().displayError();
        }
      },
      handleCountryCodeChange(
        _event,
        value: CountryType | null,
        reason: AutocompleteChangeReason
      ) {
        const {
          phoneInputRef,
          countryCodeDigits,
          phoneNumStr,
          applyStateChanges,
        } = get();
        const result = libHandleCountryCodeChange(
          value,
          phoneInputRef,
          countryCodeDigits,
          phoneNumStr,
          reason
        );
        set(result);
        applyStateChanges(result);
      },
      applyStateChanges(state) {
        const { phoneNumStr, phoneInputRef, changeHandler } = get();
        const isControlled = changeHandler !== undefined;

        // controlled
        if (changeHandler && state.phoneNumStr !== undefined) {
          changeHandler({ target: { value: state.phoneNumStr } });
        }

        // uncontrolled
        else if (!isControlled && phoneInputRef?.current) {
          if ('phoneNumStr' in state) {
            // eslint-disable-next-line no-param-reassign
            phoneInputRef.current.value = state.phoneNumStr!;
          } else {
            // eslint-disable-next-line no-param-reassign
            phoneInputRef.current.value = phoneNumStr;
          }
        }
      },
      handleValueChange(value) {
        const { phoneNumStr, handlePhoneNumberChange } = get();
        if (value !== undefined && value !== null && value !== phoneNumStr) {
          handlePhoneNumberChange({ target: { value } });
        }
      },
    })
  );

export default createCountryCodeStore;
