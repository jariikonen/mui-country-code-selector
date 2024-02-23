import { FilterOptionsState, SxProps } from '@mui/material';
import { CountryType } from '../lib/countryCodeData';
import Variant from './Variant';

interface CCSelectorProps {
  /**
   * Custom options for setting how the select options are filtered based on
   * the input.
   * @see {@link https://mui.com/material-ui/react-autocomplete/#custom-filter}
   */
  filterOptions?:
    | ((
        options: CountryType[],
        state: FilterOptionsState<CountryType>
      ) => CountryType[])
    | null;

  /**
   * A boolean value that specifies whether or not to shrink the selector and
   * phone number input components' labels.
   * @see {@link https://mui.com/material-ui/react-text-field/#shrink}
   */
  shrink?: boolean | null;

  /**
   * The variant of the AutoSelector and TextField component's to use.
   * @see {@link https://mui.com/material-ui/react-text-field/#basic-textfield}
   */
  variant?: Variant | null;

  /**
   * Boolean to indicate whether the autoSelect prop is set on the underlying
   * MUI AutoComplete component. When the prop is set on, AutoComplete will set
   * the value that is currently highlighted as the selected value, when the
   * component loses focus. Prop is set on as default.
   * @see {@link https://mui.com/material-ui/react-autocomplete/#playground}
   */
  autoSelect?: boolean;

  /**
   * Boolean to indicate whether the autoHighlight prop is set on the underlying
   * MUI AutoComplete component. When the prop is set on, AutoComplete will
   * automatically highlight the first option. Prop is set on as default.
   * @see {@link https://mui.com/material-ui/react-autocomplete/#playground}
   */
  autoHighlight?: boolean;

  /**
   * Sets the label string on underlying MUI AutoComplete component's
   * TextField component.
   */
  label: string | null | undefined;

  /** Sx prop passed to the underlying MUI AutoComplete component.
   * @see {@link https://mui.com/system/getting-started/the-sx-prop}
   */
  sx: SxProps;
}

export default CCSelectorProps;
