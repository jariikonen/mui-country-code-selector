import { useCallback, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { CountryCodeSelectorCombined } from 'mui-country-code-selector';

export default function ValidationExample() {
  const [error, setError] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const errorHandler = useCallback((errorStr: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setError(`Custom error message: ${errorStr}`);

    const newTimeout = setTimeout(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setError('');
    }, 3000);
    timeoutRef.current = newTimeout;
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
        <CountryCodeSelectorCombined
          phoneNumberLabel="none"
          layout="gridItems"
          errorMessageDisplay="none"
        />
        <CountryCodeSelectorCombined
          phoneNumberLabel="message"
          layout="gridItems"
          errorMessageDisplay="message"
        />
        <CountryCodeSelectorCombined
          phoneNumberLabel="status"
          layout="gridItems"
          errorMessageDisplay="status"
        />
        <CountryCodeSelectorCombined
          phoneNumberLabel="both"
          layout="gridItems"
          errorMessageDisplay="both"
        />
        <CountryCodeSelectorCombined
          phoneNumberLabel="message error status turned off using errorProps"
          layout="gridItems"
          errorMessageDisplay="both"
          errorProps={{ error: false }}
        />
        <CountryCodeSelectorCombined
          phoneNumberLabel="error message displayed for 1 second"
          layout="gridItems"
          errorMessageDelay={1}
        />
        <CountryCodeSelectorCombined
          phoneNumberLabel="custom error handler"
          layout="gridItems"
          errorMessageDisplay="none"
          onError={errorHandler}
        />
        {error && (
          <Grid item xs={12} sx={{ color: 'red' }}>
            <p>
              <b>{error}</b>
            </p>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
