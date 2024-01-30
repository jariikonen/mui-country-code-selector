import { CountryType } from '../lib/countryCodeData';
import { PossibleCountriesType } from '../types';

export interface CCodeReactState {
  /** The whole phone number including the country code as a string. */
  phoneNumStr: string;

  /** An index indicating where the local part of the phone number starts. */
  phoneNumSplit: number;

  /**
   * The digits of the phone number considered part of the country code.
   * Does not include any visual separator characters or the plus sign.
   */
  significantDigits: string;

  /** The digits of the detected country code. */
  countryCodeDigits: string;

  /** The CountryType object corresponding to the selected country code. */
  countryCodeValue: CountryType | null;

  /** Data on country codes that are possible based on the phoneNumStr. */
  possibleCountries: PossibleCountriesType | null;

  /** Error message to be shown to the user. */
  errorMsg: string | null;

  /** Timeout object for timing how long the error message is displayed. */
  errorMsgTimeoutObj: NodeJS.Timeout | null;

  /** Time of the message delay in seconds. */
  errorMsgDelay: number;

  /** Position index of the cursor in the phone number input field. */
  cursorPosition: number;
}
