/**
 * Represents the text selection range within an input element (phone number
 * input).
 * @alpha
 */
interface InputSelection {
  /** The start index of the text selection within the input element. */
  selectionStart: number;

  /** The end index of the text selection within the input element. */
  selectionEnd: number;
}

export default InputSelection;
