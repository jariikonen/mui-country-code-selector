import React, { useEffect, useRef, useState } from 'react';
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
import { useStore } from 'zustand';
import CountryCodeSelector from '../CountryCodeSelector';
import { useCountryCodeStore } from '../countryCodeStore';

function DemoForm({ id }: { id: string }) {
  const countryCodeStore = useCountryCodeStore(id);
  const countryCodeState = useStore(countryCodeStore, (state) => state);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  countryCodeState.phoneInputRef = phoneNumberRef;

  const [phoneErrMsg, setPhoneErrMsg] = useState(countryCodeState.errorMsg);
  const phoneErrTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef(null);

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const setPhoneErrClear = (seconds = 3) => {
      if (phoneErrTimeoutRef.current) {
        clearTimeout(phoneErrTimeoutRef.current);
      }
      phoneErrTimeoutRef.current = setTimeout(() => {
        countryCodeState.clearErrorMsg();
        phoneErrTimeoutRef.current = null;
      }, seconds * 1000);
    };

    setPhoneErrMsg(countryCodeState.errorMsg);
    if (countryCodeState.errorMsg) {
      setPhoneErrClear();
    }
  }, [countryCodeState]);

  useEffect(() => {
    countryCodeState.setCursor();
  });

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Phone number input with a country code selector
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(countryCodeState.phoneNumStr);
        }}
      >
        <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 0.7 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormGroup row>
                <CountryCodeSelector
                  id={id}
                  label="Country code"
                  sx={{
                    width: '35%',
                    paddingRight: '0.2rem',
                    boxSizing: 'border-box',
                    WebkitBoxSizing: 'border-box',
                  }}
                />
                <TextField
                  error={phoneErrMsg !== null}
                  label="Phone number"
                  value={countryCodeState.phoneNumStr}
                  type="text"
                  inputRef={(e) => {
                    phoneNumberRef.current = e;
                  }}
                  sx={{
                    width: '65%',
                    paddingLeft: '0.2rem',
                    boxSizing: 'border-box',
                    webkitBoxSizing: 'border-box',
                  }}
                  onChange={countryCodeState.handlePhoneNumberChange}
                />
                {phoneErrMsg && (
                  <FormHelperText error>{phoneErrMsg}</FormHelperText>
                )}
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
