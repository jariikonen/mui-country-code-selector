import { Box, Grid } from '@mui/material';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedReact';

function TestForm() {
  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
        <CountryCodeSelectorCombined />
      </Grid>
    </Box>
  );
}

export default TestForm;
