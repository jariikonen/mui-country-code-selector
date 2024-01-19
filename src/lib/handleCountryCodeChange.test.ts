import { describe, it, expect, vi, afterEach } from 'vitest';
import { MutableRefObject } from 'react';
import { countries } from './countryCodeData';
import handleCountryCodeChange from './handleCountryCodeChange';

const country = countries.filter((value) => value.country === 'Curacao')[0];
const phoneNumber = '92349802347';
const phoneNumberWithCountryCode = `+${country.code} ${phoneNumber}`;
const phoneInputRef = {
  current: { focus: () => 1 },
} as unknown as MutableRefObject<HTMLInputElement>;

describe('new country code is selected', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('an object to update phoneNumStr is returned', () => {
    const result = handleCountryCodeChange(
      country,
      phoneInputRef,
      '',
      phoneNumber,
      'selectOption'
    );

    expect(result).toHaveProperty('phoneNumStr', phoneNumberWithCountryCode);
  });

  it(
    'focus is switched to phone number input element ' +
      '(phoneInputRef.current.focus() is called)',
    () => {
      const spy = vi.spyOn(phoneInputRef.current, 'focus');
      handleCountryCodeChange(
        country,
        phoneInputRef,
        '',
        phoneNumber,
        'selectOption'
      );

      expect(spy).toHaveBeenCalledTimes(1);
    }
  );
});

describe('clear button is pressed', () => {
  it(
    'and countryCodeValue parameter is null, an object to clear the ' +
      'phoneNumStr is returned',
    () => {
      const result = handleCountryCodeChange(
        null,
        phoneInputRef,
        country.code,
        phoneNumberWithCountryCode,
        'clear'
      );

      expect(result).toHaveProperty('phoneNumStr', phoneNumber);
    }
  );

  // because we should not trust that Autocomplete component's onChange event's
  // value prop will always be null when the reason is 'clear', we should also
  // test that an object for clearing the phoneNumStr is returned even when the
  // countryCodeValue parameter is set
  it(
    'and countryCodeValue parameter is NOT null, an object to clear the ' +
      'phoneNumStr is still returned',
    () => {
      const result = handleCountryCodeChange(
        country,
        phoneInputRef,
        country.code,
        phoneNumberWithCountryCode,
        'clear'
      );

      expect(result).toHaveProperty('phoneNumStr', phoneNumber);
    }
  );
});
