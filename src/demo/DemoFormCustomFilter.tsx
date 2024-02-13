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
import { matchSorter } from 'match-sorter';
import CountryCodeSelector from '../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../store/useCountryCodeStore';
import { CountryType } from '../lib/countryCodeData';

function DemoFormCustomFilter() {
  const { setPhoneInputRef, phoneNumStr, errorMsg, handlePhoneNumberChange } =
    useCountryCodeStore();

  const phoneNumberRef = useRef<HTMLInputElement | null>(null);

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    setPhoneInputRef(phoneNumberRef);
  }, [setPhoneInputRef]);

  const customFilterOptions = (
    options: CountryType[],
    { inputValue }: { inputValue: string; getOptionLabel: object }
  ) => {
    const inputVal = inputValue.startsWith('+')
      ? inputValue.substring(1)
      : inputValue;
    return matchSorter<CountryType>(options, inputVal, {
      keys: ['country', 'code', 'iso'],
    });
  };

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Phone number input and a country code selector with match-sorter custom
        filtering, combined with a Zustand state
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
                  filterOptions={customFilterOptions}
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
                    phoneNumberRef.current = e as HTMLInputElement | null;
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

export default DemoFormCustomFilter;
