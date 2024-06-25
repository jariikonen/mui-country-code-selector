import CountryCodeStoreProvider from '../../store/CountryCodeStoreProvider';
import CCSelectorCompositeProps from '../../types/CCSelectorCompositeProps';
import {
  DEFAULT_ERROR_MESSAGE_DELAY,
  DEFAULT_ERROR_MESSAGE_DISPLAY,
  DEFAULT_PHONE_NUMBER_LABEL,
} from '../common';
import CountryCodeSelectorCompositeInner from './CountryCodeSelectorCompositeZustandInner';

/**
 * A complete phone number input React component with a country code selector
 * autocomplete field. Based on MUI's `Autocomplete`
 * ({@link https://mui.com/material-ui/react-autocomplete/}) and `TextField`
 * ({@link https://mui.com/material-ui/react-text-field/}) components. These
 * subcomponents are combined using a common state that is implemented
 * differently in specific variants of the component.
 *
 * This component variant uses the provided Zustand store as the common state
 * between the subcomponents. See the documentation for `CCSelectorState` and
 * `useCountryCodeStore` for more information about the store.
 *
 * @returns A complete phone number input React component with a country code
 *    selector autocomplete field.
 * @alpha
 */
function CountryCodeSelectorComposite({
  id,
  name,
  value,
  onChange,
  inputRef,
  countryCodeLabel,
  phoneNumberLabel = DEFAULT_PHONE_NUMBER_LABEL,
  errorMessageDelay = DEFAULT_ERROR_MESSAGE_DELAY,
  errorMessageDisplay = DEFAULT_ERROR_MESSAGE_DISPLAY,
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
}: CCSelectorCompositeProps) {
  return (
    <CountryCodeStoreProvider>
      <CountryCodeSelectorCompositeInner
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

export default CountryCodeSelectorComposite;
