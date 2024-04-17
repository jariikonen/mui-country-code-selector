import InputSelection from '../types/InputSelection';

/**
 * Places the cursor and the text selection by setting the text selection start
 * and end indices within the (phone number) input element.
 * @param inputElement
 * @param inputSelection
 */
export default function placeInputSelection(
  inputElement: HTMLInputElement | undefined | null,
  inputSelection: InputSelection
) {
  if (inputElement && inputElement === document.activeElement) {
    inputElement.focus();
    inputElement.setSelectionRange(
      inputSelection.selectionStart,
      inputSelection.selectionEnd
    );
  }
}
