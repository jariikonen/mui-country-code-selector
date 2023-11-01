import { MutableRefObject, SyntheticEvent } from 'react';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';
import { CountryType } from './countryCodeData';

/**
 * A type for data on country codes that are possible based on the phone
 * number input.
 */
export interface PossibleCountriesType {
  /**
   * Digits that were considered when selecting the codes in the possible
   * countries array.
   */
  digitsConsidered: string;

  /**
   * The minimum number of digits in the codes in the possibleCountries array.
   */
  minCodeDigits: number;

  /**
   * The maximum number of digits in the codes in the possibleCountries array.
   */
  maxCodeDigits: number;

  /**
   * Array of CountryType objects corresponding to the possible country codes.
   */
  possibleCountries: readonly CountryType[];
}

/**
 * A type for a common state object for the country code autocomplete field
 * and the external phone number input.
 * @see useCountryCode
 */
export interface CCodeState {
  /** The whole phone number including country code. */
  phoneNumStr: string;

  /**
   * The string index where the local part of the phone number starts.
   */
  phoneNumSplit: number;

  /**
   * The digits of the phone number that are significant in terms of the
   * country code. Contains only the digits without visual separator
   * characters.
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

  /** The digits of the current country code. */
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
  possibleCountries: PossibleCountriesType | null;

  /** Error message to be shown to the user. */
  errorMsg: string | null;

  /**
   * Sets cursor position to the place it was during the last phone number
   * input's onChange event based on the cursorPosition state variable.
   * @see cursorPosition
   */
  setCursor: () => void;

  /** Clears the errorMsg state variable. */
  clearErrorMsg: () => void;

  /**
   * A handler function for the phone number input's onChange events. Takes
   * care of detecting the country code from the input and setting the
   * countryCodeDigits and the countryCodeVal based on that.
   * @param e The onChange event object from the phone number input.
   */
  handlePhoneNumberChange: (e: { target: { value: string } }) => void;

  /**
   * A handler function for the country code autocomplete onChange events.
   * @see {@link https://mui.com/material-ui/api/autocomplete/#Autocomplete-prop-onChange}
   *   for more information on parameters.
   * @param e The event source of the callback.
   * @param value The new value of the component.
   * @param reason One of "createOption", "selectOption", "removeOption",
   *               "blur" or "clear".
   * @param details
   */
  handleCountryCodeChange: (
    e: SyntheticEvent<Element, Event>,
    value: CountryType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<CountryType> | undefined
  ) => void;
}
