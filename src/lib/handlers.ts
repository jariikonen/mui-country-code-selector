import InputSelection from '../types/InputSelection';

/**
 * A reset event handler function for the combined country code selector
 * components. Handles the clear event by triggering the changeHandler
 * function with an empty string.
 * @param changeHandler A handler function for the phone number changes.
 * @param defaultValue Default value for the phone number input.
 */
export function resetHandler(
  changeHandler: (e: { target: { value: string } }) => void,
  defaultValue: string
) {
  changeHandler({
    target: { value: defaultValue },
  });
}

/**
 * Adds the resetHandler to a form element that is parent to the country code
 * component.
 * @param parentForm The DOM element of the parent form.
 * @param changeHandler A handler function for the phone number changes.
 * @param defaultValue Default value for the phone number input.
 */
export function addResetHandler(
  parentForm: HTMLElement | null | undefined,
  changeHandler: (event: { target: { value: string } }) => void,
  defaultValue: string
) {
  if (parentForm) {
    parentForm.addEventListener('reset', () =>
      resetHandler(changeHandler, defaultValue)
    );
  }
}

/**
 * Removes the reset event lister from the parent form element of the combined
 * country code selector component.
 * @param parentForm The DOM element of the parent form.
 * @param changeHandler A handler function for the phone number changes.
 */
export function removeResetHandler(
  parentForm: HTMLElement | null | undefined,
  changeHandler: (event: { target: { value: string } }) => void,
  defaultValue: string
) {
  parentForm?.removeEventListener('reset', () =>
    resetHandler(changeHandler, defaultValue)
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
      selectionStart: inputElement.selectionStart ?? inputElement.value.length,
      selectionEnd: inputElement.selectionEnd ?? inputElement.value.length,
    });
  }
}

/**
 * Adds the keyboardHandler function to the phone number input element as an
 * event listener.
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
 * Removes the keyboard event listener from the phone number input element.
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

/**
 * A mouse event handler function for the combined country code selector
 * components. Updates the inputSelection state variable based on the mouse
 * events.
 * @param event The event received from the phone number input.
 * @param phoneNumberInput The phone number input DOM element.
 * @param inputSelectionSetter A function that sets the inputSelection state
 *    variable.
 */
export function mouseHandler(
  event: Event,
  inputSelectionSetter: (inputSelection: InputSelection) => void
) {
  const phoneNumberInput = event.target as HTMLInputElement;
  inputSelectionSetter({
    selectionStart:
      phoneNumberInput.selectionStart ?? phoneNumberInput.value.length,
    selectionEnd:
      phoneNumberInput.selectionEnd ?? phoneNumberInput.value.length,
  });
}

/**
 * Adds the mouseHandler function to the phone number input element as an
 * event listener.
 * @param phoneNumberInput The phone number input DOM element.
 * @param inputSelectionSetter A function that sets the inputSelection state
 *    variable.
 */
export function addMouseHandler(
  phoneNumberInput: HTMLInputElement | null | undefined,
  inputSelectionSetter: (inputSelection: InputSelection) => void
) {
  phoneNumberInput?.addEventListener('mouseup', (event) =>
    mouseHandler(event, inputSelectionSetter)
  );
}

/**
 * Removes the mouse event listener from the phone number input element.
 * @param phoneNumberInput The phone number input DOM element.
 * @param inputSelectionSetter A function that sets the inputSelection state
 *    variable.
 */
export function removeMouseHandler(
  phoneNumberInput: HTMLInputElement | null | undefined,
  inputSelectionSetter: (inputSelection: InputSelection) => void
) {
  phoneNumberInput?.removeEventListener('mouseUp', (event) =>
    mouseHandler(event, inputSelectionSetter)
  );
}

/**
 * A blur event handler function for the combined country code selector
 * components. Sets the phone number input TextField components label to be
 * enlarged if the value has been cleared.
 * @param isCleared Boolean indicating whether the input's value is cleared.
 * @param rerenderToggler A function that toggles the value of the rerender
 *    state variable.
 */
export function blurHandler(
  isCleared: () => boolean,
  rerenderToggler: () => void
) {
  const cleared = isCleared();
  if (cleared) {
    rerenderToggler();
  }
}

/**
 * Adds the blurHandler function to the phone number input element as an
 * event listener.
 * @param phoneNumberInput The phone number input DOM element.
 * @param isCleared Boolean indicating whether the input's value is cleared.
 * @param rerenderToggler A function that toggles the value of the rerender
 *    state variable.
 */
export function addBlurHandler(
  phoneNumberInput: HTMLInputElement | null | undefined,
  isCleared: () => boolean,
  rerenderToggler: () => void
) {
  phoneNumberInput?.addEventListener('blur', () =>
    blurHandler(isCleared, rerenderToggler)
  );
}

/**
 * Removes the blur event listener from the phone number input element.
 * @param phoneNumberInput The phone number input DOM element.
 * @param isCleared Boolean indicating whether the input's value is cleared.
 * @param rerenderToggler A function that toggles the value of the rerender
 *    state variable.
 */
export function removeBlurHandler(
  phoneNumberInput: HTMLInputElement | null | undefined,
  isCleared: () => boolean,
  rerenderToggler: () => void
) {
  phoneNumberInput?.removeEventListener('blur', () =>
    blurHandler(isCleared, rerenderToggler)
  );
}
