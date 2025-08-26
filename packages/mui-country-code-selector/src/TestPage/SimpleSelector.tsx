import { Grid, Typography, createFilterOptions } from '@mui/material';
import CountryCodeSelectorComposite from '../components/CountryCodeSelectorComposite';
import { CountryType } from '../lib/countryCodeData';

interface SimpleSelectorProps {
  limitOptions?: number | undefined;
}

export default function SimpleSelector({
  limitOptions = undefined,
}: SimpleSelectorProps) {
  const filterOptions = limitOptions
    ? createFilterOptions({
        limit: limitOptions,
        matchFrom: 'any',
        stringify: (option: CountryType) => {
          const country = Array.isArray(option.country)
            ? option.country.join(' ')
            : option.country;
          return `${country} ${option.iso} +${option.code}`;
        },
      })
    : undefined;

  return (
    <Grid
      container
      columnSpacing={{ xs: 1 }}
      rowSpacing={{ xs: 1 }}
      sx={{ marginTop: { xs: 1 } }}
    >
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5">Zustand</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5">React</Typography>
      </Grid>
      <CountryCodeSelectorComposite
        layout="gridItems"
        selectorProps={{ filterOptions }}
      />
    </Grid>
  );
}
