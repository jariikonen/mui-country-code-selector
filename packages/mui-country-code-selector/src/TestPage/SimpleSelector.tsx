import { Grid, createFilterOptions } from '@mui/material';
import { CountryCodeSelectorComposite } from '../../component/CountryCodeSelectorComposite';
import { CountryType } from '../../component/lib/countryCodeData';

export default function SimpleSelector() {
  const filterOptions = createFilterOptions({
    limit: 3,
    matchFrom: 'any',
    stringify: (option: CountryType) =>
      `${option.country} ${option.iso} +${option.code}`,
  });

  return (
    <Grid
      container
      columnSpacing={{ xs: 1 }}
      rowSpacing={{ xs: 1 }}
      sx={{ marginTop: { xs: 1 } }}
    >
      <CountryCodeSelectorComposite
        layout="gridItems"
        selectorProps={{ filterOptions }}
      />
    </Grid>
  );
}
