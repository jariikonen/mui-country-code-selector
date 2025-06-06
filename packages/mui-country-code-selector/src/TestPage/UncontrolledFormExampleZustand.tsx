import { useRef, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { CountryCodeSelectorCompositeZustand } from '../../component/CountryCodeSelectorComposite';

function TestForm() {
  const homePhoneNumRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState('');

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(`Phone, home: ${homePhoneNumRef.current?.value}`);
          setTimeout(() => {
            setResult('');
          }, 6000);
        }}
      >
        <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
          <CountryCodeSelectorCompositeZustand
            phoneNumberLabel="Home phone number"
            inputRef={homePhoneNumRef}
            layout="gridItems"
          />
          <Grid size={{ xs: 12 }}>
            <Grid container direction="row" columnSpacing={{ xs: 1 }}>
              <Grid>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" type="reset">
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {result && (
        <Typography align="left" variant="body2" style={{ marginTop: '1rem' }}>
          Result: {result}
        </Typography>
      )}
    </Box>
  );
}

export default TestForm;
