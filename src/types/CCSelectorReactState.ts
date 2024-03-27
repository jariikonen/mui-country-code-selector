import { CountryType } from '../lib/countryCodeData';
import InputSelection from './InputSelection';
import PossibleCountries from './PossibleCountries';

interface CCSelectorReactState {
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
  possibleCountries: PossibleCountries | null;

  /** Error message to be shown to the user. */
  errorMsg: string | null;

  /** Timeout object for timing how long the error message is displayed. */
  errorMsgTimeoutObj: NodeJS.Timeout | null;

  /** Time of the message delay in seconds. */
  errorMsgDelay: number;

  /**
   * The start and end indices of the selected text within the phone number
   * input.
   *
   * React keeps track of the cursor position and selection of the controlled
   * input elements. In some situations, however, React doesn't know where to
   * place the cursor. For example, when an input does not get accepted by the
   * onChange handler and the value is not changed, React places the cursor at
   * the end of the value string. Only remedy to this seems to be to keep track
   * of the cursor position internally, within the application.
   */
  inputSelection: InputSelection;

  cleared: boolean;

  clearedRerender: boolean;
}

export default CCSelectorReactState;
