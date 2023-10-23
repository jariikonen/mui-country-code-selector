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
import { useCountryCodeStore } from './countryCodeStore';

interface CountryCodeSelectorProps {
  id: string;
  filterOptions?: (
    options: CountryType[],
    state: FilterOptionsState<CountryType>
  ) => CountryType[];
  autoSelect?: boolean;
  autoHighlight?: boolean;
  label: string | null | undefined;
  sx: SxProps;
}

const defaultFilterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: CountryType) =>
    `${option.country} ${option.iso} +${option.code}`,
});

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

CountryCodeSelector.defaultProps = {
  filterOptions: defaultFilterOptions,
  autoSelect: true,
  autoHighlight: true,
};

export default CountryCodeSelector;
