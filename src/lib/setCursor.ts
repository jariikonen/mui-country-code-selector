import { MutableRefObject } from 'react';

export default function setCursor(
  phoneInputRef: MutableRefObject<HTMLInputElement | null> | null,
  cursorPosition: number
) {
  if (
    phoneInputRef?.current &&
    phoneInputRef.current === document.activeElement
  ) {
    phoneInputRef.current.focus();
    phoneInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  }
}
