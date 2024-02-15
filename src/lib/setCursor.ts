export default function setCursor(
  inputElement: HTMLInputElement | undefined | null,
  cursorPosition: number
) {
  if (inputElement && inputElement === document.activeElement) {
    inputElement.focus();
    inputElement.setSelectionRange(cursorPosition, cursorPosition);
  }
}
