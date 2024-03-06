import { describe, it, expect } from 'vitest';
import { MutableRefObject } from 'react';
import { countries } from './countryCodeData';
import handlePhoneNumberChange from './handlePhoneNumberChange';

const country = countries.filter((value) => value.country === 'Curacao')[0];
const possibleCountries = {
  digitsConsidered: country.code,
  minCodeDigits: country.code.length,
  maxCodeDigits: country.code.length,
  possibleCountries: countries.filter((value) => value.code === country.code),
};
const anotherCountry = countries.filter(
  (value) => value.country === 'Finland'
)[0];
const phoneNumber = '92349802347';
const phoneNumberWithCountryCode = `+${country.code} ${phoneNumber}`;
const phoneNumberWithCountryCodeNoSpaces = phoneNumberWithCountryCode.replace(
  /\s|-/g,
  ''
);
const phoneNumberWithAnotherCountryCode = `+${anotherCountry.code}${phoneNumber}`;
const phoneInputRef = {
  current: { focus: () => 1 },
} as unknown as MutableRefObject<HTMLInputElement>;

// phoneNumStr is updated
describe('an object for updating the phoneNumStr is returned', () => {
  it(
    'when no country code has been set and the phone number value does not ' +
      'contain one',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumber,
        phoneInputRef.current,
        '',
        null,
        ''
      );

      expect(result).toHaveProperty('phoneNumStr', phoneNumber);
    }
  );

  it(
    'when no country code has been set but the phone number value ' +
      'contains one',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithCountryCode,
        phoneInputRef.current,
        '',
        null,
        ''
      );

      expect(result).toHaveProperty('phoneNumStr', phoneNumberWithCountryCode);
    }
  );

  it(
    'when a country code has been set and the phone number value ' +
      'does not contain a country code',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumber,
        phoneInputRef.current,
        country.code,
        possibleCountries,
        country.code
      );

      expect(result).toHaveProperty('phoneNumStr', phoneNumber);
    }
  );

  it(
    'when a country code has been set and the phone number value ' +
      'contains the same country code',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithCountryCode,
        phoneInputRef.current,
        country.code,
        possibleCountries,
        country.code
      );

      expect(result).toHaveProperty('phoneNumStr', phoneNumberWithCountryCode);
    }
  );

  it(
    'when a country code has been set and the phone number value ' +
      'contains the same country code with no spaces',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithCountryCodeNoSpaces,
        phoneInputRef.current,
        country.code,
        possibleCountries,
        country.code
      );

      expect(result).toHaveProperty(
        'phoneNumStr',
        phoneNumberWithCountryCodeNoSpaces
      );
    }
  );

  it(
    'when a country code has been set and the phone number value ' +
      'contains another country code',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithAnotherCountryCode,
        phoneInputRef.current,
        country.code,
        possibleCountries,
        country.code
      );

      expect(result).toHaveProperty(
        'phoneNumStr',
        phoneNumberWithAnotherCountryCode
      );
    }
  );
});

// country code is detected
describe('the country code is detected', () => {
  it(
    'when no country code has been set and the phone number value ' +
      'contains a country code with a space between phone number parts',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithCountryCode,
        phoneInputRef.current,
        '',
        null,
        ''
      );

      expect(result).toHaveProperty('countryCodeValue', country);
    }
  );

  it(
    'when no country code has been set and the phone number value ' +
      'contains a country code and there are no spaces in the string',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithCountryCodeNoSpaces,
        phoneInputRef.current,
        '',
        null,
        ''
      );

      expect(result).toHaveProperty('countryCodeValue', country);
    }
  );

  it(
    'when a country code has been set and the phone number value ' +
      'contains another country code',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithAnotherCountryCode,
        phoneInputRef.current,
        country.code,
        possibleCountries,
        country.code
      );

      expect(result).toHaveProperty('countryCodeValue', anotherCountry);
    }
  );
});

// country code is not updated when it hasn't changed
describe('the country code is not updated', () => {
  it(
    'when a country code has been set and the phone number value ' +
      'contains the same country code',
    () => {
      const result = handlePhoneNumberChange(
        phoneNumberWithCountryCode,
        phoneInputRef.current,
        country.code,
        possibleCountries,
        country.code
      );

      expect(result).not.toHaveProperty('countryCodeValue');
    }
  );
});

// forbidden characters
describe('an error message is returned', () => {
  it('when a forbidden character is used', () => {
    const result = handlePhoneNumberChange(
      'h',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    expect(result).toHaveProperty(
      'errorMsg',
      'Only digits and visual separator characters (" ", "-") allowed'
    );
  });

  it('when there are more than one separator character between digits', () => {
    const spaces = handlePhoneNumberChange(
      '1  2',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    const dashes = handlePhoneNumberChange(
      '1--2',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    const spaceAndDash = handlePhoneNumberChange(
      '1 -2',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    const dashAndSpace = handlePhoneNumberChange(
      '1- 2',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    const errorMsgValue = 'Only one separator character between digits allowed';
    expect(spaces).toHaveProperty('errorMsg', errorMsgValue);
    expect(dashes).toHaveProperty('errorMsg', errorMsgValue);
    expect(spaceAndDash).toHaveProperty('errorMsg', errorMsgValue);
    expect(dashAndSpace).toHaveProperty('errorMsg', errorMsgValue);
  });

  it('when there are more than one plus characters', () => {
    const result1 = handlePhoneNumberChange(
      '++',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    const result2 = handlePhoneNumberChange(
      '+123 +',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    const errorMsgValue =
      'Only one plus character is allowed at the beginning of the phone number';
    expect(result1).toHaveProperty('errorMsg', errorMsgValue);
    expect(result2).toHaveProperty('errorMsg', errorMsgValue);
  });

  it('when the plus character is not in the beginning of the phone number', () => {
    const result1 = handlePhoneNumberChange(
      '1+',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    expect(result1).toHaveProperty(
      'errorMsg',
      'Plus can only be the first character of the phone number'
    );
  });

  it('when the plus character is not followed by a digit', () => {
    const result1 = handlePhoneNumberChange(
      '+i',
      phoneInputRef.current,
      '',
      null,
      ''
    );

    expect(result1).toHaveProperty(
      'errorMsg',
      'Only a digit is accepted after a plus sign'
    );
  });
});
