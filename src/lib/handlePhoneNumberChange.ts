import CCSelectorState from '../types/CCSelectorState';
import InputSelection from '../types/InputSelection';
import PossibleCountries from '../types/PossibleCountries';
import { CountryType, countries } from './countryCodeData';
import { getDigits, resetCountryCode } from './helpers';

/**
 * Implementation of the handler function for the phone number input's onChange
 * events. Takes care of detecting the country code from the input and returns
 * an object that can be used for setting the countryCodeDigits and the
 * countryCodeVal based on that.
 * @see CCSelectorState.handleCountryCodeChange
 * @param phoneNumberValue Value of the phone number input as received from the
 *   onChange event props.
 * @param phoneNumberInput The phone number input DOM element.
 * @param detectedCCDigits The digits of the previously known country code.
 * @param possibleCountries An object containing possible country codes based
 *   on the current phone number value and some additional information on the
 *   nature of the data.
 * @param significantDigits The digits of the phone number that are significant
 *   in terms of the country code. Contains only the digits without visual
 *   separator characters.
 * @returns A partial CCSelectorState object that can be used to set the state.
 */
export default function handlePhoneNumberChange(
  phoneNumberValue: string,
  phoneNumberInput: HTMLInputElement | undefined | null,
  detectedCCDigits: string,
  possibleCountries: PossibleCountries | null,
  significantDigits: string
): Partial<CCSelectorState> {
  /**
   * A closure that reads the phone number input's cursor position or more
   * specifically the start and end indices of the text selection within the
   * phone number input element.
   * @see {@link https://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field}
   *   for more information on getting the cursor position.
   * @returns Start and end indices of the text selection within the phone
   *    number input element.
   */
  function getInputSelection(): InputSelection {
    return {
      selectionStart: phoneNumberInput?.selectionStart
        ? phoneNumberInput.selectionStart
        : 0,
      selectionEnd: phoneNumberInput?.selectionEnd
        ? phoneNumberInput.selectionEnd
        : 0,
    };
  }

  /**
   * Returns true if the digits string contains possible country code that
   * has not yet been detected.
   */
  function possibleCC(
    _digits: string,
    _firstChar: string,
    _detectedCCDigits: string
  ) {
    return Boolean(
      _digits.length > 0 && _firstChar === '+' && _detectedCCDigits.length === 0
    );
  }

  /**
   * Returns true if the country code part of the input digits (cCPart) has
   * changed.
   */
  function cCPartHasChanged(_cCPart: string, _detectedCCDigits: string) {
    return Boolean(_cCPart.length > 0 && _cCPart !== _detectedCCDigits);
  }

  /**
   * Returns true if a country code has already been detected but there are
   * possible country codes that are longer than that.
   */
  function possibleLongerCC(
    _cCPart: string,
    _detectedCCDigits: string,
    _possible: PossibleCountries | null
  ) {
    return Boolean(
      _cCPart.length > 0 &&
        _cCPart === _detectedCCDigits &&
        _possible &&
        _possible.maxCodeDigits > _cCPart.length
    );
  }

  /**
   * Looks for possible country codes based on the first digits of the phone
   * number. If found returns them as PossibleCountries object. Returns
   * null, if possible country codes are not found.
   * @param digits Digits from the phone number input.
   * @returns Array of possible country codes as PossibleCountries object or
   *   null if possible country codes were not found.
   */
  function getPossibleCountries(digits: string): PossibleCountries | null {
    /**
     * Tries to match a range of digits to a list of country codes. If matches
     * are found these country code values are returned as a
     * PossibleCountries object.
     * @param digitRange A string of digits to be matched with the country
     *   codes.
     * @param _possible Possible countries found on a previous run.
     * @returns Array of possible country codes as PossibleCountries object
     *   or null if possible country codes were not found.
     */
    function getPossibleCountriesForRange(
      digitRange: string,
      _possible: PossibleCountries | null
    ) {
      const options = _possible ? _possible.possibleCountries : countries;
      let minCodeDigits = Number.MAX_SAFE_INTEGER;
      let maxCodeDigits = 0;
      let newPossible: readonly CountryType[] = [];

      newPossible = options.filter((countryObj) => {
        const cleanedCode = getDigits(countryObj.code);
        const match = cleanedCode.startsWith(digitRange);
        if (match && cleanedCode.length < minCodeDigits) {
          minCodeDigits = cleanedCode.length;
        }
        if (match && cleanedCode.length > maxCodeDigits) {
          maxCodeDigits = cleanedCode.length;
        }
        return match;
      });

      return { newPossible, minCodeDigits, maxCodeDigits };
    }

    let possible = null;
    let newPossible: readonly CountryType[] = [];
    let accum = '';

    for (let i = 0; i < digits.length; i += 1) {
      accum += digits[i];
      let minCodeDigits = Number.MAX_SAFE_INTEGER;
      let maxCodeDigits = 0;
      ({ newPossible, minCodeDigits, maxCodeDigits } =
        getPossibleCountriesForRange(accum, possible));
      if (newPossible.length > 0) {
        possible = {
          digitsConsidered: digits.slice(0, i + 1),
          minCodeDigits,
          maxCodeDigits,
          possibleCountries: newPossible,
        };
      } else {
        break;
      }
    }

    return possible;
  }

  /**
   * Tries to detect the country code from the input digits.
   * @param digits Digits from the phone number input.
   * @param _detectedCCDigits Digits of an already detected country code, if
   *   exists.
   * @param detectedCCValue Already detected country code as CountryType object,
   *   if exists.
   * @returns A partial CCSelectorState object that can be used to set the state.
   */
  const detectCountryCode = (
    digits: string,
    pastSignificantDigits: string,
    _detectedCCDigits: string,
    possible: PossibleCountries | null
  ) => {
    /**
     * A closure that returns true if the part of the phone number string
     * corresponding to past significant part has changed or the string is
     * longer than the past significant part and there are longer possible
     * country codes available.
     */
    function possibleCountriesShouldBeUpdated() {
      const currentValue =
        pastSignificantDigits.length > 0
          ? digits.slice(0, pastSignificantDigits.length)
          : null;
      return Boolean(
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        (currentValue && currentValue !== pastSignificantDigits) ||
          (currentValue &&
            possible?.maxCodeDigits &&
            digits.length > currentValue.length &&
            currentValue.length < possible.maxCodeDigits)
      );
    }

    /**
     * Looks for exact match of digits to a country code either from the
     * smaller selection of options in parameter possible or from all the
     * countries if there aren't short enough possibilities in possible.
     * @param _digits String of digits to be matched with the country codes.
     * @param _possible A selection of possible country codes.
     * @returns An array of country codes that provide the longest possible exact
     *   match to the digits.
     */
    function getExactMatch(
      _digits: string,
      _possible: PossibleCountries | null
    ) {
      let rangeEnd = _possible
        ? _possible.digitsConsidered.length
        : _digits.length;
      const options =
        (_possible &&
          _possible.digitsConsidered.length < _possible.minCodeDigits) ??
        !_possible
          ? countries
          : _possible.possibleCountries;
      let matches: readonly CountryType[] = [];

      for (rangeEnd; rangeEnd >= 0; rangeEnd -= 1) {
        const rEnd = rangeEnd;
        matches = options.filter(
          (countryObj) =>
            countryObj.code.replace(/\s|-/g, '') === _digits.slice(0, rEnd)
        );
        if (matches.length > 0) {
          return matches;
        }
      }

      return matches;
    }

    let localPossibleCountries = possible;
    let localSignificantDigits = pastSignificantDigits;
    if (!possible || possibleCountriesShouldBeUpdated()) {
      localPossibleCountries = getPossibleCountries(digits);
      localSignificantDigits = localPossibleCountries
        ? digits.slice(0, localPossibleCountries.maxCodeDigits)
        : '';
    }

    // at least one possible country code
    if (
      localPossibleCountries &&
      localPossibleCountries.possibleCountries.length > 0
    ) {
      const matches = getExactMatch(digits, localPossibleCountries);
      if (matches.length > 0) {
        const matchDigits = getDigits(matches[0].code);
        if (matchDigits !== _detectedCCDigits) {
          return {
            significantDigits: localSignificantDigits,
            countryCodeDigits: matchDigits,
            countryCodeValue: matches[0],
            possibleCountries: localPossibleCountries,
          };
        }
      }
      if (digits.startsWith(_detectedCCDigits)) {
        return {
          significantDigits: localSignificantDigits,
          possibleCountries: localPossibleCountries,
        };
      }
      return {
        ...resetCountryCode(localSignificantDigits, localPossibleCountries),
      };
    }

    // no possible country codes
    return { ...resetCountryCode() };
  };

  // handle forbidden characters (only digits and separator characters allowed,
  // and no separators at the beginning)
  const rawInputSelection = getInputSelection();
  const selectionStart = rawInputSelection.selectionStart - 1;
  const selectionEnd = rawInputSelection.selectionEnd - 1;
  const inputSelection = {
    selectionStart: selectionStart > 0 ? selectionStart : 0,
    selectionEnd: selectionEnd > 0 ? selectionEnd : 0,
  };
  if (phoneNumberValue.match(/\+\D/)) {
    if (phoneNumberValue.startsWith('++')) {
      return {
        errorMsg:
          'Only one plus character is allowed at the beginning of the phone number',
        inputSelection,
      };
    }
    return {
      errorMsg: 'Only a digit is accepted after a plus sign',
      inputSelection,
    };
  }
  if (phoneNumberValue.match(/[^+\d\s-]/)) {
    return {
      errorMsg:
        'Only digits and visual separator characters (" ", "-") allowed',
      inputSelection,
    };
  }
  if (phoneNumberValue.match(/^[^+\d]/)) {
    return {
      errorMsg: 'Phone number must start with a number or a plus character',
      inputSelection,
    };
  }
  if (phoneNumberValue.match(/\s{2,}|-{2,}|\s-|-\s/)) {
    return {
      errorMsg: 'Only one separator character between digits allowed',
      inputSelection,
    };
  }
  if (phoneNumberValue.match(/\+.*\+/)) {
    return {
      errorMsg:
        'Only one plus character is allowed at the beginning of the phone number',
      inputSelection,
    };
  }
  if (phoneNumberValue.match(/\+/) && !phoneNumberValue.startsWith('+')) {
    return {
      errorMsg: 'Plus can only be the first character of the phone number',
      inputSelection,
    };
  }

  const digits = getDigits(phoneNumberValue);

  // update the values if there is a possible country code in the string but
  // no possible countries have yet been detected
  let newPossibleCountries = {
    ...possibleCountries,
  } as PossibleCountries | null;
  let newSignificantDigits = significantDigits;
  const firstChar = phoneNumberValue.slice(0, 1);
  if (digits.length > 0 && firstChar === '+' && !possibleCountries) {
    newPossibleCountries = getPossibleCountries(digits);
    newSignificantDigits = newPossibleCountries
      ? digits.slice(0, newPossibleCountries?.maxCodeDigits)
      : '';
  }

  // the country code is set, but the first character is no longer a plus
  // => reset country code
  if (detectedCCDigits.length > 0 && firstChar !== '+') {
    return {
      ...resetCountryCode(),
      phoneNumStr: phoneNumberValue,
      inputSelection: getInputSelection(),
    };
  }

  // the first character is a plus, but the country code has not been
  // recognized or the country code part of the string has changed, or there
  // are possible country codes that are longer than the current code => try to
  // detect the country code
  const cCPart = digits.slice(0, detectedCCDigits.length);
  if (
    possibleCC(digits, firstChar, detectedCCDigits) ||
    cCPartHasChanged(cCPart, detectedCCDigits) ||
    possibleLongerCC(cCPart, detectedCCDigits, newPossibleCountries)
  ) {
    return {
      ...detectCountryCode(
        digits,
        newSignificantDigits,
        detectedCCDigits,
        newPossibleCountries
      ),
      phoneNumStr: phoneNumberValue,
      inputSelection: getInputSelection(),
    };
  }

  // all other cases
  return { phoneNumStr: phoneNumberValue, inputSelection: getInputSelection() };
}
