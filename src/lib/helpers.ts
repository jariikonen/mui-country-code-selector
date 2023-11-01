import { CCodeState, PossibleCountriesType } from '../types';

/**
 * Cleans a phone number input value from everything else but the digits.
 * @param value Value to be cleaned.
 * @returns Digits from the phone number input string.
 */
export function getDigits(value: string) {
  return value.replace(/\+|\s|-/g, '');
}

/**
 * Helper function to simplify resetting country code state variables to their
 * initial state. Passing the returned object to Zusand's set function sets
 * countryCodeDigits, countryCodeValue and possibleCountries state variables to
 * their initial state.
 * @returns A partial CCodeState object that initializes countryCodeDigits,
 *   countryCodeValue and possibleCountries state variables.
 */
export function resetCountryCode(
  significantDigits = '',
  possibleCountries: PossibleCountriesType | null = null
): Partial<CCodeState> {
  return {
    significantDigits,
    countryCodeDigits: '',
    countryCodeValue: null,
    possibleCountries,
  };
}
