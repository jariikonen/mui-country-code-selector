import { AutocompleteChangeReason } from '@mui/material';
import { createStore } from 'zustand';
import { CountryType } from '../lib/countryCodeData';
import CCSelectorState from '../types/CCSelectorState';
import libSetCursor from '../lib/setCursor';
import libHandlePhoneNumberChange from '../lib/handlePhoneNumberChange';
import libHandleCountryCodeChange from '../lib/handleCountryCodeChange';
import { getForm } from '../lib/helpers';
import {
  removeResetHandler,
  addResetHandler,
} from '../CountryCodeSelectorCombined/common';

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
      countryCodeDigits: '',
      countryCodeValue: null,
      possibleCountries: null,
      errorMsg: null,
      errorMsgDelay: 3,
      errorMsgTimeoutObj: null,
      phoneNumberInput: null,
      formElement: undefined,
      defaultValue: '',
      changeHandler: undefined,
      setPhoneNumberInput(inputElement) {
        set({ phoneNumberInput: inputElement });
      },
      setErrorMsgDelay(seconds) {
        set({ errorMsgDelay: seconds });
      },
      setChangeHandler(handler) {
        set({ changeHandler: handler });
      },
      setRefs(inputElement, inputRef, defaultValue) {
        const formElement = getForm(inputElement);
        set({ formElement, defaultValue, phoneNumberInput: inputElement });
        if (inputRef !== undefined) {
          inputRef.current = inputElement; // eslint-disable-line no-param-reassign
        }
        const { handlePhoneNumberChange } = get();
        addResetHandler(
          formElement,
          inputElement,
          handlePhoneNumberChange,
          defaultValue
        );
        if (inputElement) {
          inputElement.value = defaultValue; // eslint-disable-line no-param-reassign
          handlePhoneNumberChange({ target: { value: defaultValue } });
        }
      },
      initialize(errorMsgDelay, changeHandler) {
        set({ errorMsgDelay, changeHandler });
        const { cleanUp } = get();
        return cleanUp;
      },
      cleanUp() {
        const {
          formElement,
          phoneNumberInput,
          defaultValue,
          handlePhoneNumberChange,
        } = get();
        removeResetHandler(
          formElement,
          phoneNumberInput,
          handlePhoneNumberChange,
          defaultValue
        );
      },
      handlePhoneNumberChange(event) {
        const {
          phoneNumberInput,
          countryCodeDigits,
          possibleCountries,
          significantDigits,
          applyStateChanges,
          changeHandler,
        } = get();
        const result = libHandlePhoneNumberChange(
          event.target.value,
          phoneNumberInput,
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
          phoneNumberInput,
          countryCodeDigits,
          phoneNumStr,
          applyStateChanges,
        } = get();
        const result = libHandleCountryCodeChange(
          value,
          phoneNumberInput,
          countryCodeDigits,
          phoneNumStr,
          reason
        );
        set(result);
        applyStateChanges(result);
      },
      applyStateChanges(state) {
        const { phoneNumStr, phoneNumberInput, changeHandler } = get();
        const isControlled = changeHandler !== undefined;

        // controlled
        if (changeHandler && state.phoneNumStr !== undefined) {
          changeHandler({ target: { value: state.phoneNumStr } });
        }

        // uncontrolled
        else if (!isControlled && phoneNumberInput) {
          if ('phoneNumStr' in state) {
            // eslint-disable-next-line no-param-reassign
            phoneNumberInput.value = state.phoneNumStr!;
          } else {
            // eslint-disable-next-line no-param-reassign
            phoneNumberInput.value = phoneNumStr;
          }
        }
      },
      handleValueChange(value) {
        const { phoneNumStr, handlePhoneNumberChange } = get();
        if (value !== undefined && value !== null && value !== phoneNumStr) {
          handlePhoneNumberChange({ target: { value } });
        }
      },
      setCursor() {
        const { phoneNumberInput, cursorPosition } = get();
        libSetCursor(phoneNumberInput, cursorPosition);
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
    })
  );

export default createCountryCodeStore;
