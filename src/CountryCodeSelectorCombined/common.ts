/**
 * A reset event lister function for the combined country code selector
 * components. Handles the clear event by triggering handlePhoneNumberChange
 * function with an empty string.
 * @param inputElement The phone number input DOM element.
 * @param handlePhoneNumberChange The phone number change handler function.
 */
export function resetHandler(
  inputElement: HTMLInputElement | null | undefined,
  handlePhoneNumberChange: (e: { target: { value: string } }) => void
) {
  if (inputElement?.value && inputElement.value.length > 0) {
    handlePhoneNumberChange({
      target: { value: '' },
    });
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
  inputElement: HTMLInputElement | null,
  handlePhoneNumberChange: (event: { target: { value: string } }) => void
) {
  if (formElement) {
    formElement.addEventListener('reset', () =>
      resetHandler(inputElement, handlePhoneNumberChange)
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
  handlePhoneNumberChange: (event: { target: { value: string } }) => void
) {
  formElement?.removeEventListener('reset', () =>
    resetHandler(inputElement, handlePhoneNumberChange)
  );
}
