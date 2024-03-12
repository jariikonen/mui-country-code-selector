import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormGroup,
  Button,
} from '@mui/material';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedReact';

function TestForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [homePhoneNumValue, setHomePhoneNumValue] = useState('+358 ');
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

  const numOfRenders = useRef(0);

  useEffect(() => {
    if (numOfRenders.current !== undefined) {
      numOfRenders.current += 1;
    }
  });

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Test form with a combined country code selector and phone number input
        component (React)
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
        <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
          <Grid item xs={6}>
            <TextField
              label="First name"
              value={firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              value={lastName}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </Grid>
          <CountryCodeSelectorCombined
            value={homePhoneNumValue}
            countryCodeLabel="Country code"
            phoneNumberLabel="Home phone number"
            onChange={homePhoneOnChange}
            group="gridItems"
            selectorSize={{ xs: 4 }}
            inputSize={{ xs: 8 }}
          />
          <CountryCodeSelectorCombined
            value={workPhoneNumValue}
            countryCodeLabel="Country code"
            phoneNumberLabel="Work phone number"
            onChange={workPhoneOnChange}
            group="gridItems"
            selectorSize={{ xs: 4 }}
            inputSize={{ xs: 8 }}
          />
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
      <Typography
        align="left"
        variant="body2"
        style={{
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          marginLeft: '0.1rem',
        }}
      >
        Form renders: {numOfRenders.current}
      </Typography>
      {result && (
        <Typography align="left" variant="body2" style={{ marginTop: '1rem' }}>
          Result: {result}
        </Typography>
      )}
    </Box>
  );
}

export default TestForm;
