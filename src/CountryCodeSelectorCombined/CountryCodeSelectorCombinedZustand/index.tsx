import CountryCodeStoreProvider from '../../store/CountryCodeStoreProvider';
import CCSelectorCombinedProps from '../../types/CCSelectorCombinedProps';
import CountryCodeSelectorCombinedInner from './CountryCodeSelectorCombinedZustandInner';

/**
 * A React compnent combining a CountryCodeSelector with a TextField phone
 * number input and the country code Zustand store.
 * @see CountryCodeSelectorCombinedProps
 * @returns jsx
 */
function CountryCodeSelectorCombined({
  value,
  onChange,
  inputRef,
  countryCodeLabel = 'Country code',
  phoneNumberLabel = 'Phone number',
  errorMessageDelay = 3,
  defaultValue = '',
  group = false,
  filterOptions,
  shrink,
  variant,
  selectorProps = {},
  inputProps = {},
}: CCSelectorCombinedProps) {
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
        filterOptions={filterOptions}
        shrink={shrink}
        variant={variant}
        selectorProps={selectorProps}
        inputProps={inputProps}
      />
    </CountryCodeStoreProvider>
  );
}

export default CountryCodeSelectorCombined;
