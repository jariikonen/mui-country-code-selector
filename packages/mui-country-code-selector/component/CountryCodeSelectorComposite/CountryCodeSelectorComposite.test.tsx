/* eslint-disable react/jsx-key */
/**
 * Integration tests for CountryCodeSelectorCompositeZustand and
 * CountryCodeSelectorCompositeReact.
 */

import { useRef, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import CountryCodeSelectorCompositeZustand from './CountryCodeSelectorCompositeZustand';
import CountryCodeSelectorCompositeReact from './CountryCodeSelectorCompositeReact';
import {
  DEFAULT_COUNTRY_CODE_LABEL,
  DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION,
} from '../CountryCodeSelector/common';
import { DEFAULT_PHONE_NUMBER_LABEL } from './common';

class ResizeObserverMock {
  static callback: (
    entries: [{ contentBoxSize: [{ inlineSize: number }] }]
  ) => void;

  constructor(
    callback: (entries: [{ contentBoxSize: [{ inlineSize: number }] }]) => void
  ) {
    ResizeObserverMock.callback = callback;
  }

  observe() {} // eslint-disable-line class-methods-use-this

  unobserve() {} // eslint-disable-line class-methods-use-this

  disconnect() {} // eslint-disable-line class-methods-use-this

  static resize(inlineSize: number) {
    ResizeObserverMock.callback([{ contentBoxSize: [{ inlineSize }] }]);
  }
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

function TestComponentZustandControlled() {
  const [phoneNumValue, setPhoneNumValue] = useState('');
  return (
    <div data-testid="container">
      <CountryCodeSelectorCompositeZustand
        value={phoneNumValue}
        onChange={(e: { target: { value: string } }) =>
          setPhoneNumValue(e.target.value)
        }
        selectorProps={{ classes: { input: 'selectorTest' } }}
        inputProps={{ InputProps: { classes: { input: 'inputTest' } } }}
        // NOTICE! Because the cursor tests must wait for the error display to
        // disappear, the error message delay is set unusually short. This
        // may cause some error detection tests to fail in some situations.
        // Increase the delay if you suspect that this is the case.
        errorMessageDelay={0.2}
      />
    </div>
  );
}

function TestComponentReactControlled() {
  const [phoneNumValue, setPhoneNumValue] = useState('');
  return (
    <div data-testid="container">
      <CountryCodeSelectorCompositeReact
        value={phoneNumValue}
        onChange={(e: { target: { value: string } }) =>
          setPhoneNumValue(e.target.value)
        }
        selectorProps={{ classes: { input: 'selectorTest' } }}
        inputProps={{ InputProps: { classes: { input: 'inputTest' } } }}
        // NOTICE! Because the cursor tests must wait for the error display to
        // disappear, the error message delay is set unusually short. This
        // may cause some error detection tests to fail in some situations.
        // Increase the delay if you suspect that this is the case.
        errorMessageDelay={0.2}
      />
    </div>
  );
}

function TestComponentZustandUncontrolled() {
  const phoneNumRef = useRef<HTMLInputElement | null>(null);
  return (
    <div data-testid="container">
      <CountryCodeSelectorCompositeZustand
        inputRef={phoneNumRef}
        selectorProps={{ classes: { input: 'selectorTest' } }}
        inputProps={{ InputProps: { classes: { input: 'inputTest' } } }}
        // NOTICE! Because the cursor tests must wait for the error display to
        // disappear, the error message delay is set unusually short. This
        // may cause some error detection tests to fail in some situations.
        // Increase the delay if you suspect that this is the case.
        errorMessageDelay={0.2}
      />
    </div>
  );
}

function TestComponentReactUncontrolled() {
  const phoneNumRef = useRef<HTMLInputElement | null>(null);
  return (
    <div data-testid="container">
      <CountryCodeSelectorCompositeReact
        inputRef={phoneNumRef}
        selectorProps={{ classes: { input: 'selectorTest' } }}
        inputProps={{ InputProps: { classes: { input: 'inputTest' } } }}
        // NOTICE! Because the cursor tests must wait for the error display to
        // disappear, the error message delay is set unusually short. This
        // may cause some error detection tests to fail in some situations.
        // Increase the delay if you suspect that this is the case.
        errorMessageDelay={0.2}
      />
    </div>
  );
}

let obj;
let rerender: (ui: React.ReactNode) => void;

// NOTICE! There are certain key phrases that trigger pre-test actions if they
// appear in the name of the test. Here is a list of them:
//
//    - 'no default render'
//    - 'ZustandControlled'
//    - 'ZustandUncontrolled'
//    - 'ReactControlled'
//    - 'ReactUncontrolled'
//
// See below what actions they trigger.
beforeEach(() => {
  const testName = expect.getState().currentTestName;
  if (testName?.includes('no default render')) {
    return;
  }
  if (testName?.includes('ZustandControlled')) {
    cleanup();
    obj = render(<TestComponentZustandControlled />);
    rerender = obj.rerender;
  } else if (testName?.includes('ZustandUncontrolled')) {
    cleanup();
    obj = render(<TestComponentZustandUncontrolled />);
    rerender = obj.rerender;
  } else if (testName?.includes('ReactControlled')) {
    cleanup();
    obj = render(<TestComponentReactControlled />);
    rerender = obj.rerender;
  } else if (testName?.includes('ReactUncontrolled')) {
    cleanup();
    obj = render(<TestComponentReactUncontrolled />);
    rerender = obj.rerender;
  }
});

afterEach(() => cleanup());

describe('basic functionality', () => {
  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])('component is rendered ($type)', () => {
    const countryCodeSelector = screen.getByLabelText(
      DEFAULT_COUNTRY_CODE_LABEL
    );
    const phoneNumberInput = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
    expect(countryCodeSelector).toBeDefined();
    expect(phoneNumberInput).toBeDefined();
  });

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])('value is changed when the phone number changes ($type)', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
    const selector = screen.getByLabelText(DEFAULT_COUNTRY_CODE_LABEL);
    await user.type(input, '+358 12345');
    expect(selector).toHaveValue('Finland FI');
  });

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'country code is cleared when the clear button is pressed ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const selector = screen.getByLabelText(DEFAULT_COUNTRY_CODE_LABEL);
      await user.type(input, '+358 12345');
      expect(selector).toHaveValue('Finland FI');
      expect(input).toHaveValue('+358 12345');
      const clear = screen.getByTitle('Clear');
      await user.click(clear);
      expect(selector).toHaveValue('');
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'selector is opened with suitable options when text is typed into selector, and one can be selected ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const selector = screen.getByLabelText(DEFAULT_COUNTRY_CODE_LABEL);

      await user.type(selector, 'fi');
      expect(selector).toHaveValue('fi');
      const finland = screen.getByText('Finland FI +358');
      const fiji = screen.getByText('Fiji FJ +679');
      expect(finland).toBeDefined();
      expect(fiji).toBeDefined();

      await user.click(fiji);
      expect(selector).toHaveValue('Fiji FJ');
      expect(input).toHaveValue('+679 ');
    }
  );
});

