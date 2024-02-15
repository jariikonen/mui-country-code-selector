import { useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  Button,
} from '@mui/material';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedZustand';

function TestForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [homePhoneNumValue, setHomePhoneNumValue] = useState('+358');
  const [workPhoneNumValue, setWorkPhoneNumValue] = useState('');
  const [result, setResult] = useState('');

  const homePhoneOnChange = useCallback(
    (e: { target: { value: string } }) => setHomePhoneNumValue(e.target.value),
    []
  );

  const workPhoneOnChange = useCallback(
    (e: { target: { value: string } }) => setWorkPhoneNumValue(e.target.value),
    []
  );

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Test form with a combined country code selector and phone number input
        component (Zustand)
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            `First name: ${firstName}, Last name: ${lastName}, ` +
              `Phone, home: ${homePhoneNumValue}, ` +
              `Phone, work: ${workPhoneNumValue}`
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
              value={homePhoneNumValue}
              onChange={homePhoneOnChange}
              countryCodeLabel="Country code"
              phoneNumberLabel="Home phone number"
            />
          </Grid>
          <Grid item xs={12}>
            <CountryCodeSelectorCombined
              value={workPhoneNumValue}
              onChange={workPhoneOnChange}
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
                type="button"
                sx={{
                  marginLeft: '0.2rem',
                  boxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }}
                onClick={() => {
                  setFirstName('');
                  setLastName('');
                  setHomePhoneNumValue('+358');
                  setWorkPhoneNumValue('');
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
