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
  formGroupProps,
  gridContainerProps,
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  grid2ContainerProps,
  grid2ItemProps,
  grid2SelectorProps,
  grid2InputProps,
  selectorSize,
  inputSize,
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
        formGroupProps={formGroupProps}
        gridContainerProps={gridContainerProps}
        gridItemProps={gridItemProps}
        gridSelectorProps={gridSelectorProps}
        gridInputProps={gridInputProps}
        grid2ContainerProps={grid2ContainerProps}
        grid2ItemProps={grid2ItemProps}
        grid2SelectorProps={grid2SelectorProps}
        grid2InputProps={grid2InputProps}
        selectorSize={selectorSize}
        inputSize={inputSize}
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
