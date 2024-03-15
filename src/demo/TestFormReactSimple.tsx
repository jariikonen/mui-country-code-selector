import { Box, Typography } from '@mui/material';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedReact';

function TestForm() {
  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Just a simple CountryCodeSelectorCombinedReact component
      </Typography>
      <CountryCodeSelectorCombined errorMessageDisplay="both" />
    </Box>
  );
}

export default TestForm;
