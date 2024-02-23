/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, TextField, Box } from '@mui/material';
import { countries } from '../lib/countryCodeData';
import useCountryCodeStore from '../store/useCountryCodeStore';
import CCSelectorProps from '../types/CCSelectorProps';
import defaultFilterOptions from './common';

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
  shrink = null,
  variant = null,
  autoSelect = true,
  autoHighlight = true,
  label,
  sx,
}: CCSelectorProps) {
  const { handleCountryCodeChange, countryCodeValue } = useCountryCodeStore();

  // only props that are not null are applied to the AutoComplete component
  const filterOptionsIfNotNull = {
    ...(filterOptions === null ? null : { filterOptions }),
  };
  const variantIfNotNull = {
    ...(variant === null ? null : { variant }),
  };
  const shrinkIfNotNull = {
    ...(shrink === null ? null : { shrink }),
  };

  return (
    <Autocomplete
      sx={sx}
      onChange={handleCountryCodeChange}
      options={countries}
      value={countryCodeValue}
      autoSelect={autoSelect}
      autoHighlight={autoHighlight}
      getOptionLabel={(option) => `${option.country} (${option.iso})`}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
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
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          {...variantIfNotNull}
          InputLabelProps={{ ...shrinkIfNotNull }}
        />
      )}
      {...filterOptionsIfNotNull}
    />
  );
}

export default CountryCodeSelector;
