import { MutableRefObject, SyntheticEvent, useRef } from 'react';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';
import { createStore } from 'zustand/vanilla';
import { CountryType, countries } from './countryCodeData';

/**
 * A type for data on country codes that are possible based on the phone
 * number input.
 */
interface PossibleCountriesType {
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
 * Cleans a phone number input value from everything else but the digits.
 * @param value Value to be cleaned.
 * @returns Digits from the phone number input string.
 */
function getDigits(value: string) {
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
function resetCountryCode(
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
   * The digits of a the phone number that are significant in terms of the
   * country code. Value contains only the digits, not any visual separator
   * characters.
   */
  significantDigits: string;

  /**
   * The position of the cursor in the phone number input. Cursor is moved to
   * the end of the input every time the controlled phone number input is
   * updated. This can be fixed by calling setCursor() function using the
   * useEffect() hook.
   */
  cursorPosition: number;

  /**  A ref to the phone number input element. */
  phoneInputRef: MutableRefObject<HTMLInputElement | null> | null;

  /** The string representation of the country code currently in use. */
  countryCodeDigits: string;

  /**
   * The CountryType object corresponding to the country code currently in
   * use.
   */
  countryCodeValue: CountryType | null;

  /**
   * PossibleCountriesType object containing an array of CountryType objects
   * corresponding to possible country codes based on the current phoneNumStr,
   * and some additional information on tha nature of the data.
   */
  possibleCountries: PossibleCountriesType | null;

  /** Error message to be shown to the user. */
  errorMsg: string | null;

  /**
   * Sets cursor position to the place it was during the last phone number
   * input's onChange event based on the cursorPosition state variable.
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

/**
 * Zustand store for establishing a common state between the country
 * code autocomplete field and the external phone number input. Created
 * using Zustand's createStore function that returns a store object.
 * @see CCodeState
 * @see {@link https://github.com/pmndrs/zustand} for more information on
 *   Zustand.
 * @return Zusandt store object
 */
const createCountryCodeStore = () =>
  createStore<CCodeState>(
    (
      set: (
        partial:
          | CCodeState
          | Partial<CCodeState>
          | ((state: CCodeState) => CCodeState | Partial<CCodeState>),
        replace?: boolean | undefined
      ) => void,
      get: () => CCodeState
    ) => ({
      phoneNumStr: '',
      phoneNumSplit: 0,
      significantDigits: '',
      cursorPosition: 0,
      phoneInputRef: null,
      countryCodeDigits: '',
      countryCodeValue: null,
      possibleCountries: null,
      errorMsg: null,
      setCursor() {
        const phoneRef = get().phoneInputRef;
        if (phoneRef?.current && phoneRef.current === document.activeElement) {
          const curPos = get().cursorPosition;
          phoneRef.current.focus();
          phoneRef.current.setSelectionRange(curPos, curPos);
        }
      },
      clearErrorMsg() {
        set({ errorMsg: null });
      },
      handlePhoneNumberChange(e: { target: { value: string } }) {
        /**
         * Reads the phone number input's cursor position through the phoneRef ref.
         * @see {@link https://react.dev/learn/manipulating-the-dom-with-refs} for
         *   more about React's refs.
         * @see {@link https://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field}
         *   for more information on getting the cursor position.
         * @returns Cursor position in the phone number input element.
         */
        function getCursorPosition() {
          const phoneRef = get().phoneInputRef;
          return phoneRef?.current?.selectionStart
            ? phoneRef.current.selectionStart
            : 0;
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
            _digits.length > 0 &&
              _firstChar === '+' &&
              _detectedCCDigits.length === 0
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
          _possible: PossibleCountriesType | null
        ) {
          return Boolean(
            _cCPart.length > 0 &&
              _cCPart === _detectedCCDigits &&
              _possible &&
              _possible.maxCodeDigits > _cCPart.length
          );
        }

        /**
         * Returns an array of possible country codes based on the first digits of the
         * digits parameter.
         * @param digits A string of digits from which the country codes are searched.
         * @returns Array of possible country codes as PossibleCountriesType object or
         *   null if possible country codes were not found.
         */
        function getPossibleCountries(
          digits: string
        ): PossibleCountriesType | null {
          function getPossibleCountriesForRange(
            _digits: string,
            possible: PossibleCountriesType | null
          ) {
            const options = possible ? possible.possibleCountries : countries;
            let minCodeDigits = Number.MAX_SAFE_INTEGER;
            let maxCodeDigits = 0;
            let newPossible: readonly CountryType[] = [];

            newPossible = options.filter((countryObj) => {
              const cleanedCode = getDigits(countryObj.code);
              const match = cleanedCode.startsWith(_digits);
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

          let possibleCountries = null;
          let newPossible: readonly CountryType[] = [];
          let accum = '';

          for (let i = 0; i < digits.length; i += 1) {
            accum += digits[i];
            let minCodeDigits = Number.MAX_SAFE_INTEGER;
            let maxCodeDigits = 0;
            ({ newPossible, minCodeDigits, maxCodeDigits } =
              getPossibleCountriesForRange(accum, possibleCountries));
            if (newPossible.length > 0) {
              possibleCountries = {
                digitsConsidered: digits.slice(0, i + 1),
                minCodeDigits,
                maxCodeDigits,
                possibleCountries: newPossible,
              };
            } else {
              break;
            }
          }

          return possibleCountries;
        }

        /**
         * Tries to detect the country code from the input digits.
         * @param digits Digits from the phone number input.
         * @param detectedCCDigits Digits of an already detected country code, if
         *   exists.
         * @param detectedCCValue Already detected country code as CountryType object,
         *   if exists.
         * @returns A partial CCodeState object that can be used to set the state.
         */
        const detectCountryCode = (
          digits: string,
          pastSignificantDigits: string,
          detectedCCDigits: string,
          possible: PossibleCountriesType | null
        ) => {
          /**
           * Returns true if the part of the phone number string corresponding to past
           * significant part has changed or the string is longer than the past
           * significant part and there are longer possible country codes available.
           */
          function significantDigitsHaveChanged() {
            const currentValue =
              pastSignificantDigits.length > 0
                ? digits.slice(0, pastSignificantDigits.length)
                : null;
            return Boolean(
              (currentValue && currentValue !== pastSignificantDigits) ??
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
           * @param digits String of digits to be matched with the country codes.
           * @param possible A selection of possible country codes.
           * @returns An array of country codes that provide the longest possible exact
           *   match to the digits.
           */
          function getExactMatch(
            _digits: string,
            _possible: PossibleCountriesType | null
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
              matches = options.filter(
                // eslint-disable-next-line @typescript-eslint/no-loop-func
                (countryObj) =>
                  countryObj.code.replace(/\s|-/g, '') ===
                  _digits.slice(0, rangeEnd)
              );
              if (matches.length > 0) {
                return matches;
              }
            }

            return matches;
          }

          let possibleCountries = possible;
          let significantDigits = pastSignificantDigits;
          if (!possible || significantDigitsHaveChanged()) {
            possibleCountries = getPossibleCountries(digits);
            significantDigits = possibleCountries
              ? digits.slice(0, possibleCountries.maxCodeDigits)
              : '';
          }

          // at least one possible country code
          if (
            possibleCountries &&
            possibleCountries.possibleCountries.length > 0
          ) {
            const matches = getExactMatch(digits, possibleCountries);
            if (matches.length > 0) {
              const matchDigits = getDigits(matches[0].code);
              if (matchDigits !== detectedCCDigits) {
                return {
                  significantDigits,
                  countryCodeDigits: matchDigits,
                  countryCodeValue: matches[0],
                  possibleCountries,
                };
              }
            }
            if (digits.startsWith(detectedCCDigits)) {
              return { significantDigits, possibleCountries };
            }
            return {
              ...resetCountryCode(significantDigits, possibleCountries),
            };
          }

          // no possible country codes
          return { ...resetCountryCode() };
        };

        /**
         * Checks the value string for forbidden characters and returns them in an
         * array if found.
         * @param value String holding the current phone number string.
         * @returns Forbidden characters found from the value in an array.
         */
        const getForbiddenCharacters = (value: string) => {
          const allowFirstPlus = (
            fIter: IterableIterator<RegExpMatchArray>
          ) => {
            let c = fIter.next();
            const arr = [];
            while (!c.done) {
              if (c.value[0] === '+') {
                if (c.value.index && c.value.index > 0) {
                  arr.push(c.value[0]);
                }
              } else {
                arr.push(c.value[0]);
              }
              c = fIter.next();
            }
            return arr;
          };

          return allowFirstPlus(value.matchAll(/[^\d-\s]/g));
        };

        const { value } = e.target; // current value of the phone number field

        // handle forbidden characters (only digits and separator characters allowed)
        if (getForbiddenCharacters(value).length > 0) {
          set({
            errorMsg:
              'Only digits and visual separator characters (" ", "-") allowed',
          });
          return;
        }
        if (value.match(/\s{2,}/) ?? value.match(/\s-/) ?? value.match(/-\s/)) {
          set({
            errorMsg: 'Only one separator character between digits allowed',
          });
          return;
        }

        const digits = getDigits(value); // just the digits of the current phone number value

        // get data on the digits, that has been discovered earlier, from the state
        const detectedCCDigits = get().countryCodeDigits;
        let { possibleCountries: possible, significantDigits } = get();

        // update the values if there is a possible country code in the string but
        // no possible countries have been detected
        const firstChar = value.slice(0, 1);
        if (digits.length > 0 && firstChar === '+' && !possible) {
          possible = getPossibleCountries(digits);
          significantDigits = possible
            ? digits.slice(0, possible.maxCodeDigits)
            : '';
        }

        // the country code is set, but the first character is no longer a plus
        // => reset country code
        if (detectedCCDigits.length > 0 && firstChar !== '+') {
          set({
            ...resetCountryCode(),
            phoneNumStr: value,
            cursorPosition: getCursorPosition(),
          });
          return;
        }

        // the first character is a plus, but the country code has not been
        // recognized or the country code part of the string has changed, or there
        // are possible country codes that are longer than the current code => try to
        // detect the country code
        const cCPart = digits.slice(0, detectedCCDigits.length);
        if (
          possibleCC(digits, firstChar, detectedCCDigits) ||
          cCPartHasChanged(cCPart, detectedCCDigits) ||
          possibleLongerCC(cCPart, detectedCCDigits, possible)
        ) {
          set({
            ...detectCountryCode(
              digits,
              significantDigits,
              detectedCCDigits,
              possible
            ),
            phoneNumStr: value,
            cursorPosition: getCursorPosition(),
          });
          return;
        }

        // all other cases
        set({ phoneNumStr: value, cursorPosition: getCursorPosition() });
      },
      handleCountryCodeChange(
        _e: SyntheticEvent<Element, Event>,
        value: CountryType | null,
        reason: AutocompleteChangeReason
      ) {
        /**
         * Forms a RegExp object that can be used for clearing the country code
         * part of the phone number string.
         * @param cCDigits Digits of the country code to be looked for.
         * @returns RegExp object that will match to the country code part of the
         *   phone number string even if it contains any number of visual separator
         *   characters.
         */
        function getCCRegExp(cCDigits: string) {
          const separators = '(\\s*|-*)';
          return new RegExp(
            `${['\\+', ...cCDigits].join(separators) + separators}0*`
          );
        }

        /**
         * Returns an object that can be used for setting the state to correspond
         * to the new country code. Passing the object to Zusand's set method will
         * replace the old country code with the new one in the state variable
         * phoneNumStr, and set the country code variables and cursor position in
         * the respective state variables.
         * @param value New country code as CountryType object.
         * @param detectedCCDigits The digits of the current country code.
         * @param phoneNum Current phone number string.
         * @returns A partial CCodeState object that can be used for setting the
         *   state to correspond to the new country code.
         */
        function setNewCountryCode(
          _value: CountryType,
          detectedCCDigits: string,
          phoneNum: string
        ): Partial<CCodeState> {
          const newCCPart = `+${_value.code} `;
          const cleanedPhoneNum = phoneNum.startsWith('0')
            ? phoneNum.replace(/^0*/, '')
            : phoneNum.replace(getCCRegExp(detectedCCDigits), '');
          const newPhoneNum = newCCPart + cleanedPhoneNum;
          return {
            countryCodeDigits: getDigits(_value.code),
            countryCodeValue: _value,
            phoneNumStr: newPhoneNum,
            cursorPosition: newPhoneNum.length,
          };
        }

        /**
         * Returns an object that can be used for clearing the country code part of
         * the phone number string in the state object.
         * @param detectedCCDigits The digits of the current country code.
         * @param phoneNum The phone number string to be cleared.
         * @returns An object that can be passed to Zustand's set() function to set
         *   the state.
         */
        function clearCountryCodePart(
          detectedCCDigits: string,
          phoneNum: string
        ) {
          const newPhoneNum = phoneNum.replace(
            getCCRegExp(detectedCCDigits),
            ''
          );
          return {
            ...resetCountryCode(),
            phoneNumStr: newPhoneNum,
          };
        }

        // user selected new country code value
        if (value?.code) {
          const phoneRef = get().phoneInputRef;

          set({
            ...setNewCountryCode(
              value,
              get().countryCodeDigits,
              get().phoneNumStr
            ),
          });

          if (phoneRef?.current) {
            phoneRef.current.focus();
          }
        }

        // user pressed the clear button
        if (reason === 'clear') {
          set({
            ...clearCountryCodePart(get().countryCodeDigits, get().phoneNumStr),
          });
        }
      },
    })
  );

/**
 * Type for the Zusand store object used for common state between
 * CountryCodeSelectors and their external input elements.
 * @see CountryCodeSelector, CCodeState, createCountryCodeStore
 */
type CountryCodeStore = ReturnType<typeof createCountryCodeStore>;

/**
 * A record object containing key value pairs of CountryCodeStores used for
 * different CountryCodeSelectors. Each store is identified by a string key.
 * @see CountryCodeSelector
 */
const countryCodeStores: Record<string, CountryCodeStore> = {};

/**
 * Returns CountryCodeStore object corresponding to the key given as parameter.
 * If the key does not correspond to any store, a new store is created.
 * @param key Key that identifies the store object.
 */
const getCountryCodeStore = (key: string) => {
  let cCState = countryCodeStores[key];
  if (!cCState) {
    countryCodeStores[key] = createCountryCodeStore();
    cCState = countryCodeStores[key];
  }
  return cCState;
};

/**
 * Returns a hook to a CountryCodeStore object corresponding to the key. If the
 * key does not correspond to any store, a new store is created.
 * @param key Key that identifies the store object.
 */
export const useCountryCodeStore = (key: string) => {
  const ref = useRef(getCountryCodeStore(key));

  return ref.current;
};
