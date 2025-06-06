import { Grid, Typography, createFilterOptions } from '@mui/material';
import {
  CountryCodeSelectorCompositeZustand,
  CountryCodeSelectorCompositeReact,
} from '../../component/CountryCodeSelectorComposite';
import { CountryType } from '../../component/lib/countryCodeData';

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
      <CountryCodeSelectorCompositeZustand
        layout="gridItems"
        selectorProps={{ filterOptions }}
      />
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5">React</Typography>
      </Grid>
      <CountryCodeSelectorCompositeReact
        layout="gridItems"
        selectorProps={{ filterOptions }}
      />
    </Grid>
  );
}