describe('error detection', () => {
  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'displays an error when something else than a number or plus sign is typed as the first character of the phone number ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);

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

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'displays an error when two consecutive separator characters are typed into the phone number ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);

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

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'displays an error when plus sign is used anywhere else than at the beginning of the phone number ($type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);

      await user.type(input, '1+');
      const error1 = screen.getByText(
        'Plus can only be the first character of the phone number'
      );
      expect(error1).toBeDefined();
    }
  );
});

describe('generic API functionality', () => {
  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])('props can be passed to underlying components ($type)', () => {
    const countryCodeSelector = screen.getByLabelText(
      DEFAULT_COUNTRY_CODE_LABEL
    );
    const phoneNumberInput = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
    expect(countryCodeSelector).toHaveClass('selectorTest');
    expect(phoneNumberInput).toHaveClass('inputTest');
  });
});

describe('cursor stability', () => {
  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'cursor does not jump when a forbidden character is typed in the middle of the input (keyboard, $type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}');
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      await user.keyboard('{w}');
      const error1 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error1).toBeDefined();
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'cursor does not jump when a forbidden character is typed at the beginning of the value (keyboard, selectionStart = 0, $type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      // move cursor to the beginning (selectionStart = 0, which is falsy)
      await user.keyboard('{Home>}{ArrowLeft}{/Home}');
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(0);

      await user.keyboard('{w}');
      const error2 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error2).toBeDefined();
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(0);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'cursor does not jump to the last position when the cursor is moved before a rerender (keyboard, $type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      expect(inputElement.selectionStart).toEqual(3);
      expect(inputElement.selectionEnd).toEqual(3);

      // trigger an error and move cursor two characters to the left
      await user.keyboard('{w}{ArrowLeft}{ArrowLeft}');
      const error1 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error1).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(1);
      expect(input).toHaveValue('12345');

      // move cursor to the beginning (selectionStart = 0, which is falsy)
      await user.keyboard('{w}{ArrowLeft}');
      const error2 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error2).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(0);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    'cursors does not jump when a prohibited character is typed and an error is being displayed (keyboard, $type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      expect(inputElement.selectionStart).toEqual(3);
      expect(inputElement.selectionEnd).toEqual(3);

      await user.keyboard('{w}{w}');
      const error1 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error1).toBeDefined();
      expect(inputElement.selectionStart).toEqual(3);
      expect(inputElement.selectionEnd).toEqual(3);
    }
  );

  // React testing library's keyboard API does not yet support testing cursor
  // selections yet (the selectionStart and selectionEnd properties of the
  // input element). See https://github.com/testing-library/user-event/issues/966
  // for more information.
  it.todo.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])('re-render does not change text selection (keyboard, $type)', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
    const inputElement = input as HTMLInputElement;

    await user.type(input, '12345');
    expect(inputElement.selectionStart).toEqual(5);
    expect(inputElement.selectionEnd).toEqual(5);

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(inputElement.selectionStart).toEqual(3);
    expect(inputElement.selectionEnd).toEqual(3);

    // trigger an error and select text two characters to the left
    await user.keyboard('{w}{Shift>}{ArrowLeft}{ArrowLeft}{/Shift}');
    const error1 = screen.getByText(
      'Only digits and visual separator characters (" ", "-") are allowed'
    );
    expect(error1).toBeDefined();
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
  });

  // React testing library's keyboard API does not yet support testing cursor
  // selections yet (the selectionStart and selectionEnd properties of the
  // input element). See https://github.com/testing-library/user-event/issues/966
  // for more information.
  it.todo.each([
    { type: 'ZustandControlled' },
    { type: 'ReactControlled' },
    { type: 'ZustandUncontrolled' },
    { type: 'ReactUncontrolled' },
  ])(
    're-render does not change text selection (keyboard, selectionStart = 0, $type)',
    async () => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      expect(inputElement.selectionStart).toEqual(3);
      expect(inputElement.selectionEnd).toEqual(3);

      // trigger an error and select to the beginning (selectionStart = 0,
      // which is falsy)
      await user.keyboard('{w}{Shift>}{Home>}{ArrowLeft}{/Home}{/Shift}');
      const error2 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error2).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(3);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'ZustandControlled', pointer: 'mouse' },
    { type: 'ReactControlled', pointer: 'mouse' },
    { type: 'ZustandControlled', pointer: 'touch' },
    { type: 'ReactControlled', pointer: 'touch' },
  ])(
    'cursor does not jump when it is positioned with $pointer and a forbidden character is typed ($type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? '[TouchA]' : '[MouseLeft]';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.pointer({ target: input, offset: 2, keys });
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      await user.keyboard('{w}');
      const error1 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error1).toBeDefined();
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'ZustandControlled', pointer: 'mouse' },
    { type: 'ReactControlled', pointer: 'mouse' },
    { type: 'ZustandControlled', pointer: 'touch' },
    { type: 'ReactControlled', pointer: 'touch' },
  ])(
    'cursor does not jump when it is positioned at the beginning with $pointer and a forbidden character is typed (selectionStart = 0, $type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? '[TouchA]' : '[MouseLeft]';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      // place the cursor at the beginning (selectionStart = 0, which is falsy)
      await user.pointer({ target: input, offset: 0, keys });
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(0);

      await user.keyboard('{w}');
      const error = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error).toBeDefined();
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(0);
      expect(input).toHaveValue('12345');
    }
  );

  it.each([
    { type: 'ZustandControlled', pointer: 'mouse' },
    { type: 'ReactControlled', pointer: 'mouse' },
    { type: 'ZustandControlled', pointer: 'touch' },
    { type: 'ReactControlled', pointer: 'touch' },
  ])(
    'cursor does not jump to the last position when the cursor is moved with $pointer before a rerender ($type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? '[TouchA]' : '[MouseLeft]';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.pointer({ target: input, offset: 2, keys });
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      // trigger error and place the cursor after the fourth character
      await user.keyboard('{w}');
      await user.pointer({ target: input, offset: 4, keys });
      const error1 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error1).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(4);
      expect(inputElement.selectionEnd).toEqual(4);
      expect(input).toHaveValue('12345');

      // trigger error and place the cursor at the beginning (selectionStart
      // = 0, which is falsy)
      await user.keyboard('{w}');
      await user.pointer({ target: input, offset: 0, keys });
      const error2 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error2).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from the DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(0);
      expect(input).toHaveValue('12345');
    }
  );

  // Making text selections with a pointer doesn't seem to work either. See the
  // issue on selecting text using the keyboard:
  // https://github.com/testing-library/user-event/issues/966 and
  // https://testing-library.com/docs/user-event/pointer#selectiontarget for
  // documentation about how the selection could in theory be made.
  it.todo.each([
    { type: 'ZustandControlled', pointer: 'mouse' },
    { type: 'ReactControlled', pointer: 'mouse' },
    { type: 'ZustandControlled', pointer: 'touch' },
    { type: 'ReactControlled', pointer: 'touch' },
  ])(
    're-render does not change text selection ($pointer, $type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? 'TouchA' : 'MouseLeft';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.pointer({ target: input, offset: 2, keys: `[${keys}]` });
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      // trigger an error and select text from offset 4 to offset 5
      await user.keyboard('{w}');
      await user.pointer([
        { target: input, offset: 4, keys: `[${keys}>]` },
        { offset: 5, keys: `[/${keys}]` },
      ]);
      expect(inputElement.selectionStart).toEqual(4);
      expect(inputElement.selectionEnd).toEqual(5);
      const error1 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error1).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(4);
      expect(inputElement.selectionEnd).toEqual(5);
      expect(input).toHaveValue('12345');
    }
  );

  // Making text selections with a pointer doesn't seem to work either. See the
  // issue on selecting text using the keyboard:
  // https://github.com/testing-library/user-event/issues/966 and
  // https://testing-library.com/docs/user-event/pointer#selectiontarget for
  // documentation about how the selection could in theory be made.
  it.todo.each([
    { type: 'ZustandControlled', pointer: 'mouse' },
    { type: 'ReactControlled', pointer: 'mouse' },
    { type: 'ZustandControlled', pointer: 'touch' },
    { type: 'ReactControlled', pointer: 'touch' },
  ])(
    're-render does not change text selection ($pointer, selectionStart = 0, $type)',
    async ({ pointer }: { type: string; pointer: string }) => {
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const inputElement = input as HTMLInputElement;

      const keys = pointer === 'touch' ? 'TouchA' : 'MouseLeft';

      await user.type(input, '12345');
      expect(inputElement.selectionStart).toEqual(5);
      expect(inputElement.selectionEnd).toEqual(5);

      await user.pointer({ target: input, offset: 2, keys: `[${keys}]` });
      expect(inputElement.selectionStart).toEqual(2);
      expect(inputElement.selectionEnd).toEqual(2);

      // trigger an error and select text from offset 4 to offset 0
      await user.keyboard('{w}');
      await user.pointer([
        { target: input, offset: 4, keys: `[${keys}>]` },
        { offset: 0, keys: `[/${keys}]` },
      ]);
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(4);
      const error2 = screen.getByText(
        'Only digits and visual separator characters (" ", "-") are allowed'
      );
      expect(error2).toBeDefined();
      // a rerender is triggered when the error display times out and the
      // error message is removed from DOM
      await waitForElementToBeRemoved(
        screen.queryByText(
          'Only digits and visual separator characters (" ", "-") are allowed'
        )
      );
      expect(inputElement.selectionStart).toEqual(0);
      expect(inputElement.selectionEnd).toEqual(4);
      expect(input).toHaveValue('12345');
    }
  );
});

