import { MutableRefObject } from 'react';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';
import PossibleCountries from './PossibleCountries';
import { CountryType } from '../lib/countryCodeData';

/**
 * A type for a common state object for the country code autocomplete field
 * and the external phone number input.
 * @see useCountryCode
 */
interface CCSelectorState {
  /**
   * The whole phone number including the country code as a string. This is
   * used as the value of the phone number input element.
   */
  phoneNumStr: string;

  /**
   * The string index indicating where the local part of the phone number
   * starts.
   */
  phoneNumSplit: number;

  /**
   * The digits of the phone number that are significant in terms of the
   * country code. Contains only the digits without visual separator
   * characters or the plus sign.
   */
  significantDigits: string;

  /**
   * The position of the cursor in the phone number input. Updating the
   * controlled phone number input moves the cursor automatically to the end of
   * the input. This must be fixed by storing the cursor position in this state
   * variable and calling setCursor() function in a useEffect() hook.
   * @see setCursor
   */
  cursorPosition: number;

  /**  A ref to the phone number input element. */
  phoneInputRef: MutableRefObject<HTMLInputElement | null> | null;

  /** The digits of the detected country code (an empty string if no country
   * code has yet been detected). */
  countryCodeDigits: string;

  /**
   * The CountryType object corresponding to the country code currently in
   * use.
   */
  countryCodeValue: CountryType | null;

  /**
   * PossibleCountriesType object containing an array of CountryType objects
   * corresponding to possible country codes based on the current phoneNumStr,
   * and some additional information on the nature of the data.
   */
  possibleCountries: PossibleCountries | null;

  /** Error message to be shown to the user. */
  errorMsg: string | null;

  /** Timeout object for timing how long the error message is displayed. */
  errorMsgTimeoutObj: NodeJS.Timeout | null;

  /** Time of the message delay in seconds. */
  errorMsgDelay: number;

  /**
   * A change handler function that is run with the current phone number value
   * every time the value changes.
   * @see setChangeHandler
   */
  changeHandler: ((event: { target: { value: string } }) => void) | undefined;

  /**
   * Sets the phone number input reference.
   * @param phoneRef Reference to the phone number input element.
   */
  setPhoneInputRef: (
    phoneRef: MutableRefObject<HTMLInputElement | null> | null
  ) => void;

  /**
   * Sets the error message delay (how long the message is shown).
   * @param seconds Message delay in seconds.
   */
  setErrorMsgDelay: (seconds: number) => void;

  /**
   * Displays the error message for the time specified in the errorMsgDelay
   * variable.
   */
  displayError: () => void;

  /** Clears the errorMsg state variable. */
  clearErrorMsg: () => void;

  /**
   * Sets cursor position to the place it was during the last phone number
   * input's onChange event based on the cursorPosition state variable.
   * @see cursorPosition
   */
  setCursor: () => void;

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
   * function (controlled mode) or the React ref to the phone number input
   * element.
   * @param state The partial state object containing the changes.
   */
  applyStateChanges: (state: Partial<CCSelectorState>) => void;

  /**
   * Handles changes to the value prop.
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
}

export default CCSelectorState;
