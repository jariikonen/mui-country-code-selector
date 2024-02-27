import { MutableRefObject } from 'react';
import { FilterOptionsState, TextFieldProps } from '@mui/material';
import { GroupProp } from './GroupProp';
import CCSelectorProps from './CCSelectorProps';
import { CountryType } from '../lib/countryCodeData';
import Variant from './Variant';

interface CCSelectorCombinedProps {
  /**
   * Variable holding the value of the phone number input field. Provide this
   * when you wish to use the component as a controlled component.
   */
  value?: string;

  /**
   * Phone number input's onChange event handler. Sets the value prop.
   * Provide this when you wish to use the component as a controlled
   * component.
   */
  onChange?: (e: { target: { value: string } }) => void;

  /** Label for the country code selector input element. */
  countryCodeLabel?: string;

  /** Label for the phone number input element. */
  phoneNumberLabel?: string;

  /** Defines how long the error message is displayed in seconds. */
  errorMessageDelay?: number;

  /**
   * A React Ref that will be set to point to the phone number input element.
   * Provide this to access the component's value when using the component as
   * an uncontrolled component.
   */
  inputRef?: MutableRefObject<HTMLInputElement | null>;

  /**
   * A default phone number value. Provide this if you wish to set the default
   * value when using the component as an uncontrolled component.
   */
  defaultValue?: string;

  /**
   * Defines if the selector and input component are grouped together. If set
   * to true, the components are wrapped inside a Mui FormGroup component, and
   * if set to 'row' the FormGroup is also given the row prop which displays
   * the components in a row.
   */
  group?: GroupProp;

  /**
   * Custom options for setting how the select options are filtered based on
   * the input.
   * @see {@link https://mui.com/material-ui/react-autocomplete/#custom-filter}
   */
  filterOptions?: (
    options: CountryType[],
    state: FilterOptionsState<CountryType>
  ) => CountryType[];

  /**
   * A boolean value that specifies whether or not to shrink the selector and
   * phone number input components' labels.
   * @see {@link https://mui.com/material-ui/react-text-field/#shrink}
   */
  shrink?: boolean;

  /**
   * Defines which variant of the AutoSelector and TextField component's are
   * used.
   * @see {@link https://mui.com/material-ui/react-text-field/#basic-textfield}
   */
  variant?: Variant;

  /**
   * Props applied to the underlying CountryCodeSelector element.
   * @see {@link https://mui.com/material-ui/api/autocomplete/}
   */
  selectorProps?: Partial<CCSelectorProps> | Record<string, never>;

  /**
   * Props applied to the underlying TextField component (the phone number
   * input).
   * @see {@link https://mui.com/material-ui/api/text-field/}
   */
  inputProps?: Partial<TextFieldProps> | Record<string, never>;
}

export default CCSelectorCombinedProps;