describe('responsive country code selector', () => {
  it.each([
    [{ type: 'ZustandControlled' }, <TestComponentZustandControlled />],
    [{ type: 'ReactControlled' }, <TestComponentReactControlled />],
    [{ type: 'ZustandUncontrolled' }, <TestComponentZustandUncontrolled />],
    [{ type: 'ReactUncontrolled' }, <TestComponentReactUncontrolled />],
  ])(
    'abbreviated label is used when component is small ($type)',
    (_, component) => {
      ResizeObserverMock.resize(140);
      rerender(component);
      const selector = screen.getByLabelText(
        DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION
      );
      expect(selector).toBeDefined();
    }
  );

  it.each([
    [{ type: 'ZustandControlled' }, <TestComponentZustandControlled />],
    [{ type: 'ReactControlled' }, <TestComponentReactControlled />],
    [{ type: 'ZustandUncontrolled' }, <TestComponentZustandUncontrolled />],
    [{ type: 'ReactUncontrolled' }, <TestComponentReactUncontrolled />],
  ])(
    'ISO code is used as label for the selected country when component is small ($type)',
    async (_, component) => {
      ResizeObserverMock.resize(140);
      rerender(component);
      const user = userEvent.setup();
      const input = screen.getByLabelText(DEFAULT_PHONE_NUMBER_LABEL);
      const selector = screen.getByLabelText(
        DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION
      );
      await user.type(input, '+358 12345');
      expect(selector).toHaveValue('FI');
    }
  );
});
