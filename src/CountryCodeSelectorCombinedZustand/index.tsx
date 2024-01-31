import { MutableRefObject } from 'react';
import CountryCodeStoreProvider from '../store/CountryCodeStoreProvider';
import { CountryType } from '../lib/countryCodeData';
import CountryCodeSelectorCombinedInner from './CountryCodeSelectorCombinedZustandInner';

interface CountryCodeSelectorCombinedProps {
  /**
   * A React ref for storing the phone number value outside the
   * CountryCodeSelectorCombined component's state. The value of the ref is
   * updated when the phone number inputted by the user changes.
   */
  phoneNumValueRef: MutableRefObject<string>;

  /**
   * A React ref for storing the country code value outside the
   * CountryCodeSelectorCombined component's state. The value of the ref is
   * updated when the phone number inputted by the user changes.
   */
  countryCodeValueRef?: MutableRefObject<CountryType | null> | undefined | null;

  /**
   * Label for the country code selector input element.
   */
  countryCodeLabel?: string;

  /**
   * Label for the phone number input element.
   */
  phoneNumberLabel?: string;
}

/**
 * A React compnent combining a CountryCodeSelector with a TextField phone
 * number input and the country code Zustand store.
 * @see CountryCodeSelectorCombinedProps
 * @returns jsx
 */
function CountryCodeSelectorCombined({
  phoneNumValueRef,
  countryCodeValueRef = null,
  countryCodeLabel = 'Country code',
  phoneNumberLabel = 'Phone number',
}: CountryCodeSelectorCombinedProps) {
  return (
    <CountryCodeStoreProvider>
      <CountryCodeSelectorCombinedInner
        phoneNumValueRef={phoneNumValueRef}
        countryCodeValueRef={countryCodeValueRef}
        countryCodeLabel={countryCodeLabel}
        phoneNumberLabel={phoneNumberLabel}
      />
    </CountryCodeStoreProvider>
  );
}

export default CountryCodeSelectorCombined;
