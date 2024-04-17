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
  id,
  name,
  value,
  onChange,
  inputRef,
  countryCodeLabel = 'Country code',
  phoneNumberLabel = 'Phone number',
  errorMessageDelay = 3,
  errorMessageDisplay = 'both',
  onError = undefined,
  defaultValue = '',
  layout = undefined,
  formGroupProps,
  gridContainerProps,
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  gridErrorProps,
  grid2ContainerProps,
  grid2ItemProps,
  grid2SelectorProps,
  grid2InputProps,
  grid2ErrorProps,
  stackProps,
  selectorSize,
  inputSize,
  errorSize,
  filterOptions,
  shrink,
  variant,
  selectorProps = {},
  inputProps = {},
  errorProps = {},
  selectorRenderCountRef,
  inputRenderCountRef,
}: CCSelectorCombinedProps) {
  return (
    <CountryCodeStoreProvider>
      <CountryCodeSelectorCombinedInner
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        inputRef={inputRef}
        countryCodeLabel={countryCodeLabel}
        phoneNumberLabel={phoneNumberLabel}
        errorMessageDelay={errorMessageDelay}
        errorMessageDisplay={errorMessageDisplay}
        onError={onError}
        defaultValue={defaultValue}
        layout={layout}
        formGroupProps={formGroupProps}
        gridContainerProps={gridContainerProps}
        gridItemProps={gridItemProps}
        gridSelectorProps={gridSelectorProps}
        gridInputProps={gridInputProps}
        gridErrorProps={gridErrorProps}
        grid2ContainerProps={grid2ContainerProps}
        grid2ItemProps={grid2ItemProps}
        grid2SelectorProps={grid2SelectorProps}
        grid2InputProps={grid2InputProps}
        grid2ErrorProps={grid2ErrorProps}
        stackProps={stackProps}
        selectorSize={selectorSize}
        inputSize={inputSize}
        errorSize={errorSize}
        filterOptions={filterOptions}
        shrink={shrink}
        variant={variant}
        selectorProps={selectorProps}
        inputProps={inputProps}
        errorProps={errorProps}
        selectorRenderCountRef={selectorRenderCountRef}
        inputRenderCountRef={inputRenderCountRef}
      />
    </CountryCodeStoreProvider>
  );
}

export default CountryCodeSelectorCombined;
