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
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedReact';

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
        number input component (React)
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
        <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 0.7 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormGroup row>
                <TextField
                  label="First name"
                  type="text"
                  sx={{
                    width: '50%',
                    paddingRight: '0.2rem',
                    boxSizing: 'border-box',
                    webkitBoxSizing: 'border-box',
                  }}
                  inputRef={firstNameRef}
                />
                <TextField
                  label="Last name"
                  type="text"
                  sx={{
                    width: '50%',
                    paddingLeft: '0.2rem',
                    boxSizing: 'border-box',
                    webkitBoxSizing: 'border-box',
                  }}
                  inputRef={lastNameRef}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <CountryCodeSelectorCombined
              countryCodeLabel="Country code"
              phoneNumberLabel="Home phone number"
              defaultValue="+358 "
              inputRef={homePhoneNumRef}
              group="row"
            />
          </Grid>
          <Grid item xs={12}>
            <CountryCodeSelectorCombined
              countryCodeLabel="Country code"
              phoneNumberLabel="Work phone number"
              inputRef={workPhoneNumRef}
              group="row"
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
