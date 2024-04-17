import { Box, Grid } from '@mui/material';
import { CountryCodeSelectorCombined } from 'mui-country-code-selector';

export default function VariantExample() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
        <CountryCodeSelectorCombined layout="gridItems" variant="outlined" />
        <CountryCodeSelectorCombined layout="gridItems" variant="filled" />
        <CountryCodeSelectorCombined layout="gridItems" variant="standard" />
      </Grid>
    </Box>
  );
}
