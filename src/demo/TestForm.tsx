import { useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  Button,
} from '@mui/material';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombinedZustand';
import { CountryType } from '../lib/countryCodeData';

function TestForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const homePhoneNumValueRef = useRef('');
  const workPhoneNumValueRef = useRef('');
  const workCountryCodeValueRef = useRef<CountryType | null>(null);
  const [result, setResult] = useState('');

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Test form with a compound country code selector and phone number input
        component (Zustand)
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            `First name: ${firstName}, Last name: ${lastName}, ` +
              `Phone, home: ${homePhoneNumValueRef.current}, ` +
              `Phone, work: ${workPhoneNumValueRef.current}`
          );
        }}
      >
        <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 0.7 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormGroup row>
                <TextField
                  label="First name"
                  value={firstName}
                  type="text"
                  sx={{
                    width: '50%',
                    paddingRight: '0.2rem',
                    boxSizing: 'border-box',
                    webkitBoxSizing: 'border-box',
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Last name"
                  value={lastName}
                  type="text"
                  sx={{
                    width: '50%',
                    paddingLeft: '0.2rem',
                    boxSizing: 'border-box',
                    webkitBoxSizing: 'border-box',
                  }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <CountryCodeSelectorCombined
              phoneNumValueRef={homePhoneNumValueRef}
              countryCodeLabel="Country code"
              phoneNumberLabel="Home phone number"
            />
          </Grid>
          <Grid item xs={12}>
            <CountryCodeSelectorCombined
              phoneNumValueRef={workPhoneNumValueRef}
              countryCodeValueRef={workCountryCodeValueRef}
              countryCodeLabel="Country code"
              phoneNumberLabel="Work phone number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginRight: '0.2rem',
                  boxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                type="reset"
                sx={{
                  marginLeft: '0.2rem',
                  boxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }}
                onClick={() => {
                  setFirstName('');
                  setLastName('');
                  homePhoneNumValueRef.current = '';
                  workPhoneNumValueRef.current = '';
                  setResult('');
                }}
              >
                Clear
              </Button>
            </FormGroup>
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
