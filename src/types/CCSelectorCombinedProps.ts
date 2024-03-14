import { MutableRefObject } from 'react';
import {
  FilterOptionsState,
  FormGroupProps,
  FormHelperTextProps,
  TextFieldProps,
} from '@mui/material';
import CCSelectorProps from './CCSelectorProps';
import { CountryType } from '../lib/countryCodeData';
import Variant from './Variant';
import GroupProp from './GroupProp';
import ComponentSize from './ComponentSize';
import {
  Grid2ContainerProps,
  Grid2ItemProps,
  GridContainerProps,
  GridItemProps,
} from './GridProps';

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
   * Determines how the error message is displayed. When set to 'both', error is
   * displayed both as an error status of the component and by displaying an
   * error message. When set to 'none' neither is displayed. Prop can also be
   * set as 'message' or 'status' in which case the corresponding method is
   * used to indicate the error.
   */
  errorMessageDisplay?: 'none' | 'message' | 'status' | 'both';

  /**
   * Passes a custom function for handling errors. The function receives the
   * error message as a parameter.
   */
  errorHandler?: (error: string) => void;

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
   * Defines if and how the country code selector and phone number input
   * components are grouped together. Prop accepts the following values:
   * 'grid', 'gridItems', 'grid2', 'grid2Items', 'row', and boolean true and
   * false. Option 'grid' wraps the components into a MUI Grid item components
   * and creates a Grid container around them. Option 'gridItems' just wraps
   * the components into Grid items and leaves the container out. Options
   * 'grid2' and 'grid2Items' do the same with MUI Grid2 components.
   *
   * If the prop is set to true, the components are wrapped inside a MUI
   * FormGroup component, and if set to 'row' the FormGroup is also given the
   * row property which makes the components to be displayed in a row. All
   * layout wrappers can be ommitted by setting the prop value to false.
   */
  group?: GroupProp;

  /**
   * Props passed to the MUI FormGroup component if the country code components
   * are wrapped in one.
   */
  formGroupProps?: Partial<FormGroupProps>;

  /**
   * Props passed to the MUI Grid container component if the country code
   * components are wrapped in one.
   */
  gridContainerProps?: GridContainerProps;

  /**
   * Props passed to the MUI Grid item components if the country code
   * components are wrapped in such. Is overwritten by gridSelectorProps and
   * gridInputProps.
   */
  gridItemProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid item component that the selector component
   * is wrapped in, if the country code components are wrapped in a Grid.
   * Overwrites the gridItemProps.
   */
  gridSelectorProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid item component that the phone number input
   * component is wrapped in, if the country code components are wrapped in a
   * Grid. Overwrites the gridItemProps.
   */
  gridInputProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid item component that the error message
   * component is wrapped in, if the country code components are wrapped in a
   * Grid. Overwrites the gridItemProps.
   */
  gridErrorProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid2 container component if the country code
   * components are wrapped in one.
   */
  grid2ContainerProps?: Grid2ContainerProps;

  /**
   * Props passed to the MUI Grid2 item components if the country code
   * components are wrapped in such. Is overwritten by grid2SelectorProps and
   * grid2InputProps.
   */
  grid2ItemProps?: Grid2ItemProps;

  /**
   * Props passed to the MUI Grid2 item component that the selector component
   * is wrapped in, if the country code components are wrapped in a Grid2.
   * Overwrites the grid2ItemProps.
   */
  grid2SelectorProps?: Grid2ItemProps;

  /**
   * Props passed to the MUI Grid2 item component that the phone number input
   * component is wrapped in, if the country code components are wrapped in a
   * Grid2. Overwrites the grid2ItemProps.
   */
  grid2InputProps?: Grid2ItemProps;

  /**
   * Props passed to the MUI Grid2 item component that the error message
   * component is wrapped in, if the country code components are wrapped in a
   * Grid2. Overwrites the grid2ItemProps.
   */
  grid2ErrorProps?: Grid2ItemProps;

  /**
   * Sets the breakpoint size props of the selector components grid item, when
   * the country code components are wrapped in a MUI Grid or MUI Grid2.
   * Accepts an object with keys for MUI's responsive breakpoints (xs, sm, md,
   * lg, and xl), and the values can be either a number, a string 'auto' or a
   * boolean. If the value for a breakpoint is false the prop is ignored.
   * @see {@link https://mui.com/material-ui/api/grid/#props}
   * @see {@link https://mui.com/material-ui/api/grid/#grid-prop-xs}
   * @see {@link https://mui.com/material-ui/customization/breakpoints/}
   */
  selectorSize?: ComponentSize;

  /**
   * Sets the breakpoint size props of the phone number input components grid
   * item, when the country code components are wrapped in a MUI Grid or MUI
   * Grid2. Accepts an object with keys for MUI's responsive breakpoints (xs,
   * sm, md, lg, and xl), and the values can be either a number, a string
   * 'auto' or a boolean. If the value for a breakpoint is false the prop is
   * ignored.
   * @see {@link https://mui.com/material-ui/api/grid/#props}
   * @see {@link https://mui.com/material-ui/api/grid/#grid-prop-xs}
   * @see {@link https://mui.com/material-ui/customization/breakpoints/}
   */
  inputSize?: ComponentSize;

  /**
   * Sets the breakpoint size props of the error message components grid
   * item, when the country code components are wrapped in a MUI Grid or MUI
   * Grid2. Accepts an object with keys for MUI's responsive breakpoints (xs,
   * sm, md, lg, and xl), and the values can be either a number, a string
   * 'auto' or a boolean. If the value for a breakpoint is false the prop is
   * ignored.
   * @see {@link https://mui.com/material-ui/api/grid/#props}
   * @see {@link https://mui.com/material-ui/api/grid/#grid-prop-xs}
   * @see {@link https://mui.com/material-ui/customization/breakpoints/}
   */
  errorSize?: ComponentSize;

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

  /**
   * Props applied to the FormHelperText component of the combined country code
   * selector component (a possible error message).
   * @see {@link https://mui.com/material-ui/api/text-field/}
   */
  errorProps?: Partial<FormHelperTextProps> | Record<string, never>;
}

export default CCSelectorCombinedProps;
