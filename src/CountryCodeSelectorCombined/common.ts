import { MutableRefObject } from 'react';

/**
 * Finds the first form element that is parent to this component.
 */
export function getForm(el: HTMLInputElement | null) {
  let parent = el?.parentElement;
  while (parent && parent.tagName !== 'FORM') {
    parent = parent?.parentElement;
  }
  return parent;
}

/**
 * A helper function for the CountryCodeSelectorCombined functions. Sets the
 * phoneInputRef, inputRef and the formRef.
 * @param inputElement The input element for which the form parent element is
 *    searched.
 * @param formRef A React ref that is set to point to the form element that is
 *    parent to the input element.
 * @param phoneInputRef A React ref that is set to point to the phone number
 *    input element.
 * @param inputRef A React ref coming from the caller of the combined component
 *    and which is set to point to the phone number input element.
 */
export function setUncontrolledRefs(
  inputElement: HTMLInputElement | null,
  formRef: MutableRefObject<HTMLElement | null>,
  phoneInputRef: MutableRefObject<HTMLInputElement | null>,
  inputRef: MutableRefObject<HTMLInputElement | null> | undefined
) {
  const form = getForm(inputElement);
  formRef.current = form!; // eslint-disable-line no-param-reassign
  phoneInputRef.current = inputElement; // eslint-disable-line no-param-reassign
  if (inputRef !== undefined) {
    inputRef.current = inputElement; // eslint-disable-line no-param-reassign
  }
}

/**
 * KIRJOITA LOPPUUN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * @param phoneInputRef
 * @param handlePhoneNumberChange
 */
export function resetHandler(
  phoneInputRef: MutableRefObject<HTMLInputElement | null>,
  handlePhoneNumberChange: (e: { target: { value: string } }) => void
) {
  if (phoneInputRef.current?.value) {
    handlePhoneNumberChange({
      target: { value: '' },
    });
  }
}

/**
 * KIRJOITA LOPPUUN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * @param formRef
 * @param phoneInputRef
 * @param handlePhoneNumberChange
 */
export function setResetHandler(
  formElement: HTMLElement | null,
  phoneInputRef: MutableRefObject<HTMLInputElement | null>,
  handlePhoneNumberChange: (event: { target: { value: string } }) => void
) {
  if (formElement) {
    formElement.addEventListener('reset', () =>
      resetHandler(phoneInputRef, handlePhoneNumberChange)
    );
  }
}

/**
 * KIRJOITA LOPPUUN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * @param formElement
 * @param phoneInputRef
 * @param handlePhoneNumberChange
 */
export function removeResetHandler(
  formElement: HTMLElement | null,
  phoneInputRef: MutableRefObject<HTMLInputElement | null>,
  handlePhoneNumberChange: (event: { target: { value: string } }) => void
) {
  formElement?.removeEventListener('reset', () =>
    resetHandler(phoneInputRef, handlePhoneNumberChange)
  );
}
