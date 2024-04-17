import CCSelectorState from '../types/CCSelectorState';
import PossibleCountries from '../types/PossibleCountries';

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
 * @returns A partial CCSelectorState object that initializes countryCodeDigits,
 *   countryCodeValue and possibleCountries state variables.
 */
export function resetCountryCode(
  significantDigits = '',
  possibleCountries: PossibleCountries | null = null
): Partial<CCSelectorState> {
  return {
    significantDigits,
    countryCodeDigits: '',
    countryCodeValue: null,
    possibleCountries,
  };
}

/**
 * Finds the first form element that is parent of the element given in the
 * element-prop.
 */
export function getForm(element: HTMLInputElement | null) {
  let parent = element?.parentElement;
  while (parent && parent.tagName !== 'FORM') {
    parent = parent?.parentElement;
  }
  return parent;
}
