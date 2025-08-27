import { useCallback, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { CountryCodeSelectorComposite } from 'mui-country-code-selector';

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
        <CountryCodeSelectorComposite
          phoneNumberLabel="none"
          layout="gridItems"
          errorMessageDisplay="none"
        />
        <CountryCodeSelectorComposite
          phoneNumberLabel="message"
          layout="gridItems"
          errorMessageDisplay="message"
        />
        <CountryCodeSelectorComposite
          phoneNumberLabel="status"
          layout="gridItems"
          errorMessageDisplay="status"
        />
        <CountryCodeSelectorComposite
          phoneNumberLabel="both"
          layout="gridItems"
          errorMessageDisplay="both"
        />
        <CountryCodeSelectorComposite
          phoneNumberLabel="message error status turned off using errorProps"
          layout="gridItems"
          errorMessageDisplay="both"
          errorProps={{ error: false }}
        />
        <CountryCodeSelectorComposite
          phoneNumberLabel="error message displayed for 1 second"
          layout="gridItems"
          errorMessageDelay={1}
        />
        <CountryCodeSelectorComposite
          phoneNumberLabel="custom error handler"
          layout="gridItems"
          errorMessageDisplay="none"
          onError={errorHandler}
        />
        {error && (
          <Grid size={{ xs: 12 }} sx={{ color: 'red' }}>
            <p>
              <b>{error}</b>
            </p>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
