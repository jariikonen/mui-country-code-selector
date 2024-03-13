/**
 * Tests for both CountryCodeSelectorCombinedZustand and CountryCodeSelectorCombinedReact.
 */

import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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
        // NOTICE! Because the cursor tests must wait for the error display to
        // disappear, the error message delay is set unusually short. This
        // may cause some error detection tests to fail in some situations.
        // Increase the delay if you suspect that this is the case.
        errorMessageDelay={0.2}
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
        // NOTICE! Because the cursor tests must wait for the error display to
        // disappear, the error message delay is set unusually short. This
        // may cause some error detection tests to fail in some situations.
        // Increase the delay if you suspect that this is the case.
        errorMessageDelay={0.2}
      />
      {phoneNumValue && <p>{phoneNumValue}</p>}
    </div>
  );
}

beforeEach(() => {
  const testName = expect.getState().currentTestName;
  if (testName?.includes('no default render')) {
    return;
  }
  if (testName?.includes('Zustand')) {
    cleanup();
    render(<TestComponentZustand />);
  } else if (testName?.includes('React')) {
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
        'Only digits and visual separator characters (" ", "-") are allowed'
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

describe('cursor stability', () => {
  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'cursor does not jump to the end of the value when a forbidden character is typed in the middle of the input and cursor was moved with arrow keys ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      await user.keyboard('{w}');
      const error = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error).toBeDefined();
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([{ type: 'Zustand' }, { type: 'React' }])(
    'cursor does not jump to the last position when the cursor is moved with arrow keys before a rerender ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      expect(inputElement.selectionStart).toEqual(3);
      expect(inputElement.selectionEnd).toEqual(3);

      await user.keyboard('{w}{ArrowLeft}{ArrowLeft}');
      const error = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(1);
      expect(input).toHaveValue('12345');
    }
  );

  // React testing library's keyboard API does not yet support testing cursor
  // selections yet (the selectionStart and selectionEnd properties of the
  // input element). See https://github.com/testing-library/user-event/issues/966
  // for more information.
  it.todo.each([{ type: 'Zustand' }, { type: 'React' }])(
    'text selection does not change when it is selected with shift and arrow keys before a rerender ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      expect(inputElement.selectionStart).toEqual(3);
      expect(inputElement.selectionEnd).toEqual(3);

      await user.keyboard('{w}{Shift>}{ArrowLeft}{ArrowLeft}{/Shift}');
      const error = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(1);
      expect(inputElement.selectionEnd).toEqual(3);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'Zustand', pointer: 'mouse' },
    { type: 'React', pointer: 'mouse' },
    { type: 'Zustand', pointer: 'touch' },
    { type: 'React', pointer: 'touch' },
  ])(
    'cursor does not jump to the end of the input when it is positioned with $pointer and a forbidden character is typed ($type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? '[TouchA]' : '[MouseLeft]';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.pointer({ target: input, offset: 2, keys });
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      await user.keyboard('{w}');
      const error = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error).toBeDefined();
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'Zustand', pointer: 'mouse' },
    { type: 'React', pointer: 'mouse' },
    { type: 'Zustand', pointer: 'touch' },
    { type: 'React', pointer: 'touch' },
  ])(
    'cursor does not jump to the last position when the cursor is moved with $pointer before a rerender ($type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? '[TouchA]' : '[MouseLeft]';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.pointer({ target: input, offset: 2, keys });
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      await user.keyboard('{w}');
      await user.pointer({ target: input, offset: 4, keys });
      const error = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(4);
      expect(input).toHaveValue('12345');
    }
  );

  // Making text selections with a pointer doesn't seem to work either. See the
  // issue on selecting text using the keyboard:
  // https://github.com/testing-library/user-event/issues/966 and
  // https://testing-library.com/docs/user-event/pointer#selectiontarget for
  // documentation about how the selection could in theory be made.
  it.todo.each([
    { type: 'Zustand', pointer: 'mouse' },
    { type: 'React', pointer: 'mouse' },
    { type: 'Zustand', pointer: 'touch' },
    { type: 'React', pointer: 'touch' },
  ])(
    'text selection does not change when it is created with $pointer before the rerender ($type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText('Phone number');
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? 'TouchA' : 'MouseLeft';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.pointer({ target: input, offset: 2, keys: `[${keys}]` });
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      await user.keyboard('{w}');
      await user.pointer([
        { target: input, offset: 4, keys: `[${keys}>]` },
        { offset: 5, keys: `[/${keys}]` },
      ]);
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(4);
      const error = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(0);
      expect(input).toHaveValue('12345');
    }
  );
});
