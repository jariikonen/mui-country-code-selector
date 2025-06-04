import { MutableRefObject, RefCallback } from 'react';
import {
  FilterOptionsState,
  FormGroupProps,
  FormHelperTextProps,
  StackProps,
  TextFieldProps,
  TextFieldVariants,
} from '@mui/material';
import CCSelectorProps from './CCSelectorProps';
import { CountryType } from '../lib/countryCodeData';
import LayoutProp from './LayoutProp';
import ComponentSize, { ComponentSizeLegacyGrid } from './ComponentSize';
import {
  Grid2ContainerProps,
  Grid2ItemProps,
  GridContainerProps,
  GridItemProps,
} from './GridProps';

/**
 * Represents the props of the `CountryCodeSelectorComposite` components.
 * @alpha
 */
interface CCSelectorCompositeProps {
  /**
   * The global HTML `id` attribute passed to the input subcomponent of the
   * composite component. Defines an identifier which must be unique in the
   * whole document. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id}
   * for more information.
   */
  id?: string;

  /**
   * An HTML `name` attribute passed to the input subcomponent of the composite
   * component. Name attribute is a string specifying a name for the input.
   * This name is submitted along with the control's value when the form data
   * is submitted. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name}
   * for more information.
   */
  name?: string;

  /**
   * Variable holding the value of the phone number input field. Provide this
   * when you wish to use the component as a controlled component.
   */
  value?: string;

  /**
   * Phone number input's change event handler. Sets the `value` prop.
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
   * Determines how the error message is displayed. When set to `both`, error
   * is displayed both as an error status of the component and by displaying an
   * error message. When set to `none` neither is displayed. Prop can also be
   * set as `message` or `status` in which case the corresponding method is
   * used to indicate the error.
   */
  errorMessageDisplay?: 'none' | 'message' | 'status' | 'both';

  /**
   * Passes a custom function for handling errors. The function receives the
   * error message as a parameter.
   */
  onError?: (error: string) => void;

  /**
   * A React ref that will be set to point to the phone number input element.
   * Provide this to access the component's value when using the component as
   * an uncontrolled component.
   */
  inputRef?:
    | MutableRefObject<HTMLInputElement | null>
    | RefCallback<HTMLInputElement | null>;

  /**
   * A default phone number value. Provide this if you wish to set the default
   * value when using the component as an uncontrolled component.
   */
  defaultValue?: string;

  /**
   * Defines what kind of layout components the subcomponents of a composite
   * component are wrapped in. Accepts the following values: `grid`,
   * `gridItems`, `grid2`, `grid2Items`, `stack`, and `group`. Option `grid`
   * wraps the components into MUI Grid item components and creates a Grid
   * container around them. Option `gridItems` just wraps the components into
   * Grid items and leaves the container out. Options `grid2` and `grid2Items`
   * do the same with MUI Grid2 components. Option `stack` wraps the components
   * in a MUI Stack component, and with the `group` option the components are
   * wrapped in a MUI FormGroup component.
   */
  layout?: LayoutProp;

  /**
   * Props passed to the MUI FormGroup component if the country code components
   * are wrapped in one. See
   * {@link https://v6.mui.com/material-ui/api/form-group/} for more information
   * on what props can be passed to the component.
   */
  formGroupProps?: Partial<FormGroupProps>;

  /**
   * Props passed to the MUI Grid container component if the country code
   * components are wrapped in one. See
   * {@link https://v6.mui.com/material-ui/api/grid/} for more information on
   * what props can be passed to the component.
   */
  gridContainerProps?: GridContainerProps;

