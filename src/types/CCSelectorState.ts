import { MutableRefObject } from 'react';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';
import PossibleCountries from './PossibleCountries';
import { CountryType } from '../lib/countryCodeData';

/**
 * A type for a common state between the country code autocomplete component
 * and the external phone number input component.
 * @see useCountryCode
 */
interface CCSelectorState {
  /**
   * The whole phone number including the country code as a string. This is
   * the value of the phone number input element.
   */
  phoneNumStr: string;

  /** An index indicating where the local part of the phone number starts. */
  phoneNumSplit: number;

  /**
   * The digits of the phone number that are significant in terms of the
   * country code. Contains only the digits without visual separator
   * characters or the plus sign.
   */
  significantDigits: string;

  /**
   * Inputting a forbidden character into the phone number input makes the
   * cursor jump to the end of the field. Until finding a better solution, this
   * can be fixed by storing the cursor position into the state and setting it
   * back in a useEffect hook.
   * @see setCursor
   */
  cursorPosition: number;

  /** The digits of the detected country code. */
  countryCodeDigits: string;

  /** The CountryType object corresponding to the selected country code. */
  countryCodeValue: CountryType | null;

  /** Data on country codes that are possible based on the phoneNumStr. */
  possibleCountries: PossibleCountries | null;

  /** Error message to be shown to the user. */
  errorMsg: string | null;

  /** Timeout object for timing how long the error message is displayed. */
  errorMsgTimeoutObj: NodeJS.Timeout | null;

  /** Time of the message delay in seconds. */
  errorMsgDelay: number;

  /**  The phone number input DOM element. */
  phoneNumberInput: HTMLInputElement | undefined | null;

  /** A form DOM element that is parent of the phone number input component. */
  formElement: HTMLElement | undefined | null;

  /**
   * A change handler function that is run with the current phone number value
   * every time the value changes.
   * @see setChangeHandler
   */
  changeHandler: ((event: { target: { value: string } }) => void) | undefined;

  /**
   * Sets the phoneNumberInput value.
   * @param inputElement The phone number input DOM element.
   */
  setPhoneNumberInput: (
    inputElement: HTMLInputElement | undefined | null
  ) => void;

  /**
   * Sets the error message delay (how long the message is shown).
   * @param seconds Message delay in seconds.
   */
  setErrorMsgDelay: (seconds: number) => void;

  /**
   * Sets a change handler function that is run with the current phone number
   * value every time the value changes. This is used e.g., in the combined
   * selector components (CountryCodeSelectorCombinedZustand and
   * CountryCodeSelectorCombinedReact) to update the value prop when the
   * component is used as a controlled component.
   * @param handler The handler function.
   */
  setChangeHandler: (
    handler: ((event: { target: { value: string } }) => void) | undefined
  ) => void;

  /**
   * Sets references to the phone number input DOM element. Adds also a reset
   * event handler to a form element that is parent to the phone number input
   * element.
   * @param element The phone number input DOM element.
   * @param inputRef The React MutableRef object received as a prop. This can
   *    be used to access the value of the component when used as an
   *    uncontrolled component.
   */
  setRefs: (
    element: HTMLInputElement | null,
    inputRef: MutableRefObject<HTMLInputElement | null> | undefined
  ) => void;

  /**
   * Initializes the component and returns a cleanup function. This, or the
   * individual setter and cleanup functions, must be called in a useEffect
   * function in the component body. Provides an easy way to take care of the
   * initialization and the cleanup.
   * @param errorMsgDelay Time of the message delay in seconds.
   * @param changeHandler A change handler function that is run with the
   *    current phone number value every time the value changes.
   * @returns A cleanup function that removes the reset event handler from the
   *    form element.
   * @see cleanUp
   */
  initialize: (
    errorMsgDelay: number,
    changeHandler: ((event: { target: { value: string } }) => void) | undefined
  ) => () => void;

  /**
   * The cleanup function which is executed when the component unmounts.
   * Removes the reset event listener added to the form DOM element. Is
   * returned by the initialize function.
   * @see initialize
   */
  cleanUp: () => void;

  /**
   * A handler function for the phone number input's onChange events. Takes
   * care of detecting the country code from the input and setting the
   * countryCodeDigits and the countryCodeVal based on that.
   * @param event The onChange event object from the phone number input.
   */
  handlePhoneNumberChange: (event: { target: { value: string } }) => void;

  /**
   * A handler function for the CountryCodeSelector Autocomplete component's
   * onChange events.
   * @see {@link https://mui.com/material-ui/api/autocomplete/#Autocomplete-prop-onChange}
   *   for more information on parameters.
   * @param e The event source of the callback.
   * @param value The new value of the component.
   * @param reason One of "createOption", "selectOption", "removeOption",
   *               "blur" or "clear".
   * @param details
   */
  handleCountryCodeChange: (
    _event: unknown,
    value: CountryType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CountryType> | undefined
  ) => void;

  /**
   * Applies the state changes to outside variables using the changeHandler
   * function (controlled mode) or the reference to the phone number input
   * DOM element.
   * @param state The partial state object containing the changes.
   */
  applyStateChanges: (state: Partial<CCSelectorState>) => void;

  /**
   * Handles changes to the value prop. This should be called from a useEffect
   * hook in the component's body-
   *
   * When the component is used as a controlled component the value of the
   * phone number input element can be set (is controlled) from the outside.
   * If the value is changed directly (in contrast to changing it in the
   * onChange() handler function), this change must be handled using the
   * handlePhoneNumberChange() function so that the change is also taken into
   * account in the country code selector's value.
   * @param value The value prop of a controlled component.
   */
  handleValueChange: (value: string | null | undefined) => void;

  /**
   * Sets cursor position based on the cursorPosition state variable.
   * @see cursorPosition
   */
  setCursor: () => void;

  /** Displays the error message for the time of the delay. */
  displayError: () => void;

  /** Clears the errorMsg state variable. */
  clearErrorMsg: () => void;
}

export default CCSelectorState;
