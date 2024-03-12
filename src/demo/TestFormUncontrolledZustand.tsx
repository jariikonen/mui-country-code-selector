import { useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormGroup,
  Button,
} from '@mui/material';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedZustand';

function TestForm() {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const homePhoneNumRef = useRef<HTMLInputElement | null>(null);
  const workPhoneNumRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState('');

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Uncontrolled test form with a combined country code selector and phone
        number input component (Zustand)
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            `First name: ${firstNameRef?.current?.value}, ` +
              `Last name: ${lastNameRef?.current?.value}, ` +
              `Phone, home: ${homePhoneNumRef.current?.value}, ` +
              `Phone, work: ${workPhoneNumRef.current?.value}`
          );
        }}
      >
        <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 1 }}>
          <Grid item xs={6}>
            <TextField
              label="First name"
              type="text"
              inputRef={firstNameRef}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              type="text"
              inputRef={lastNameRef}
              fullWidth
            />
          </Grid>
          <CountryCodeSelectorCombined
            countryCodeLabel="Country code"
            phoneNumberLabel="Home phone number"
            inputRef={homePhoneNumRef}
            defaultValue="+358 "
            group="gridItems"
            selectorSize={{ xs: 4 }}
            inputSize={{ xs: 8 }}
          />
          <CountryCodeSelectorCombined
            countryCodeLabel="Country code"
            phoneNumberLabel="Work phone number"
            inputRef={workPhoneNumRef}
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
                type="reset"
                sx={{
                  marginLeft: '0.2rem',
                  boxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }}
              >
                Reset
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
