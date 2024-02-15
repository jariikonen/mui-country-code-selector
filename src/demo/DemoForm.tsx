import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  FormHelperText,
  Button,
} from '@mui/material';
import CountryCodeSelector from '../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../store/useCountryCodeStore';

function DemoForm() {
  const {
    setPhoneNumberInput,
    phoneNumStr,
    errorMsg,
    handlePhoneNumberChange,
    setCursor,
  } = useCountryCodeStore();

  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    setPhoneNumberInput(phoneInputRef.current);
  }, [setPhoneNumberInput]);

  // Inputting a forbidden character into the phone number input makes the
  // cursor jump to the end of the field. Until finding a better solution, this
  // can be fixed by storing the cursor position into the state and setting it
  // back in a useEffect hook.
  useEffect(() => {
    setCursor();
  });

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Phone number input and a country code selector combined using a Zustand
        state
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(phoneNumStr);
        }}
      >
        <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 0.7 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormGroup row>
                <CountryCodeSelector
                  label="Country code"
                  sx={{
                    width: '35%',
                    paddingRight: '0.2rem',
                    boxSizing: 'border-box',
                    WebkitBoxSizing: 'border-box',
                  }}
                />
                <TextField
                  error={errorMsg !== null}
                  label="Phone number"
                  value={phoneNumStr}
                  type="text"
                  inputRef={(e) => {
                    phoneInputRef.current = e as HTMLInputElement | null;
                  }}
                  sx={{
                    width: '65%',
                    paddingLeft: '0.2rem',
                    boxSizing: 'border-box',
                    webkitBoxSizing: 'border-box',
                  }}
                  onChange={handlePhoneNumberChange}
                />
                {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {result && (
        <Typography align="left" variant="body2" style={{ marginTop: '1rem' }}>
          Phone number: {result}
        </Typography>
      )}
    </Box>
  );
}

export default DemoForm;
