import type { Property } from 'csstype';

/**
 * Default label text for the `CountryCodeSelector` component.
 * @alpha
 */
export const DEFAULT_COUNTRY_CODE_LABEL = 'Country code';

/**
 * Default abbreviation for the label text. Used when `window.innerWidth` is
 * smaller than `theme.breakpoints.values.sm` (i.e. the viewport width is
 * smaller than the smallest breakpoint in the MUI theme that the component
 * uses). See {@link https://mui.com/material-ui/customization/breakpoints/}
 * for more information about the breakpoints and
 * {@link https://mui.com/material-ui/customization/theming/} for more
 * information about the MUI's themes.
 * @alpha
 */
export const DEFAULT_COUNTRY_CODE_LABEL_ABBREVIATION = 'Country';

/**
 * Default width for the `CountryCodeSelector`'s option list (i.e., default
 * `width` of the `paper` subcomponent of the underlying `Autocomplete`
 * component).
 * @alpha
 */
export const DEFAULT_OPTION_LIST_WIDTH: Property.Width = '20rem';

/**
 * Default `max-width` for the `CountryCodeSelector`'s option list (i.e.,
 * default `max-width` of the `paper` subcomponent of the underlying
 * `Autocomplete` component).
 * @alpha
 */
export const DEFAULT_OPTION_LIST_MAX_WIDTH: Property.Width = '90vw';

/**
 * Default slot props object for `CountryCodeSelector`'s underlying
 * `Autocomplete` component. Sets the default `min-width` for the `paper`
 * component that implements the dropdown option list.
 * @alpha
 */
export const DEFAULT_SLOT_PROPS = {
  paper: {
    sx: {
      width: DEFAULT_OPTION_LIST_WIDTH,
      maxWidth: DEFAULT_OPTION_LIST_MAX_WIDTH,
    },
  },
};

/**
 * A responsive breakpoint below which the CountryCodeSelector components use
 * shorter labels.
 * @alpha
 */
export const SELECTOR_RESPONSIVE_BREAKPOINT_WIDTH = 145;

/**
 * Default label text for the phone number input `TextField` subcomponent of
 * the `CountryCodeSelectorComposite` component.
 */
export const DEFAULT_PHONE_NUMBER_LABEL = 'Phone number';

/** Default value for error message display time. */
export const DEFAULT_ERROR_MESSAGE_DELAY = 3;

/**
 * Default value for how the error message is displayed. See the documentation
 * for the `errorMessageDisplay` of CCSelectorCompositeProps for more
 * information.
 */
export const DEFAULT_ERROR_MESSAGE_DISPLAY = 'both';
