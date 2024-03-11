import InputSelection from '../types/InputSelection';

/**
 * A reset event handler function for the combined country code selector
 * components. Handles the clear event by triggering the changeHandler
 * function with an empty string.
 * @param phoneNumberInput The phone number input DOM element.
 * @param changeHandler A handler function for the phone number changes.
 */
export function resetHandler(
  phoneNumberInput: HTMLInputElement | null | undefined,
  changeHandler: (e: { target: { value: string } }) => void,
  defaultValue: string
) {
  if (phoneNumberInput?.value) {
    changeHandler({
      target: { value: defaultValue },
    });
    setTimeout(() => {
      phoneNumberInput.value = defaultValue; // eslint-disable-line no-param-reassign
    }, 0);
  }
}

/**
 * Adds the resetHandler to a form element that is parent to the country code
 * component.
 * @param parentForm The DOM element of the parent form.
 * @param phoneNumberInput The phone number input DOM element.
 * @param changeHandler A handler function for the phone number changes.
 * @param defaultValue Default value for the phone number input.
 */
export function addResetHandler(
  parentForm: HTMLElement | null | undefined,
  phoneNumberInput: HTMLInputElement | null | undefined,
  changeHandler: (event: { target: { value: string } }) => void,
  defaultValue: string
) {
  if (parentForm) {
    parentForm.addEventListener('reset', () =>
      resetHandler(phoneNumberInput, changeHandler, defaultValue)
    );
  }
}

/**
 * Removes the reset handler function added with setResetHandler() from the
 * parent form element of the combined country code selector component.
 * @param parentForm The DOM element of the parent form.
 * @param phoneNumberInput The phone number input DOM element.
 * @param changeHandler A handler function for the phone number changes.
 */
export function removeResetHandler(
  parentForm: HTMLElement | null | undefined,
  phoneNumberInput: HTMLInputElement | null | undefined,
  changeHandler: (event: { target: { value: string } }) => void,
  defaultValue: string
) {
  parentForm?.removeEventListener('reset', () =>
    resetHandler(phoneNumberInput, changeHandler, defaultValue)
  );
}

/**
 * A keyboard event handler function for the combined country code selector
 * components. Updates the inputSelection state variable based on the keyboard
 * events.
 * @param event The KeyboardEvent received from the phone number input.
 * @param inputSelectionSetter A function that sets the inputSelection state
 *    variable.
 */
export function keyboardHandler(
  event: KeyboardEvent,
  inputSelectionSetter: (inputSelection: InputSelection) => void
) {
  if (!event.shiftKey) {
    const inputElement = event.target as HTMLInputElement;
    inputSelectionSetter({
      selectionStart: inputElement.selectionStart
        ? inputElement.selectionStart
        : 0,
      selectionEnd: inputElement.selectionEnd ? inputElement.selectionEnd : 0,
    });
  }
}

/**
 * Adds the keyboardHandler function to the phone number input element.
 * @param phoneNumberInput The phone number input DOM element.
 * @param inputSelectionSetter A function that sets the inputSelection state
 *    variable.
 */
export function addKeyboardHandler(
  phoneNumberInput: HTMLInputElement | null | undefined,
  inputSelectionSetter: (inputSelection: InputSelection) => void
) {
  phoneNumberInput?.addEventListener('keyup', (event) =>
    keyboardHandler(event, inputSelectionSetter)
  );
}

/**
 * Removes the keyboardHandler function from the phone number input element.
 * @param phoneNumberInput The phone number input DOM element.
 * @param inputSelectionSetter A function that sets the inputSelection state
 *    variable.
 */
export function removeKeyboardHandler(
  phoneNumberInput: HTMLInputElement | null | undefined,
  inputSelectionSetter: (inputSelection: InputSelection) => void
) {
  phoneNumberInput?.removeEventListener('keyup', (event) =>
    keyboardHandler(event, inputSelectionSetter)
  );
}
