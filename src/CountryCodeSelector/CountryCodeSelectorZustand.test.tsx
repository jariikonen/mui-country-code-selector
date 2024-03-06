/**
 * Integration tests for CountryCodeSelectorZustand and a country code store.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import CountryCodeSelector from './CountryCodeSelectorZustand';
import CountryCodeStoreProvider from '../store/CountryCodeStoreProvider';
import useCountryCodeStore from '../store/useCountryCodeStore';

function TestSelector() {
  const {
    setPhoneNumberInput,
    phoneNumStr,
    errorMsg,
    handlePhoneNumberChange,
  } = useCountryCodeStore();

  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPhoneNumberInput(phoneInputRef.current);
  }, [setPhoneNumberInput]);

  return (
    <>
      <CountryCodeSelector label="Country code" classes={{ input: 'test' }} />
      <TextField
        error={errorMsg !== null}
        label="Phone number"
        value={phoneNumStr}
        type="text"
        inputRef={(e) => {
          phoneInputRef.current = e as HTMLInputElement | null;
        }}
        onChange={handlePhoneNumberChange}
      />
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
}

beforeEach(() => {
  render(
    <CountryCodeStoreProvider>
      <TestSelector />
    </CountryCodeStoreProvider>
  );
});

afterEach(() => cleanup());

describe('basic functionality', () => {
  it('component is rendered', () => {
    const testSelector = screen.getByLabelText('Country code');
    expect(testSelector).toBeDefined();
  });

  it('value is changed when the phone number changes', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Phone number');
    const selector = screen.getByLabelText('Country code');
    await user.type(input, '+358 12345');
    expect(selector).toHaveValue('Finland (FI)');
  });

  it('country code is cleared when the clear button is pressed', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Phone number');
    const selector = screen.getByLabelText('Country code');
    await user.type(input, '+358 12345');
    expect(selector).toHaveValue('Finland (FI)');
    expect(input).toHaveValue('+358 12345');
    const clear = screen.getByTitle('Clear');
    await user.click(clear);
    expect(selector).toHaveValue('');
    expect(input).toHaveValue('12345');
  });

  it('selector is opened with suitable options when text is typed into selector, and one can be selected', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Phone number');
    const selector = screen.getByLabelText('Country code');

    await user.type(selector, 'fi');
    expect(selector).toHaveValue('fi');
    const finland = screen.getByText('Finland FI +358');
    const fiji = screen.getByText('Fiji FJ +679');
    expect(finland).toBeDefined();
    expect(fiji).toBeDefined();

    await user.click(fiji);
    expect(selector).toHaveValue('Fiji (FJ)');
    expect(input).toHaveValue('+679 ');
  });
});

describe('error detection', () => {
  it('displays an error when something else than a number or plus sign is typed as the first character of the phone number', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Phone number');

    await user.type(input, ' ');
    const error1 = screen.getByText(
      'Phone number must start with a number or a plus character'
    );
    expect(error1).toBeDefined();

    await user.type(input, '-');
    const error2 = screen.getByText(
      'Phone number must start with a number or a plus character'
    );
    expect(error2).toBeDefined();

    await user.type(input, 'a');
    const error3 = screen.getByText(
      'Only digits and visual separator characters (" ", "-") allowed'
    );
    expect(error3).toBeDefined();
  });

  it('displays an error when two separator characters are typed into the phone number', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Phone number');

    await user.type(input, '1  ');
    const error1 = screen.getByText(
      'Only one separator character between digits allowed'
    );
    expect(error1).toBeDefined();

    await user.type(input, '12--');
    const error2 = screen.getByText(
      'Only one separator character between digits allowed'
    );
    expect(error2).toBeDefined();

    await user.type(input, '123- ');
    const error3 = screen.getByText(
      'Only one separator character between digits allowed'
    );
    expect(error3).toBeDefined();

    await user.type(input, '1234 -');
    const error4 = screen.getByText(
      'Only one separator character between digits allowed'
    );
    expect(error4).toBeDefined();
  });

  it('displays an error when plus sign is used in any other place than in the beginning of the phone number', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Phone number');

    await user.type(input, '1+');
    const error1 = screen.getByText(
      'Plus can only be the first character of the phone number'
    );
    expect(error1).toBeDefined();
  });
});

describe('generic API functionality', () => {
  it('props can be passed to underlying components', () => {
    const testSelector = screen.getByLabelText('Country code');
    expect(testSelector).toHaveClass('test');
  });
});
