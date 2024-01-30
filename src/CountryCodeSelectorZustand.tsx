import {
  SxProps,
  Autocomplete,
  TextField,
  Box,
  createFilterOptions,
  FilterOptionsState,
} from '@mui/material';
import { CountryType, countries } from './lib/countryCodeData';
import useCountryCodeStore from './store/useCountryCodeStore';

/** A type for the props to the CountryCodeSelector component. */
interface CountryCodeSelectorProps {
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
 * for inputting the phone number. Creates a Zustand store object for keeping
 * the state between these inputs. Store object is identified by the given id
 * string.
 * @see CountryCodeSelectorProps
 * @see CCodeState
 * @see useCountryCodeStore
 * @see {@link https://mui.com/material-ui/react-autocomplete}
 */
function CountryCodeSelector({
  filterOptions = defaultFilterOptions,
  autoSelect = true,
  autoHighlight = true,
  label,
  sx,
}: CountryCodeSelectorProps) {
  const { handleCountryCodeChange, countryCodeValue } = useCountryCodeStore();

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

export default CountryCodeSelector;
