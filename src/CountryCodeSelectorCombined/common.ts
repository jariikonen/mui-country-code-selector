/**
 * A reset event lister function for the combined country code selector
 * components. Handles the clear event by triggering handlePhoneNumberChange
 * function with an empty string.
 * @param inputElement The phone number input DOM element.
 * @param handlePhoneNumberChange The phone number change handler function.
 */
export function resetHandler(
  inputElement: HTMLInputElement | null | undefined,
  handlePhoneNumberChange: (e: { target: { value: string } }) => void,
  defaultValue: string
) {
  if (inputElement?.value) {
    handlePhoneNumberChange({
      target: { value: defaultValue },
    });
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      inputElement.value = defaultValue;
    }, 0);
  }
}

/**
 * Adds the reset handler function into a form element.
 * @param formElement The form DOM element.
 * @param inputElement The phone number input DOM element.
 * @param handlePhoneNumberChange
 */
export function addResetHandler(
  formElement: HTMLElement | null | undefined,
  inputElement: HTMLInputElement | null | undefined,
  handlePhoneNumberChange: (event: { target: { value: string } }) => void,
  defaultValue: string
) {
  if (formElement) {
    formElement.addEventListener('reset', () =>
      resetHandler(inputElement, handlePhoneNumberChange, defaultValue)
    );
  }
}

/**
 * Removes the reset handler function added with setResetHandler() from a form
 * element.
 * @param formElement The form DOM element.
 * @param inputElement The phone number input DOM element.
 * @param handlePhoneNumberChange The phone number change handler function.
 */
export function removeResetHandler(
  formElement: HTMLElement | null | undefined,
  inputElement: HTMLInputElement | null | undefined,
  handlePhoneNumberChange: (event: { target: { value: string } }) => void,
  defaultValue: string
) {
  formElement?.removeEventListener('reset', () =>
    resetHandler(inputElement, handlePhoneNumberChange, defaultValue)
  );
}
