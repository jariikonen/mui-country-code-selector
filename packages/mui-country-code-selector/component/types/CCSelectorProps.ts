import { MutableRefObject } from 'react';
import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextFieldVariants,
} from '@mui/material';
import { CountryType } from '../lib/countryCodeData';

/**
 * Represents the props of the `CountryCodeSelector` components.
 * @alpha
 */
interface CCSelectorProps
  extends Omit<
    AutocompleteProps<CountryType, false, boolean, false>,
    'getOptionLabel' | 'onChange' | 'options' | 'renderInput' | 'value'
  > {
  /**
   * A function for rendering the selected option on underlying AutoComplete
   * component. See
   * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-getOptionLabel}
   * for more information about MUI's Autocomplete's `getOptionLabel` prop.
   */
  getOptionLabel?: ((option: CountryType) => string) | undefined;

  /**
   * Sets the `label` string on underlying MUI AutoComplete component's
   * TextField component.
   */
  label?: string;

  /**
   * A function for rendering the input element, that is passed to the
   * underlying MUI Autocomplete component. See
   * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-renderInput}
   * for more information about MUI's Autocomplete's `renderInput` prop.
   * @returns The input element.
   */
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;

  /**
   * A boolean value that specifies whether or not to shrink the selector and
   * phone number input components' labels. See
   * {@link https://mui.com/material-ui/react-text-field/#shrink} for more
   * information.
   */
  shrink?: boolean;

  /**
   * Defines which variant of the Autocomplete's TextField component is used. See
   * {@link https://mui.com/material-ui/react-text-field/#basic-textfield}
   * about the TextField's variants.
   */
  variant?: TextFieldVariants;

  /**
   * Passes a numeric React ref object to the selector component, which is then
   * increased by one every time the component is rendered.
   */
  renderCountRef?: MutableRefObject<number>;
}

export default CCSelectorProps;
