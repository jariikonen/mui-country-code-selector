import { Grid, Typography, createFilterOptions } from '@mui/material';
import {
  CountryCodeSelectorCompositeZustand,
  CountryCodeSelectorCompositeReact,
} from '../../component/CountryCodeSelectorComposite';
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
      <Grid item xs={12}>
        <Typography variant="h5">Zustand</Typography>
      </Grid>
      <CountryCodeSelectorCompositeZustand
        layout="gridItems"
        selectorProps={{ filterOptions }}
      />
      <Grid item xs={12}>
        <Typography variant="h5">React</Typography>
      </Grid>
      <CountryCodeSelectorCompositeReact
        layout="gridItems"
        selectorProps={{ filterOptions }}
      />
    </Grid>
  );
}