  /**
   * Props passed to the MUI Grid item components if the country code
   * components are wrapped in such. Is overwritten by `gridSelectorProps` and
   * `gridInputProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid/} for more information on
   * what props can be passed to the component.
   */
  gridItemProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid item component that the selector component
   * is wrapped in, if the country code components are wrapped in a Grid.
   * Overwrites the `gridItemProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid/} for more information on
   * what props can be passed to the component.
   */
  gridSelectorProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid item component that the phone number input
   * component is wrapped in, if the country code components are wrapped in a
   * Grid. Overwrites the `gridItemProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid/} for more information on
   * what props can be passed to the component.
   */
  gridInputProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid item component that the error message
   * component is wrapped in, if the country code components are wrapped in a
   * Grid. Overwrites the `gridItemProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid/} for more information on
   * what props can be passed to the component.
   */
  gridErrorProps?: GridItemProps;

  /**
   * Props passed to the MUI Grid2 container component if the country code
   * components are wrapped in one. See
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information on
   * what props can be passed to the component.
   */
  grid2ContainerProps?: Grid2ContainerProps;

  /**
   * Props passed to the MUI Grid2 item components if the country code
   * components are wrapped in such. Is overwritten by `grid2SelectorProps` and
   * `grid2InputProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information on
   * what props can be passed to the component.
   */
  grid2ItemProps?: Grid2ItemProps;

  /**
   * Props passed to the MUI Grid2 item component that the selector component
   * is wrapped in, if the country code components are wrapped in a Grid2.
   * Overwrites the `grid2ItemProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information on
   * what props can be passed to the component.
   */
  grid2SelectorProps?: Grid2ItemProps;

  /**
   * Props passed to the MUI Grid2 item component that the phone number input
   * component is wrapped in, if the country code components are wrapped in a
   * Grid2. Overwrites the `grid2ItemProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information on
   * what props can be passed to the component.
   */
  grid2InputProps?: Grid2ItemProps;

  /**
   * Props passed to the MUI Grid2 item component that the error message
   * component is wrapped in, if the country code components are wrapped in a
   * Grid2. Overwrites the `grid2ItemProps`. See
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information on
   * what props can be passed to the component.
   */
  grid2ErrorProps?: Grid2ItemProps;

  /**
   * Props passed to the MUI Stack component if the country code components are
   * wrapped in one. See
   * {@link https://v6.mui.com/material-ui/api/stack/} for more information on
   * what props can be passed to the component.
   */
  stackProps?: Partial<StackProps>;

  /**
   * Sets the breakpoint size props of the selector components grid item, when
   * the `grid` or `grid2` layout is used. The Grid component accepts an object
   * with keys for MUI's responsive breakpoints (`xs`, `sm`, `md`, `lg`, and
   * `xl`), and the values can be either a number, string "auto", or a boolean.
   * For the Grid2 component the object must be added to the props using key
   * `size`. If the value for a breakpoint is `false` the prop is ignored.
   *
   * See {@link https://v6.mui.com/material-ui/api/grid/} for more
   * information about MUI Grid props,
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information
   * about MUI Grid2 props, and
   * {@link https://v6.mui.com/material-ui/customization/breakpoints/} for more
   * information about MUI's responsive breakpoints.
   */
  selectorSize?: ComponentSize | ComponentSizeLegacyGrid;

  /**
   * Sets the breakpoint size props of the phone number input components grid
   * item, when the `grid` or `grid2` layout is used. The Grid component
   * accepts an object with keys for MUI's responsive breakpoints (`xs`, `sm`,
   * `md`, `lg`, and `xl`), and the values can be either a number, string
   * "auto", or a boolean. For the Grid2 component the object must be added to
   * the props using key `size`. If the value for a breakpoint is `false` the
   * prop is ignored.
   *
   * See {@link https://v6.mui.com/material-ui/api/grid/} for more
   * information about MUI Grid props,
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information
   * about MUI Grid2 props, and
   * {@link https://v6.mui.com/material-ui/customization/breakpoints/} for more
   * information about MUI's responsive breakpoints.
   */
  inputSize?: ComponentSize | ComponentSizeLegacyGrid;

  /**
   * Sets the breakpoint size props of the error message components grid item,
   * when the `grid` or `grid2` layout is used. The Grid component accepts an
   * object with keys for MUI's responsive breakpoints (`xs`, `sm`, `md`, `lg`,
   * and `xl`), and the values can be either a number, string "auto", or a
   * boolean. For the Grid2 component the object must be added to the props
   * using key `size`. If the value for a breakpoint is `false` the prop is
   * ignored.
   *
   * See {@link https://v6.mui.com/material-ui/api/grid/} for more
   * information about MUI Grid props,
   * {@link https://v6.mui.com/material-ui/api/grid-2/} for more information
   * about MUI Grid2 props, and
   * {@link https://v6.mui.com/material-ui/customization/breakpoints/} for more
   * information about MUI's responsive breakpoints.
   */
  errorSize?: ComponentSize | ComponentSizeLegacyGrid;

  /**
   * Custom options for setting how the select options are filtered based on
   * the input. See
   * {@link https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-filterOptions}
   * and {@link https://mui.com/material-ui/react-autocomplete/#custom-filter}
   * for more information about custom filtering.
   */
  filterOptions?: (
    options: CountryType[],
    state: FilterOptionsState<CountryType>
  ) => CountryType[];

  /**
   * A boolean value that specifies whether or not to shrink the selector and
   * phone number input components' labels. See
   * {@link https://mui.com/material-ui/react-text-field/#shrink} for more
   * information.
   */
  shrink?: boolean;

  /**
   * Defines which variant of the MUI TextField is used in the country code
   * selector and phone number input components. See
   * {@link https://mui.com/material-ui/react-text-field/#basic-textfield}
   * about the TextField variants.
   */
  variant?: TextFieldVariants;

  /**
   * Props applied to the underlying CountryCodeSelector element. See
   * {@link https://mui.com/material-ui/api/autocomplete/} for more information
   * about MUI's Autocomplete's API.
   */
  selectorProps?: Partial<CCSelectorProps> | Record<string, never>;

  /**
   * Props applied to the underlying TextField component (the phone number
   * input). See
   * {@link https://mui.com/material-ui/api/text-field/} for more information
   * about the MUI's TextField's API.
   */
  inputProps?:
    | Partial<
        Omit<TextFieldProps, 'onChange' | 'select' | 'SelectProps' | 'value'>
      >
    | Record<string, never>;

  /**
   * Props applied to the FormHelperText component of the composite country code
   * selector component (a possible error message). See
   * {@link https://mui.com/material-ui/api/form-helper-text/} for more
   * information about the MUI's FormHelperText's API.
   */
  errorProps?: Partial<FormHelperTextProps> | Record<string, never>;

  /**
   * Passes a numeric React ref object to the selector component, which is then
   * increased by one every time the component is rendered.
   */
  selectorRenderCountRef?: MutableRefObject<number>;

  /**
   * Passes a numeric React ref object to the phone number input component,
   * which is then increased by one every time the component is rendered.
   */
  inputRenderCountRef?: MutableRefObject<number>;
}

export default CCSelectorCompositeProps;
