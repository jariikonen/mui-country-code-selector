import {
  SxProps,
  Autocomplete,
  TextField,
  Box,
  createFilterOptions,
  FilterOptionsState,
} from '@mui/material';
import { useStore } from 'zustand';
import { CountryType, countries } from './countryCodeData';
import useCountryCodeStore from './countryCodeStore';

/** A type for the props to the CountryCodeSelector. */
interface CountryCodeSelectorProps {
  /**
   * Unique identifier for the Zustand store used as the common state between
   * the CountryCodeSelector and its external input element.
   * @see CountryCodeStore
   */
  id: string;

  /**
   * Custom options for setting how the options are filtered based on the input.
   * @see {@link https://mui.com/material-ui/react-autocomplete/#custom-filter}
   */
  filterOptions?: (
    options: CountryType[],
    state: FilterOptionsState<CountryType>
  ) => CountryType[];

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

/**
 * Filter options used as the default value of the filterOptions prop of the
 * CountryCodeSelector.
 */
const defaultFilterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: CountryType) =>
    `${option.country} ${option.iso} +${option.code}`,
});

/**
 * MUI AutoComplete component that provides a selection of countries and their
 * international phone number country codes. Needs also another input element
 * for inputting the phonen number. Creates a Zustand store object for keeping
 * the state between these inputs. Store object is identified bythe given id
 * string.
 * @see CCodeState, useCountryCodeStore
 * @see {@link https://mui.com/material-ui/react-autocomplete}
 */
function CountryCodeSelector({
  id,
  filterOptions = defaultFilterOptions,
  autoSelect,
  autoHighlight,
  label,
  sx,
}: CountryCodeSelectorProps) {
  const countryCodeStore = useCountryCodeStore(id);
  const handleCountryCodeChange = useStore(
    countryCodeStore,
    (state) => state.handleCountryCodeChange
  );
  const countryCodeValue = useStore(
    countryCodeStore,
    (state) => state.countryCodeValue
  );

  return (
    <Autocomplete
      sx={sx}
      onChange={handleCountryCodeChange}
      options={countries}
      value={countryCodeValue}
      autoSelect={autoSelect}
      autoHighlight={autoHighlight}
      getOptionLabel={(option) => `${option.country} (${option.iso})`}
      filterOptions={filterOptions}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          <img
            loading="lazy"
            width="30"
            src={`https://flagcdn.com/${option.iso.toLowerCase()}.svg`}
            alt=""
          />
          {option.country} {option.iso} +{option.code}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

/** Default values for the CountryCodeSelector's props. */
CountryCodeSelector.defaultProps = {
  filterOptions: defaultFilterOptions,
  autoSelect: true,
  autoHighlight: true,
};

export default CountryCodeSelector;
