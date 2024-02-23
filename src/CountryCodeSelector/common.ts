import { createFilterOptions } from '@mui/material';
import { CountryType } from '../lib/countryCodeData';

/**
 * Filter options used as the default value of the filterOptions prop of the
 * CountryCodeSelector.
 */
const defaultFilterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: CountryType) =>
    `${option.country} ${option.iso} +${option.code}`,
});

export default defaultFilterOptions;
