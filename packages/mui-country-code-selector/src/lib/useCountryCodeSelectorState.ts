import {
  RefCallback,
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { AutocompleteChangeReason } from '@mui/material';
import { CountryType, getCountries } from './countryCodeData';
import { InputSelection, PossibleCountries } from '../types';
import CCSelectorState from '../types/CCSelectorState';
import { DEFAULT_ERROR_MESSAGE_DELAY } from '../components/constants';
import libHandlePhoneNumberChange from './handlePhoneNumberChange';
import libHandleCountryCodeChange from './handleCountryCodeChange';
import { getForm, placeInputSelection } from './commonFunctions';
import {
  addBlurHandler,
  addKeyboardHandler,
  addMouseHandler,
  addResetHandler,
  removeBlurHandler,
  removeKeyboardHandler,
  removeMouseHandler,
  removeResetHandler,
} from './eventHandlers';

/**
 * A custom hook for creating a country code selector composite component.
 *
 * Returns an object containing functions and values to create a composite
 * component of country code selector and a phone number input component. The
 * CountryCodeSelectorComposite component is created using this hook.
 *
 * Properties returned by the hook:
 * - countryCodeValue: set this to control the value of the country code
 *    selector component,
 * - errorMsg: error message from the phone number input validation,
 * - phoneNumberInputValue: set this to control the value of the phone number
 *    input component,
 * - handleCountryCodeChange(): set this as the onChange event handler of the
 *    country codeSelector component,
 * - handlePhoneNumberChange(): set this as the onChange event handler of the
 *    phone number input component,
 * - onInputRefChange(): put this to the inputRef prop of the phone number
 *    input component; it sets the refs needed by the hook internally, and
 * - countries: give these to CountryCodeSelector component used for selecting
 *    the country code or use them as options in your custom selector
 *    component.
 * @param value - Variable holding the value of the phone number input field.
 *    Provide this when you wish to use the component as a controlled
 *    component.
 * @param defaultValue - A default phone number value. Provide this if you wish
 *    to set the default value when using the component as an uncontrolled
 *    component.
 * @param errorMessageDelay - Defines how long the error message is displayed
 *    in seconds.
 * @param onChange - Phone number input's change event handler. Sets the value
 *    prop. Provide this when you wish to use the component as a controlled
 *    component.
 * @param onError - Passes a custom function for handling errors. The function
 *    receives the error message as a parameter.
 * @param inputRef - A React ref that will be set to point to the phone number
 *    input element. Provide this to access the component's value when using
 *    the component as an uncontrolled component.
 * @returns An object containing functions and values to create a composite
 *    component of country code selector and a phone number input component.
 * @alpha
 */
export default function useCountryCodeSelectorState(
  value?: string,
  defaultValue = '',
  errorMessageDelay = DEFAULT_ERROR_MESSAGE_DELAY,
  onChange?: (e: { target: { value: string } }) => void,
  onError?: (error: string) => void,
  inputRef?:
    | RefObject<HTMLInputElement | null>
    | RefCallback<HTMLInputElement | null>
) {
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

  const [countries, setCountries] = useState<readonly CountryType[]>([]);

  const countriesReadyRef = useRef(false);

  /** Data on country codes that are possible based on the phoneNumStr. */
  const possibleCountriesRef = useRef<PossibleCountries | null>(null);

  /** Timeout object for timing how long the error message is displayed. */
  const errorMsgTimeoutObjRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * The start and end indices of the text selection within the phone number
   * input (i.e., the cursor position).
   */
  const inputSelectionRef = useRef<InputSelection>({
    selectionStart: 0,
    selectionEnd: 0,
  });

  // TODO: TARKISTA, MITEN TÄTÄ KANNATTAA KÄYTTÄÄ (ESIM. OTETAAN PARAMETRINA KÄYTETÄÄNKÖ; ONKO forceRerender PÄÄLLEKKÄINEN?)!!!!!!!!!!!!!!
  // The state variable clearedRerender is used for triggering a rerender of
  // the component after the phone number input has been cleared and the
  // component has lost focus. The rerender is needed for getting the MUI
  // TextField's label to enlarge back to it's initial state. Variable does
  // not need to be used anywhere to trigger the rerender. The value is toggled
  // by the blur handler when the input has been cleared and the element loses
  // the focus.
  const [, setClearedRerender] = useState(false);

  /** Indicates whether the component is used as a controlled component. */
  const isControlled = value !== undefined;

  /** The variable to be used as the phone number input's value. */
  const [localValue, setLocalValue] = useState(phoneNumStrRef.current);
  const valueToUse = value ?? localValue;

  /** Sets the React state according to the output from the library functions. */
  const set = useCallback(
    (partialState: CCSelectorState | Partial<CCSelectorState>) => {
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
          case 'countries':
            setCountries(partialState[key]!);
            break;
          case 'possibleCountries':
            possibleCountriesRef.current = partialState[key]!;
            break;
          case 'errorMsgTimeoutObj':
            errorMsgTimeoutObjRef.current = partialState[key]!;
            break;
          case 'inputSelection':
            inputSelectionRef.current = partialState[key]!;
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
    (result: Partial<CCSelectorState>) => {
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
          setLocalValue(result.phoneNumStr!);
          phoneInputRef.current.value = result.phoneNumStr!;
        } else {
          setLocalValue(phoneNumStrRef.current);
          phoneInputRef.current.value = phoneNumStrRef.current;
        }
      }
    },
    [isControlled, onChange]
  );

  // A function for forcing the component to rerender
  const [, forceRerender] = useReducer((x: number) => x + 1, 0);

  /** A handler for phone number input element's change events. */
  const handlePhoneNumberChange = useCallback(
    (e: { target: { value: string } }) => {
      const result = libHandlePhoneNumberChange(
        e.target.value,
        phoneInputRef.current,
        countryCodeDigitsRef.current,
        possibleCountriesRef.current,
        significantDigitsRef.current,
        countries
      );
      set(result);
      applyStateChanges(result);
      if (Object.keys(result).includes('errorMsg')) {
        displayError();
        if (onError && result.errorMsg) {
          onError(result.errorMsg);
        }
        forceRerender();
      }
    },
    [applyStateChanges, countries, displayError, onError, set]
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
    let isCancelled = false;

    // A function for checking that the country data has been initialized.
    // Country data is fetched asynchronously, so it might not be ready right
    // after the component is mounted.
    const waitForCountries = async (maxAttempts = 20, interval = 100) => {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (isCancelled) return;

        if (countriesReadyRef.current) {
          if (
            isControlled &&
            typeof value === 'string' &&
            value !== phoneNumStrRef.current
          ) {
            handlePhoneNumberChange({ target: { value } });
          }
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, interval));
      }

      /* eslint-disable-next-line no-console */
      console.error(
        'Country code selector: Countries were not set after max attempts.'
      );
    };
    waitForCountries();

    return () => {
      isCancelled = true; // Cleanup if component unmounts
    };
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
        if (typeof inputRef === 'function') {
          inputRef(element);
        } else {
          inputRef.current = element;
        }
      }
    },
    [inputRef]
  );

  const setInputSelection = useCallback((inputSelection: InputSelection) => {
    inputSelectionRef.current = inputSelection;
  }, []);

  const toggleClearedRerender = useCallback(() => {
    setClearedRerender((previousValue) => !previousValue);
  }, []);

  const addEventListeners = useCallback(() => {
    addResetHandler(formRef.current, handlePhoneNumberChange, defaultValue);
    addKeyboardHandler(phoneInputRef.current, setInputSelection);
    addMouseHandler(phoneInputRef.current, setInputSelection);
    addBlurHandler(phoneInputRef.current, toggleClearedRerender);
  }, [
    defaultValue,
    handlePhoneNumberChange,
    setInputSelection,
    toggleClearedRerender,
  ]);

  const cleanUpEventListeners = useCallback(() => {
    removeResetHandler(formRef.current, handlePhoneNumberChange, defaultValue);
    removeKeyboardHandler(phoneInputRef.current, setInputSelection);
    removeMouseHandler(phoneInputRef.current, setInputSelection);
    removeBlurHandler(phoneInputRef.current, toggleClearedRerender);
  }, [
    defaultValue,
    handlePhoneNumberChange,
    setInputSelection,
    toggleClearedRerender,
  ]);

  // Set (and remove when the component is unmounted) reset event handler.
  useEffect(() => {
    addEventListeners();
    return cleanUpEventListeners;
  }, [addEventListeners, cleanUpEventListeners]);

  // set the phone number input to it's default value if such is provided
  useEffect(() => {
    if (defaultValue && phoneInputRef.current?.value === '') {
      handlePhoneNumberChange({ target: { value: defaultValue } });
    }
  }, [defaultValue, handlePhoneNumberChange]);

  // Preventing the input value from changing as the change event suggests,
  // makes React loose track of the correct position of the cursor, and the
  // cursor jumps to the end of the input. This happens, for example, when a
  // forbidden character is inputted into the phone number input. This can be
  // fixed by keeping track of the cursor position (more specifically the end
  // and start indices of the selected text within the input element) in the
  // state and setting those values again on every render. The
  // placeInputSelection() function is used for setting the selection range
  // based on values stored in the state.
  useEffect(() => {
    placeInputSelection(phoneInputRef.current, inputSelectionRef.current);
  });

  useEffect(() => {
    getCountries()
      .then((ctrs) => {
        setCountries(ctrs);
        countriesReadyRef.current = true;
      })
      .catch((error) => {
        if (error instanceof Error) {
          reportError(error.message);
        }
      });
  }, []);

  return {
    countryCodeValue,
    errorMsg,
    phoneNumberInputValue: valueToUse,
    handleCountryCodeChange,
    handlePhoneNumberChange,
    onInputRefChange,
    countries,
  };
}
