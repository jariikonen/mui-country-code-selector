import { CountryType } from '../lib';

/**
 * Default label text for the phone number input `TextField` subcomponent of
 * the `CountryCodeSelectorComposite` component.
 */
export const DEFAULT_PHONE_NUMBER_LABEL = 'Phone number';

/**
 * Default equality function for the underlying MUI `Autocomplete` component
 * of the selector subcomponent. See
 * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-isOptionEqualToValue}
 * for more information.
 * @param option The option to test.
 * @param value The value to test against
 * @returns boolean Equality of the values.
 */
export function defaultIsOptionEqualToValue(
  option: CountryType,
  value: CountryType
) {
  return (
    option.country === value.country &&
    option.code === value.code &&
    option.iso === value.iso
  );
}
