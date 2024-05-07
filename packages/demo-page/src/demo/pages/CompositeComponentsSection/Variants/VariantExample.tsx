import { Box, Grid } from '@mui/material';
import { CountryCodeSelectorComposite } from 'mui-country-code-selector';

export default function VariantExample() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
        <CountryCodeSelectorComposite layout="gridItems" variant="outlined" />
        <CountryCodeSelectorComposite layout="gridItems" variant="filled" />
        <CountryCodeSelectorComposite layout="gridItems" variant="standard" />
      </Grid>
    </Box>
  );
}
