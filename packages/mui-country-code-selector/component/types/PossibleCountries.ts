import { CountryType } from '../lib/countryCodeData';

/**
 * A type for data on country codes that are possible based on the phone
 * number input.
 */
interface PossibleCountries {
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

export default PossibleCountries;
