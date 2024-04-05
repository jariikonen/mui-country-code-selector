import { MutableRefObject } from 'react';
import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from '@mui/material';
import { CountryType } from '../lib/countryCodeData';
import Variant from './Variant';

interface CCSelectorProps
  extends Omit<
    AutocompleteProps<CountryType, false, false, false, 'div'>,
    'onChange' | 'options' | 'renderInput' | 'value'
  > {
  /**
   * Sets the label string on underlying MUI AutoComplete component's
   * TextField component.
   */
  label?: string;

  /**
   * AutoComplete component's function for rendering the input element.
   * @param params Parameters for the input element.
   * @returns The input element.
   * @see {@link https://mui.com/material-ui/api/autocomplete/#props}
   */
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;

  /**
   * A boolean value that specifies whether or not to shrink the selector and
   * phone number input components' labels.
   * @see {@link https://mui.com/material-ui/react-text-field/#shrink}
   */
  shrink?: boolean;

  /**
   * Defines which variant of the Autocomplete's input component is used.
   * @see {@link https://mui.com/material-ui/react-text-field/#basic-textfield}
   */
  variant?: Variant;

  /**
   * Passes a numeric React ref object to the selector component, which is then
   * increased by one every time the component is rendered.
   */
  renderCountRef?: MutableRefObject<number>;
}

export default CCSelectorProps;
