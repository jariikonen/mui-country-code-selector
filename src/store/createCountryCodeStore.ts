import { AutocompleteChangeReason } from '@mui/material';
import { createStore, StoreApi } from 'zustand';
import { CountryType } from '../lib/countryCodeData';
import CCSelectorState from '../types/CCSelectorState';
import libPlaceInputSelection from '../lib/placeInputSelection';
import libHandlePhoneNumberChange from '../lib/handlePhoneNumberChange';
import libHandleCountryCodeChange from '../lib/handleCountryCodeChange';
import { getForm } from '../lib/helpers';
import {
  removeResetHandler,
  addResetHandler,
  addKeyboardHandler,
  removeKeyboardHandler,
  addMouseHandler,
  removeMouseHandler,
  addBlurHandler,
  removeBlurHandler,
} from '../lib/handlers';

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
      set: StoreApi<CCSelectorState>['setState'],
      get: () => CCSelectorState
    ) => ({
      phoneNumStr: '',
      phoneNumSplit: 0,
      significantDigits: '',
      countryCodeDigits: '',
      countryCodeValue: null,
      possibleCountries: null,
      errorMsg: null,
      errorMsgDelay: 3,
      errorMsgTimeoutObj: null,
      phoneNumberInput: null,
      formElement: undefined,
      defaultValue: '',
      inputSelection: { selectionStart: 0, selectionEnd: 0 },
      clearedRerender: false,
      changeHandler: undefined,
      errorHandler: undefined,
      setPhoneNumberInput(inputElement) {
        set({ phoneNumberInput: inputElement });
      },
      setErrorMsgDelay(seconds) {
        set({ errorMsgDelay: seconds });
      },
      setChangeHandler(handler) {
        set({ changeHandler: handler });
      },
      setInputSelection({ selectionStart, selectionEnd }) {
        set({ inputSelection: { selectionStart, selectionEnd } });
      },
      toggleClearedRerender() {
        const { clearedRerender } = get();
        set({ clearedRerender: !clearedRerender });
      },
      setRefs(inputElement, inputRef = undefined, defaultValue = '') {
        const formElement = getForm(inputElement);
        set({
          formElement,
          defaultValue,
          phoneNumberInput: inputElement,
        });
        if (inputRef !== undefined) {
          inputRef.current = inputElement; // eslint-disable-line no-param-reassign
        }
        const {
          handlePhoneNumberChange,
          setInputSelection,
          toggleClearedRerender,
        } = get();
        addResetHandler(formElement, handlePhoneNumberChange, defaultValue);
        if (inputElement) {
          inputElement.value = defaultValue; // eslint-disable-line no-param-reassign
          handlePhoneNumberChange({ target: { value: defaultValue } });
        }
        addKeyboardHandler(inputElement, setInputSelection);
        addMouseHandler(inputElement, setInputSelection);
        addBlurHandler(inputElement, toggleClearedRerender);
      },
      initialize(errorMsgDelay, errorHandler, changeHandler) {
        set({ errorMsgDelay, errorHandler, changeHandler });
        const { cleanUp } = get();
        return cleanUp;
      },
      cleanUp() {
        const {
          formElement,
          phoneNumberInput,
          defaultValue,
          handlePhoneNumberChange,
          setInputSelection,
          toggleClearedRerender,
        } = get();
        removeResetHandler(formElement, handlePhoneNumberChange, defaultValue);
        removeKeyboardHandler(phoneNumberInput, setInputSelection);
        removeMouseHandler(phoneNumberInput, setInputSelection);
        removeBlurHandler(phoneNumberInput, toggleClearedRerender);
      },
      handlePhoneNumberChange(event) {
        const {
          phoneNumberInput,
          countryCodeDigits,
          possibleCountries,
          significantDigits,
          applyStateChanges,
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
        if (Object.keys(result).includes('errorMsg')) {
          const { displayError, errorHandler } = get();
          displayError();
          if (errorHandler && result.errorMsg) {
            errorHandler(result.errorMsg);
          }
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
            phoneNumberInput.value = state.phoneNumStr!;
          } else {
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
      placeInputSelection() {
        const { phoneNumberInput, inputSelection } = get();
        libPlaceInputSelection(phoneNumberInput, inputSelection);
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
