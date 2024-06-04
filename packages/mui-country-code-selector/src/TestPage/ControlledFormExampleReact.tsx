import { useCallback, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { CountryCodeSelectorCompositeReact } from '../../component/CountryCodeSelectorComposite';

function TestForm() {
  const [homePhoneNumValue, setHomePhoneNumValue] = useState('');
  const [result, setResult] = useState('');

  const homePhoneOnChange = useCallback(
    (e: { target: { value: string } }) => setHomePhoneNumValue(e.target.value),
    []
  );

  const clearForm = useCallback(() => {
    setHomePhoneNumValue('');
    setResult('');
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(`Phone, home: ${homePhoneNumValue}`);
          setTimeout(() => {
            setResult('');
          }, 6000);
        }}
      >
        <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
          <CountryCodeSelectorCompositeReact
            value={homePhoneNumValue}
            phoneNumberLabel="Home phone number"
            onChange={homePhoneOnChange}
            layout="gridItems"
          />
          <Grid item xs={12}>
            <Grid container direction="row" columnSpacing={{ xs: 1 }}>
              <Grid item>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" type="button" onClick={clearForm}>
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
