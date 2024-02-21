import { MutableRefObject } from 'react';
import CountryCodeStoreProvider from '../../store/CountryCodeStoreProvider';
import CountryCodeSelectorCombinedInner from './CountryCodeSelectorCombinedZustandInner';
import { GroupProp } from '../../types/GroupProp';

interface CountryCodeSelectorCombinedProps {
  /**
   * Variable holding the value of the phone number input field. Provide this
   * when you wish to use the component as a controlled component.
   */
  value?: string | null;

  /**
   * Phone number input's onChange event handler. Sets the value prop.
   * Provide this when you wish to use the component as a controlled
   * component.
   */
  onChange?: ((e: { target: { value: string } }) => void) | undefined;

  /**
   * A React Ref that will be set to point to the phone number input element.
   * Provide this to access the component's value when using the component as
   * an uncontrolled component.
   */
  inputRef?: MutableRefObject<HTMLInputElement | null> | undefined;

  /** Label for the country code selector input element. */
  countryCodeLabel?: string;

  /** Label for the phone number input element. */
  phoneNumberLabel?: string;

  /** Defines how long the error message is displayed in seconds. */
  errorMessageDelay?: number;

  /**
   * A default phone number value. Provide this if you wish to set the default
   * value when using the component as an uncontrolled component.
   */
  defaultValue?: string;

  /**
   * Defines if the selector and input component are grouped together. If set
   * to true, the components are wrapped inside a Mui FormGroup component, and
   * if set to 'row' the FormGroup is given the row prop which displays the
   * components in a row.
   */
  group?: GroupProp;
}

/**
 * A React compnent combining a CountryCodeSelector with a TextField phone
 * number input and the country code Zustand store.
 * @see CountryCodeSelectorCombinedProps
 * @returns jsx
 */
function CountryCodeSelectorCombined({
  value = undefined,
  onChange = undefined,
  inputRef = undefined,
  countryCodeLabel = 'Country code',
  phoneNumberLabel = 'Phone number',
  errorMessageDelay = 3,
  defaultValue = '',
  group = false,
}: CountryCodeSelectorCombinedProps) {
  return (
    <CountryCodeStoreProvider>
      <CountryCodeSelectorCombinedInner
        value={value}
        onChange={onChange}
        inputRef={inputRef}
        countryCodeLabel={countryCodeLabel}
        phoneNumberLabel={phoneNumberLabel}
        errorMessageDelay={errorMessageDelay}
        defaultValue={defaultValue}
        group={group}
      />
    </CountryCodeStoreProvider>
  );
}

export default CountryCodeSelectorCombined;