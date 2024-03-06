/**
 * Tests for both CountryCodeSelectorCombinedZustand and CountryCodeSelectorCombinedReact.
 */

import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import CountryCodeSelectorCombinedZustand from './CountryCodeSelectorCombinedZustand';
import CountryCodeSelectorCombinedReact from './CountryCodeSelectorCombinedReact';

function TestComponentZustand() {
  const [phoneNumValue, setPhoneNumValue] = useState('');
  return (
    <div data-testid="container">
      <CountryCodeSelectorCombinedZustand
        value={phoneNumValue}
        onChange={(e: { target: { value: string } }) =>
          setPhoneNumValue(e.target.value)
        }
        countryCodeLabel="Country code"
        phoneNumberLabel="Phone number"
        selectorProps={{ classes: { input: 'selectorTest' } }}
        inputProps={{ InputProps: { classes: { input: 'inputTest' } } }}
      />
      {phoneNumValue && <p>{phoneNumValue}</p>}
    </div>
  );
}

function TestComponentReact() {
  const [phoneNumValue, setPhoneNumValue] = useState('');
  return (
    <div data-testid="container">
      <CountryCodeSelectorCombinedReact
        value={phoneNumValue}
        onChange={(e: { target: { value: string } }) =>
          setPhoneNumValue(e.target.value)
        }
        countryCodeLabel="Country code"
        phoneNumberLabel="Phone number"
        selectorProps={{ classes: { input: 'selectorTest' } }}
        inputProps={{ InputProps: { classes: { input: 'inputTest' } } }}
      />
      {phoneNumValue && <p>{phoneNumValue}</p>}
    </div>
  );
}

beforeEach(() => {
  const testName = expect.getState().currentTestName;
  if (testName?.includes('Zustand')) {
    cleanup();
    render(<TestComponentZustand />);
  }
  if (testName?.includes('React')) {
    cleanup();
    render(<TestComponentReact />);
  }
});

afterEach(() => cleanup());

describe('basic functionality', () => {
  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'component is rendered ($type)',
    () => {
      const countryCodeSelector = screen.getByLabelText('Country code');
      const phoneNumberInput = screen.getByLabelText('Phone number');
      expect(countryCodeSelector).toBeDefined();
      expect(phoneNumberInput).toBeDefined();
    }
  );

  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'value is changed when the phone number changes ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');
      const selector = screen.getByLabelText('Country code');
      await user.type(input, '+358 12345');
      expect(selector).toHaveValue('Finland (FI)');
    }
  );

  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'country code is cleared when the clear button is pressed ($type)',
    async () => {
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
    }
  );

  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'selector is opened with suitable options when text is typed into selector, and one can be selected ($type)',
    async () => {
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
    }
  );
});

describe('error detection', () => {
  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'displays an error when something else than a number or plus sign is typed as the first character of the phone number ($type)',
    async () => {
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
    }
  );

  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'displays an error when two separator characters are typed into the phone number ($type)',
    async () => {
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
    }
  );

  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'displays an error when plus sign is used in any other place than in the beginning of the phone number ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');

      await user.type(input, '1+');
      const error1 = screen.getByText(
        'Plus can only be the first character of the phone number'
      );
      expect(error1).toBeDefined();
    }
  );
});

describe('generic API functionality', () => {
  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'props can be passed to underlying components ($type)',
    () => {
      const countryCodeSelector = screen.getByLabelText('Country code');
      const phoneNumberInput = screen.getByLabelText('Phone number');
      expect(countryCodeSelector).toHaveClass('selectorTest');
      expect(phoneNumberInput).toHaveClass('inputTest');
    }
  );
});
